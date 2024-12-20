﻿using Abstractions.Messaging;
using Budget.Application.Abstractions.Currency;
using Budget.Application.Abstractions.Identity;
using Budget.Application.Transactions.Models;
using Budget.Domain.Accounts;
using Budget.Domain.Budgets;
using Budget.Domain.Counterparties;
using Budget.Domain.Subcategories;
using Budget.Domain.Transactions;
using Models.Responses;

namespace Budget.Application.Transactions.AddTransaction;

internal sealed class AddTransactionCommandHandler : ICommandHandler<AddTransactionCommand, TransactionModel>
{
    private readonly ITransactionRepository _transactionRepository;
    private readonly IAccountRepository _accountRepository;
    private readonly ISubcategoryRepository _subcategoryRepository;
    private readonly ICounterpartyRepository _counterpartyRepository;
    private readonly ICurrencyConverter _currencyConverter;
    private readonly IBudgetContext _budgetContext;
    private readonly IBudgetRepository _budgetRepository;

    public AddTransactionCommandHandler(ITransactionRepository transactionRepository, ISubcategoryRepository subcategoryRepository, IAccountRepository accountRepository, ICounterpartyRepository counterpartyRepository, ICurrencyConverter currencyConverter, IBudgetContext budgetContext, IBudgetRepository budgetRepository)
    {
        _transactionRepository = transactionRepository;
        _subcategoryRepository = subcategoryRepository;
        _accountRepository = accountRepository;
        _counterpartyRepository = counterpartyRepository;
        _currencyConverter = currencyConverter;
        _budgetContext = budgetContext;
        _budgetRepository = budgetRepository;
    }

    public async Task<Result<TransactionModel>> Handle(AddTransactionCommand request, CancellationToken cancellationToken)
    {
        var amountCreateResult = request.Amount.ToDomainModel();

        if (amountCreateResult.IsFailure)
        {
            return Result.Failure<TransactionModel>(amountCreateResult.Error);
        }

        var accountId = new AccountId(request.AccountId);
        var accountGetResult = await _accountRepository.GetByIdAsync(accountId, cancellationToken);

        if (accountGetResult.IsFailure)
        {
            return Result.Failure<TransactionModel>(accountGetResult.Error);
        }

        var counterpartyGetResult = await GetOrCreateCounterparty(request, cancellationToken);

        if (counterpartyGetResult.IsFailure)
        {
            return Result.Failure<TransactionModel>(counterpartyGetResult.Error);
        }

        var budgetIdGetResult = _budgetContext.GetBudgetId();

        if (budgetIdGetResult.IsFailure)
        {
            return budgetIdGetResult.Error;
        }

        var budgetGetResult = await _budgetRepository.GetByIdAsync(
            new(budgetIdGetResult.Value),
            cancellationToken);

        if (budgetGetResult.IsFailure)
        {
            return budgetGetResult.Error;
        }

        var budget = budgetGetResult.Value;

        var subcategoryId = request.SubcategoryId is not null ? 
            new SubcategoryId(request.SubcategoryId.Value) : 
            null;

        var isUnkownSubcategory = subcategoryId == budget.UnknownSubcategoryId;

        if (isUnkownSubcategory)
        {
            return AddTransactionErrors.UnknownSubcategoryCannotBeAssigned;
        }

        var subcategoryGetResult = subcategoryId is not null ?
            await _subcategoryRepository.GetByIdAsync(subcategoryId, cancellationToken) :
            null;

        if (subcategoryGetResult is not null && subcategoryGetResult.IsFailure)
        {
            return Result.Failure<TransactionModel>(subcategoryGetResult.Error);
        }

        var subcategory = subcategoryGetResult?.Value;
        var counterparty = counterpartyGetResult.Value;
        var account = accountGetResult.Value;
        var amount = amountCreateResult.Value;
        var budgetCurrency = budget.BaseCurrency;

        var isForeignTransaction = account.Balance.Currency != amount.Currency;

        var convertAmountResult = isForeignTransaction ?
            await _currencyConverter.ConvertMoney(amount, account.Balance.Currency, cancellationToken) :
            null;

        if(convertAmountResult is not null && convertAmountResult.IsFailure)
        {
            return Result.Failure<TransactionModel>(convertAmountResult.Error);
        }

        var convertedAmount = convertAmountResult?.Value;

        var budgetAmountConvertResult =
            await _currencyConverter.ConvertMoney(amount, budgetCurrency, cancellationToken);

        if (budgetAmountConvertResult.IsFailure)
        {
            return budgetAmountConvertResult.Error;
        }

        var budgetAmount = budgetAmountConvertResult.Value;

        var transactionFactory = new TransactionFactory(account, new (request.BudgetId));

        var transactionCreateResult = transactionFactory.CreateTransaction(
            counterparty,
            subcategory,
            request.TransactedAt,
            amount,
            convertedAmount,
            budgetAmount);

        if (transactionCreateResult.IsFailure)
        {
            return Result.Failure<TransactionModel>(transactionCreateResult.Error);
        }

        var transaction = transactionCreateResult.Value;

        var addTransactionResult = await _transactionRepository.AddAsync(transaction, cancellationToken);

        if (addTransactionResult.IsFailure)
        {
            return Result.Failure<TransactionModel>(addTransactionResult.Error);
        }

        var updateSubcategoryResult = subcategory is null ?
            null :
            await _subcategoryRepository.UpdateAsync(subcategory, cancellationToken);

        if (updateSubcategoryResult is not null && updateSubcategoryResult.IsFailure)
        {
            return Result.Failure<TransactionModel>(updateSubcategoryResult.Error);
        }

        var updateAccountResult = await _accountRepository.UpdateAsync(account, cancellationToken);

        if (updateAccountResult.IsFailure)
        {
            return Result.Failure<TransactionModel>(updateAccountResult.Error);
        }

        transaction = addTransactionResult.Value;

        return TransactionModel.FromDomainModel(transaction, counterparty, account, subcategory);
    }

    private async Task<Result<Counterparty>> GetOrCreateCounterparty(AddTransactionCommand request, CancellationToken cancellationToken)
    {
        var counterpartyNameCreateResult = CounterpartyName.Create(request.CounterpartyName);

        if (counterpartyNameCreateResult.IsFailure)
        {
            return Result.Failure<Counterparty>(counterpartyNameCreateResult.Error);
        }

        var counterpartyName = counterpartyNameCreateResult.Value;
        var isPayee = request.Amount.Amount < 0;
        var counterpartyType = isPayee ? CounterpartyType.Payee : CounterpartyType.Payer;
        var counterpartyGetResult = await _counterpartyRepository.GetByNameAndTypeAsync(
            counterpartyName,
            counterpartyType,
            cancellationToken);

        if (counterpartyGetResult.IsSuccess)
        {
            return counterpartyGetResult;
        }

        var counterpartyCreateResult = Counterparty.Create(counterpartyName.Value, counterpartyType.Value, new (request.BudgetId));

        if (counterpartyCreateResult.IsFailure)
        {
            return counterpartyCreateResult;
        }

        counterpartyGetResult = await _counterpartyRepository.AddAsync(
            counterpartyCreateResult.Value,
            cancellationToken);

        return counterpartyGetResult;
    }
}