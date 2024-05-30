/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as HomeLayoutImport } from './routes/_home-layout'
import { Route as DashboardLayoutImport } from './routes/_dashboard-layout'
import { Route as HomeLayoutIndexImport } from './routes/_home-layout/index'
import { Route as DashboardLayoutStatisticsImport } from './routes/_dashboard-layout/statistics'
import { Route as DashboardLayoutHelpImport } from './routes/_dashboard-layout/help'
import { Route as DashboardLayoutGoalsImport } from './routes/_dashboard-layout/goals'
import { Route as DashboardLayoutBudgetImport } from './routes/_dashboard-layout/budget'
import { Route as DashboardLayoutAccountsImport } from './routes/_dashboard-layout/accounts'

// Create/Update Routes

const HomeLayoutRoute = HomeLayoutImport.update({
  id: '/_home-layout',
  getParentRoute: () => rootRoute,
} as any)

const DashboardLayoutRoute = DashboardLayoutImport.update({
  id: '/_dashboard-layout',
  getParentRoute: () => rootRoute,
} as any)

const HomeLayoutIndexRoute = HomeLayoutIndexImport.update({
  path: '/',
  getParentRoute: () => HomeLayoutRoute,
} as any)

const DashboardLayoutStatisticsRoute = DashboardLayoutStatisticsImport.update({
  path: '/statistics',
  getParentRoute: () => DashboardLayoutRoute,
} as any)

const DashboardLayoutHelpRoute = DashboardLayoutHelpImport.update({
  path: '/help',
  getParentRoute: () => DashboardLayoutRoute,
} as any)

const DashboardLayoutGoalsRoute = DashboardLayoutGoalsImport.update({
  path: '/goals',
  getParentRoute: () => DashboardLayoutRoute,
} as any)

const DashboardLayoutBudgetRoute = DashboardLayoutBudgetImport.update({
  path: '/budget',
  getParentRoute: () => DashboardLayoutRoute,
} as any)

const DashboardLayoutAccountsRoute = DashboardLayoutAccountsImport.update({
  path: '/accounts',
  getParentRoute: () => DashboardLayoutRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_dashboard-layout': {
      id: '/_dashboard-layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof DashboardLayoutImport
      parentRoute: typeof rootRoute
    }
    '/_home-layout': {
      id: '/_home-layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof HomeLayoutImport
      parentRoute: typeof rootRoute
    }
    '/_dashboard-layout/accounts': {
      id: '/_dashboard-layout/accounts'
      path: '/accounts'
      fullPath: '/accounts'
      preLoaderRoute: typeof DashboardLayoutAccountsImport
      parentRoute: typeof DashboardLayoutImport
    }
    '/_dashboard-layout/budget': {
      id: '/_dashboard-layout/budget'
      path: '/budget'
      fullPath: '/budget'
      preLoaderRoute: typeof DashboardLayoutBudgetImport
      parentRoute: typeof DashboardLayoutImport
    }
    '/_dashboard-layout/goals': {
      id: '/_dashboard-layout/goals'
      path: '/goals'
      fullPath: '/goals'
      preLoaderRoute: typeof DashboardLayoutGoalsImport
      parentRoute: typeof DashboardLayoutImport
    }
    '/_dashboard-layout/help': {
      id: '/_dashboard-layout/help'
      path: '/help'
      fullPath: '/help'
      preLoaderRoute: typeof DashboardLayoutHelpImport
      parentRoute: typeof DashboardLayoutImport
    }
    '/_dashboard-layout/statistics': {
      id: '/_dashboard-layout/statistics'
      path: '/statistics'
      fullPath: '/statistics'
      preLoaderRoute: typeof DashboardLayoutStatisticsImport
      parentRoute: typeof DashboardLayoutImport
    }
    '/_home-layout/': {
      id: '/_home-layout/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof HomeLayoutIndexImport
      parentRoute: typeof HomeLayoutImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  DashboardLayoutRoute: DashboardLayoutRoute.addChildren({
    DashboardLayoutAccountsRoute,
    DashboardLayoutBudgetRoute,
    DashboardLayoutGoalsRoute,
    DashboardLayoutHelpRoute,
    DashboardLayoutStatisticsRoute,
  }),
  HomeLayoutRoute: HomeLayoutRoute.addChildren({ HomeLayoutIndexRoute }),
})

/* prettier-ignore-end */