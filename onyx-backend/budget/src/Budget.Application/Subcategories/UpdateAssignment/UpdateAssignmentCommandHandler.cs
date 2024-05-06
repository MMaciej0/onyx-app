﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.AccessControl;
using System.Text;
using System.Threading.Tasks;
using Abstractions.Messaging;
using Budget.Application.Shared.Models;
using Budget.Application.Subcategories.Models;
using Budget.Domain.Subcategories;
using Models.DataTypes;
using Models.Responses;
using static System.Net.Mime.MediaTypeNames;

namespace Budget.Application.Subcategories.UpdateAssignment;

internal sealed class UpdateAssignmentCommandHandler : ICommandHandler<UpdateAssignmentCommand, SubcategoryModel>
{
    private readonly ISubcategoryRepository _subcategoryRepository;

    public UpdateAssignmentCommandHandler(ISubcategoryRepository subcategoryRepository)
    {
        _subcategoryRepository = subcategoryRepository;
    }

    public async Task<Result<SubcategoryModel>> Handle(UpdateAssignmentCommand request, CancellationToken cancellationToken)
    {
        var subcategoryId = new SubcategoryId(request.SubcategoryId);

        var subcategoryGetResult = await _subcategoryRepository.GetByIdAsync(subcategoryId, cancellationToken);

        if (subcategoryGetResult.IsFailure)
        {
            return Result.Failure<SubcategoryModel>(subcategoryGetResult.Error);
        }

        var subcategory = subcategoryGetResult.Value;

        var assignedAmountMoneyCreateResult = request.AssignedAmount.ToDomainModel();

        if (assignedAmountMoneyCreateResult.IsFailure)
        {
            return Result.Failure<SubcategoryModel>(assignedAmountMoneyCreateResult.Error);
        }

        var assignedAmountMoney = assignedAmountMoneyCreateResult.Value;

        var assignmentResult = subcategory.Assign(request.Month.Month, request.Month.Year, assignedAmountMoney);

        if (assignmentResult.IsFailure)
        {
            assignmentResult = subcategory.Reassign(request.Month.Month, request.Month.Year, assignedAmountMoney);
        }

        if (assignmentResult.IsFailure)
        {
            return Result.Failure<SubcategoryModel>(assignmentResult.Error);
        }
                
        var subcategoryUpdateResult = await _subcategoryRepository.UpdateAsync(subcategory, cancellationToken);

        if (subcategoryUpdateResult.IsFailure)
        {
            return Result.Failure<SubcategoryModel>(subcategoryUpdateResult.Error);
        }

        return SubcategoryModel.FromDomainModel(subcategory);
    }
}