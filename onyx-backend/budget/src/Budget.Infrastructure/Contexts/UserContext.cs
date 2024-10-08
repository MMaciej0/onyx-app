﻿using Abstractions.Messaging;
using Budget.Application.Abstractions.Identity;
using Models.Responses;

namespace Budget.Infrastructure.Contexts;

internal sealed class UserContext : IUserContext
{
    private readonly RequestAccessor _requestAccessor;
    private const string userIdClaimName = "Id";
    private const string userUsernameClaimName = "Username";
    private const string userEmailClaimName = "Email";
    private const string userCurrencyClaimName = "Currency";
    private const string budgetsIdsClaimName = "BudgetsIds";
    private readonly Error _userIdClaimNotFound = new(
        "UserContext.UserIdNotFound",
        "Cannot retrieve user ID");
    private readonly Error _usercurrencyClaimNotFound = new(
        "UserContext.CurrencyNotFound",
        "Cannot retrieve base currency for user");
    private readonly Error _budgetsIdsClaimNotFound = new(
        "UserContext.BudgetsIds",
        "Cannot retrieve budgets for user");

    public UserContext(RequestAccessor requestAccessor)
    {
        _requestAccessor = requestAccessor;
    }

    public Result<string> GetUserId() =>
        _requestAccessor
            .Claims.ToList()
            .FirstOrDefault(claim => claim.Type == userIdClaimName)?
            .Value is var id && !string.IsNullOrEmpty(id) ?
            id : 
            _userIdClaimNotFound;
    public Result<string> GetUserUsername() =>
        _requestAccessor
            .Claims.ToList()
            .FirstOrDefault(claim => claim.Type == userUsernameClaimName)?
            .Value is var username && !string.IsNullOrEmpty(username) ?
            username : 
            _userIdClaimNotFound;
    public Result<string> GetUserEmail() =>
        _requestAccessor
            .Claims.ToList()
            .FirstOrDefault(claim => claim.Type == userEmailClaimName)?
            .Value is var email && !string.IsNullOrEmpty(email) ?
            email : 
            _userIdClaimNotFound;

    public Result<string> GetUserCurrency() =>
        _requestAccessor
            .Claims.ToList()
            .FirstOrDefault(claim => claim.Type == userCurrencyClaimName)?
            .Value is var currency && !string.IsNullOrEmpty(currency) ?
            currency :
            _usercurrencyClaimNotFound;

    public Result<List<Guid>> GetBudgetsIds() =>
        _requestAccessor
            .Claims.ToList()
            .FirstOrDefault(claim => claim.Type == budgetsIdsClaimName)?
            .Value is var budgetsIds &&
        !string.IsNullOrEmpty(budgetsIds) ?
            budgetsIds.Split(',').Select(Guid.Parse).ToList() :
            _budgetsIdsClaimNotFound;
}