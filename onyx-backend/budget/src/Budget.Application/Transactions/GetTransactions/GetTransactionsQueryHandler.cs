﻿using Abstractions.Messaging;
using Budget.Application.Transactions.Models;
using Budget.Domain.Accounts;
using Budget.Domain.Counterparties;
using Budget.Domain.Subcategories;
using Budget.Domain.Transactions;
using Models.Responses;
using Transaction = Budget.Domain.Transactions.Transaction;

namespace Budget.Application.Transactions.GetTransactions;

internal sealed class GetTransactionsQueryHandler : IQueryHandler<GetTransactionsQuery, IEnumerable<TransactionModel>>
{
    private readonly ITransactionRepository _transactionRepository;
    private readonly ISubcategoryRepository _subcategoryRepository;
    private readonly IAccountRepository _accountRepository;
    private readonly ICounterpartyRepository _counterpartyRepository;

    public GetTransactionsQueryHandler(ITransactionRepository transactionRepository, ICounterpartyRepository counterpartyRepository, ISubcategoryRepository subcategoryRepository, IAccountRepository accountRepository)
    {
        _transactionRepository = transactionRepository;
        _counterpartyRepository = counterpartyRepository;
        _subcategoryRepository = subcategoryRepository;
        _accountRepository = accountRepository;
    }

    public async Task<Result<IEnumerable<TransactionModel>>> Handle(GetTransactionsQuery request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Period) || string.IsNullOrWhiteSpace(request.Date))
        {
            return GetTransactionErrors.NullFilters;
        }

        var queryCreateResult = GetTransactionQueryRequest.FromRequest(request);

        if (queryCreateResult.IsFailure)
        {
            return Result.Failure<IEnumerable<TransactionModel>>(queryCreateResult.Error);
        }

        var query = queryCreateResult.Value;

        var isRequestValid = IsQueryValid(query, request);

        if (!isRequestValid)
        {
            return Result.Failure<IEnumerable<TransactionModel>>(GetTransactionErrors.InvalidQueryValues);
        }

        _transactionRepository.AddPagingParameters(query.Period.ToDateTimeTicksSearchFrom(query.Date));

        var transactionsGetTask = query switch
        {
            _ when query.Entity == GetTransactionQueryRequest.AllEntity =>
                _transactionRepository.GetAllAsync(cancellationToken),
            _ when query.Entity == GetTransactionQueryRequest.AccountEntity =>
                _transactionRepository.GetByAccountAsync(new (request.AccountId!.Value), cancellationToken),
            _ when query.Entity == GetTransactionQueryRequest.SubcategoryEntity =>
                _transactionRepository.GetBySubcategoryAsync(new(request.AccountId!.Value), cancellationToken),
            _ when query.Entity == GetTransactionQueryRequest.CounterpartyEntity =>
                _transactionRepository.GetByCounterpartyAsync(new(request.AccountId!.Value), cancellationToken),
            _ => Task.FromResult(Result.Failure<IEnumerable<Transaction>>(Error.None))
        };

        var transactionsGetResult = await transactionsGetTask;

        if (transactionsGetResult.IsFailure)
        {
            return Result.Failure<IEnumerable<TransactionModel>>(transactionsGetResult.Error);
        }

        var transactions = transactionsGetResult.Value;

        var transactionModelsGetResults = await Task.WhenAll(
            GetTransactionModelsTasks(
                transactions,
                cancellationToken));

        if (transactionModelsGetResults.FirstOrDefault(r => r.IsFailure) is not null and var failureResult)
        {
            return Result.Failure<IEnumerable<TransactionModel>>(failureResult.Error);
        }

        var transactionModels = transactionModelsGetResults.Select(r => r.Value);

        return Result.Create(transactionModels);
    }

    private IEnumerable<Task<Result<TransactionModel>>> GetTransactionModelsTasks(
        IEnumerable<Transaction> transactions,
        CancellationToken cancellationToken)
    {
        var tasks = new List<Task<Result<TransactionModel>>>();

        foreach (var t in transactions)
        {
            var task = async () =>
            {
                var accountGetResult = await _accountRepository.GetByIdAsync(t.AccountId, cancellationToken);

                if (accountGetResult.IsFailure)
                {
                    return Result.Failure<TransactionModel>(accountGetResult.Error);
                }

                var subcategoryGetResult = t.SubcategoryId is null ?
                    null :
                    await _subcategoryRepository.GetByIdAsync(t.SubcategoryId, cancellationToken);

                if (subcategoryGetResult is not null && subcategoryGetResult.IsFailure)
                {
                    return Result.Failure<TransactionModel>(subcategoryGetResult.Error);
                }

                var counterpartyGetResult = t.CounterpartyId is null ?
                    null :
                    await _counterpartyRepository.GetByIdAsync(
                        t.CounterpartyId,
                        cancellationToken);

                if (counterpartyGetResult is not null && counterpartyGetResult.IsFailure)
                {
                    return Result.Failure<TransactionModel>(counterpartyGetResult.Error);
                }

                var account = accountGetResult.Value;
                var subcategory = subcategoryGetResult?.Value;
                var counterparty = counterpartyGetResult?.Value;

                return Result.Create(TransactionModel.FromDomainModel(t, counterparty, account, subcategory));
            };

            tasks.Add(task.Invoke());
        }

        return tasks;
    }

    private static bool IsQueryValid(GetTransactionQueryRequest query, GetTransactionsQuery request) =>
        query switch
        {
            _ when query.Entity == GetTransactionQueryRequest.AllEntity =>
                true,
            _ when query.Entity == GetTransactionQueryRequest.AccountEntity =>
                request.AccountId is not null,
            _ when query.Entity == GetTransactionQueryRequest.SubcategoryEntity =>
                request.SubcategoryId is not null,
            _ when query.Entity == GetTransactionQueryRequest.CounterpartyEntity =>
                request.CounterpartyId is not null,
            _ => false
        };
}