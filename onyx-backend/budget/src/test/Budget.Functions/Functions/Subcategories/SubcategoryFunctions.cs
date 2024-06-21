﻿using Amazon.Lambda.Annotations.APIGateway;
using Amazon.Lambda.Annotations;
using Amazon.Lambda.APIGatewayEvents;
using Budget.Application.Subcategories.AddSubcategory;
using Budget.Application.Subcategories.GetToAssign;
using Budget.Application.Subcategories.RemoveSubcategory;
using Budget.Application.Subcategories.RemoveTarget;
using Budget.Application.Subcategories.UpdateAssignment;
using Budget.Application.Subcategories.UpdateSubcategory;
using Budget.Application.Subcategories.UpdateTarget;
using Budget.Functions.Functions.Shared;
using Budget.Functions.Functions.Subcategories.Requests;
using LambdaKernel;
using MediatR;
using Models.Responses;

namespace Budget.Functions.Functions.Subcategories;

public sealed class SubcategoryFunctions : BaseFunction
{
    private const string subcategoryBaseRoute = $"{BaseRouteV1}{{budgetId}}/subcategories/";

    public SubcategoryFunctions(ISender sender) : base(sender)
    {

    }

    [LambdaFunction(Role = FullAccessRole, ResourceName = nameof(GetToAssignAmount))]
    [HttpApi(LambdaHttpMethod.Get, $"{subcategoryBaseRoute}to-assign")]
    public async Task<APIGatewayHttpApiV2ProxyResponse> GetToAssignAmount(
        string budgetId,
        [FromQuery] int month,
        [FromQuery] int year)
    {
        var command = new GetToAssignQuery(month, year);

        var result = await Sender.Send(command);

        return result.ReturnAPIResponse();
    }

    [LambdaFunction(Role = FullAccessRole, ResourceName = nameof(AddSubcategory))]
    [HttpApi(LambdaHttpMethod.Post, subcategoryBaseRoute)]
    public async Task<APIGatewayHttpApiV2ProxyResponse> AddSubcategory(
        string budgetId,
        [FromBody] AddSubcategoryRequest request)
    {
        var command = new AddSubcategoryCommand(
            request.ParentCategoryId,
            request.SubcategoryName,
            Guid.Parse(budgetId));

        var result = await Sender.Send(command);

        return result.ReturnAPIResponse();
    }

    [LambdaFunction(Role = FullAccessRole, ResourceName = nameof(UpdateSubcategory))]
    [HttpApi(LambdaHttpMethod.Put, $"{subcategoryBaseRoute}{{subcategoryId}}")]
    public async Task<APIGatewayHttpApiV2ProxyResponse> UpdateSubcategory(
        string budgetId,
        string subcategoryId,
        [FromBody] UpdateSubcategoryRequest request)
    {
        var command = new UpdateSubcategoryCommand(
            Guid.Parse(subcategoryId),
            request.NewName,
            request.NewDescription,
            Guid.Parse(budgetId));

        var result = await Sender.Send(command);

        return result.ReturnAPIResponse();
    }

    [LambdaFunction(Role = FullAccessRole, ResourceName = nameof(RemoveSubcategory))]
    [HttpApi(LambdaHttpMethod.Delete, $"{subcategoryBaseRoute}{{subcategoryId}}")]
    public async Task<APIGatewayHttpApiV2ProxyResponse> RemoveSubcategory(
        string budgetId,
        string subcategoryId)
    {
        var command = new RemoveSubcategoryCommand(Guid.Parse(subcategoryId), Guid.Parse(budgetId));

        var result = await Sender.Send(command);

        return result.ReturnAPIResponse();
    }

    [LambdaFunction(Role = FullAccessRole, ResourceName = nameof(UpdateAssignment))]
    [HttpApi(LambdaHttpMethod.Put, $"{subcategoryBaseRoute}{{subcategoryId}}/assignment")]
    public async Task<APIGatewayHttpApiV2ProxyResponse> UpdateAssignment(
        string budgetId,
        string subcategoryId,
        [FromBody] UpdateAssignmentRequest request)
    {
        var command = new UpdateAssignmentCommand(
            Guid.Parse(subcategoryId),
            request.AssignmentMonth,
            request.AssignedAmount,
            Guid.Parse(budgetId));

        var result = await Sender.Send(command);

        return result.ReturnAPIResponse();
    }

    [LambdaFunction(Role = FullAccessRole, ResourceName = nameof(UpdateTarget))]
    [HttpApi(LambdaHttpMethod.Put, $"{subcategoryBaseRoute}{{subcategoryId}}/target")]
    public async Task<APIGatewayHttpApiV2ProxyResponse> UpdateTarget(
        string budgetId,
        string subcategoryId,
        [FromBody] UpdateTargetRequest request)
    {
        var command = new UpdateTargetCommand(
            Guid.Parse(subcategoryId),
            request.StartedAt,
            request.TargetUpToMonth,
            request.TargetAmount,
            Guid.Parse(budgetId));

        var result = await Sender.Send(command);

        return result.ReturnAPIResponse();
    }

    [LambdaFunction(Role = FullAccessRole, ResourceName = nameof(RemoveTarget))]
    [HttpApi(LambdaHttpMethod.Put, $"{subcategoryBaseRoute}{{subcategoryId}}/target/remove")]
    public async Task<APIGatewayHttpApiV2ProxyResponse> RemoveTarget(
        string budgetId,
        string subcategoryId)
    {
        var command = new RemoveTargetCommand(Guid.Parse(subcategoryId), Guid.Parse(budgetId));

        var result = await Sender.Send(command);

        return result.ReturnAPIResponse();
    }
}