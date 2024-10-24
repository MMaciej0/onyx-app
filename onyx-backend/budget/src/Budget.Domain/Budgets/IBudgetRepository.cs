﻿using Models.Responses;

namespace Budget.Domain.Budgets;

public interface IBudgetRepository
{
    Task<Result<Budget>> AddAsync(Budget budget, CancellationToken cancellationToken);

    Task<Result<Budget>> GetByIdAsync(BudgetId budgetId, CancellationToken cancellationToken);

    Task<Result> RemoveAsync(BudgetId budgetId, CancellationToken cancellationToken);

    Task<Result<Budget>> UpdateAsync(Budget budget, CancellationToken cancellationToken);

    Task<Result<Budget>> GetCurrentBudgetAsync(CancellationToken cancellationToken);

    Task<Result<IEnumerable<Budget>>> GetBudgetsForMemberAsync(string userId, CancellationToken cancellationToken);

    Task<Result<Budget>> AddUniqueAsync(Budget entity, CancellationToken cancellationToken = default);
}