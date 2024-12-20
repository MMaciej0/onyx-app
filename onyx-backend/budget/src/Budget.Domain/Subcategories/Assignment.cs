﻿using Abstractions.DomainBaseTypes;
using Budget.Domain.Transactions;
using Models.DataTypes;
using Models.Responses;

namespace Budget.Domain.Subcategories;

public sealed record Assignment : ValueObject
{
    public MonthDate Month { get; init; }
    public Money AssignedAmount { get; private set; }
    public Money ActualAmount { get; private set; }

    [Newtonsoft.Json.JsonConstructor]
    [System.Text.Json.Serialization.JsonConstructor]
    private Assignment(MonthDate month, Money assignedAmount, Money actualAmount)
    {
        Month = month;
        AssignedAmount = assignedAmount;
        ActualAmount = actualAmount;
    }

    internal static Result<Assignment> Create(MonthDate month, Money assignedAmount)
    {
        if (assignedAmount <= 0)
        {
            return Result.Failure<Assignment>(SubcategoryErrors.AssignmentAmountMustBePositive);
        }

        if (MonthDate.Current > month || MonthDate.Current + 1 < month)
        {
            return Result.Failure<Assignment>(SubcategoryErrors.AssignmentDateMustBeInNextOrCurrentMonth);
        }

        return new Assignment(
            month,
            assignedAmount,
            assignedAmount with { Amount = 0 });
    }

    internal Result ChangeAssignedAmount(Money amount)
    {
        if (amount <= 0)
        {
            return Result.Failure<Assignment>(SubcategoryErrors.AssignmentAmountMustBePositive);
        }

        AssignedAmount = amount;

        return Result.Success();
    }

    internal Result Transact(Transaction transaction)
    {
        if (!Month.ContainsDate(transaction.TransactedAt))
        {
            return Result.Failure(SubcategoryErrors.WrongTransactionDateTimeForAssignment);
        }

        ActualAmount += transaction.BudgetAmount with { Amount = Math.Abs(transaction.BudgetAmount.Amount) };

        return Result.Success();
    }

    internal Result RemoveTransaction(Transaction transaction)
    {
        if (!Month.ContainsDate(transaction.TransactedAt))
        {
            return Result.Failure(SubcategoryErrors.WrongTransactionDateTimeForAssignment);
        }

        ActualAmount -= transaction.BudgetAmount with { Amount = Math.Abs(transaction.BudgetAmount.Amount) };

        return Result.Success();
    }
}