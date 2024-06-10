﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abstractions.Messaging;
using Budget.Application.Budgets.Models;

namespace Budget.Application.Budgets.AddUserToBudget;

public sealed record AddUserToBudgetCommand(Guid BudgetId, string Token) : ICommand<BudgetModel>;