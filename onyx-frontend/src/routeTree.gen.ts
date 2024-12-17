/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as HomeLayoutImport } from './routes/_home-layout'
import { Route as DashboardLayoutImport } from './routes/_dashboard-layout'
import { Route as AuthImport } from './routes/_auth'
import { Route as HomeLayoutIndexImport } from './routes/_home-layout/index'
import { Route as AuthLoginRouteImport } from './routes/_auth/login/route'
import { Route as DashboardLayoutBudgetsJoinRouteImport } from './routes/_dashboard-layout/budgets/join/route'
import { Route as AuthLoginGoogleRouteImport } from './routes/_auth/login_.google/route'
import { Route as DashboardLayoutBudgetIndexRouteImport } from './routes/_dashboard-layout/budget.index/route'
import { Route as DashboardLayoutBudgetBudgetSlugIndexImport } from './routes/_dashboard-layout/budget.$budgetSlug/index'
import { Route as DashboardLayoutBudgetBudgetSlugStatisticsStatisticsLayoutImport } from './routes/_dashboard-layout/budget.$budgetSlug/statistics/_statistics-layout'
import { Route as DashboardLayoutBudgetBudgetSlugAccountsAccountSlugRouteImport } from './routes/_dashboard-layout/budget.$budgetSlug/accounts.$accountSlug/route'
import { Route as DashboardLayoutBudgetBudgetSlugStatisticsStatisticsLayoutCounterpartiesRouteImport } from './routes/_dashboard-layout/budget.$budgetSlug/statistics/_statistics-layout/counterparties/route'
import { Route as DashboardLayoutBudgetBudgetSlugStatisticsStatisticsLayoutCategoriesRouteImport } from './routes/_dashboard-layout/budget.$budgetSlug/statistics/_statistics-layout/categories/route'
import { Route as DashboardLayoutBudgetBudgetSlugStatisticsStatisticsLayoutAccountsRouteImport } from './routes/_dashboard-layout/budget.$budgetSlug/statistics/_statistics-layout/accounts/route'

// Create Virtual Routes

const DashboardLayoutBudgetBudgetSlugStatisticsImport = createFileRoute(
  '/_dashboard-layout/budget/$budgetSlug/statistics',
)()

// Create/Update Routes

const HomeLayoutRoute = HomeLayoutImport.update({
  id: '/_home-layout',
  getParentRoute: () => rootRoute,
} as any)

const DashboardLayoutRoute = DashboardLayoutImport.update({
  id: '/_dashboard-layout',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/_dashboard-layout.lazy').then((d) => d.Route),
)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const HomeLayoutIndexRoute = HomeLayoutIndexImport.update({
  path: '/',
  getParentRoute: () => HomeLayoutRoute,
} as any)

const AuthLoginRouteRoute = AuthLoginRouteImport.update({
  path: '/login',
  getParentRoute: () => AuthRoute,
} as any).lazy(() =>
  import('./routes/_auth/login/route.lazy').then((d) => d.Route),
)

const DashboardLayoutBudgetsJoinRouteRoute =
  DashboardLayoutBudgetsJoinRouteImport.update({
    path: '/budgets/join',
    getParentRoute: () => DashboardLayoutRoute,
  } as any)

const AuthLoginGoogleRouteRoute = AuthLoginGoogleRouteImport.update({
  path: '/login/google',
  getParentRoute: () => AuthRoute,
} as any).lazy(() =>
  import('./routes/_auth/login_.google/route.lazy').then((d) => d.Route),
)

const DashboardLayoutBudgetIndexRouteRoute =
  DashboardLayoutBudgetIndexRouteImport.update({
    path: '/budget/',
    getParentRoute: () => DashboardLayoutRoute,
  } as any).lazy(() =>
    import('./routes/_dashboard-layout/budget.index/route.lazy').then(
      (d) => d.Route,
    ),
  )

const DashboardLayoutBudgetBudgetSlugStatisticsRoute =
  DashboardLayoutBudgetBudgetSlugStatisticsImport.update({
    path: '/budget/$budgetSlug/statistics',
    getParentRoute: () => DashboardLayoutRoute,
  } as any)

const DashboardLayoutBudgetBudgetSlugIndexRoute =
  DashboardLayoutBudgetBudgetSlugIndexImport.update({
    path: '/budget/$budgetSlug/',
    getParentRoute: () => DashboardLayoutRoute,
  } as any).lazy(() =>
    import('./routes/_dashboard-layout/budget.$budgetSlug/index.lazy').then(
      (d) => d.Route,
    ),
  )

const DashboardLayoutBudgetBudgetSlugStatisticsStatisticsLayoutRoute =
  DashboardLayoutBudgetBudgetSlugStatisticsStatisticsLayoutImport.update({
    id: '/_statistics-layout',
    getParentRoute: () => DashboardLayoutBudgetBudgetSlugStatisticsRoute,
  } as any).lazy(() =>
    import(
      './routes/_dashboard-layout/budget.$budgetSlug/statistics/_statistics-layout.lazy'
    ).then((d) => d.Route),
  )

const DashboardLayoutBudgetBudgetSlugAccountsAccountSlugRouteRoute =
  DashboardLayoutBudgetBudgetSlugAccountsAccountSlugRouteImport.update({
    path: '/budget/$budgetSlug/accounts/$accountSlug',
    getParentRoute: () => DashboardLayoutRoute,
  } as any).lazy(() =>
    import(
      './routes/_dashboard-layout/budget.$budgetSlug/accounts.$accountSlug/route.lazy'
    ).then((d) => d.Route),
  )

const DashboardLayoutBudgetBudgetSlugStatisticsStatisticsLayoutCounterpartiesRouteRoute =
  DashboardLayoutBudgetBudgetSlugStatisticsStatisticsLayoutCounterpartiesRouteImport.update(
    {
      path: '/counterparties',
      getParentRoute: () =>
        DashboardLayoutBudgetBudgetSlugStatisticsStatisticsLayoutRoute,
    } as any,
  ).lazy(() =>
    import(
      './routes/_dashboard-layout/budget.$budgetSlug/statistics/_statistics-layout/counterparties/route.lazy'
    ).then((d) => d.Route),
  )

const DashboardLayoutBudgetBudgetSlugStatisticsStatisticsLayoutCategoriesRouteRoute =
  DashboardLayoutBudgetBudgetSlugStatisticsStatisticsLayoutCategoriesRouteImport.update(
    {
      path: '/categories',
      getParentRoute: () =>
        DashboardLayoutBudgetBudgetSlugStatisticsStatisticsLayoutRoute,
    } as any,
  ).lazy(() =>
    import(
      './routes/_dashboard-layout/budget.$budgetSlug/statistics/_statistics-layout/categories/route.lazy'
    ).then((d) => d.Route),
  )

const DashboardLayoutBudgetBudgetSlugStatisticsStatisticsLayoutAccountsRouteRoute =
  DashboardLayoutBudgetBudgetSlugStatisticsStatisticsLayoutAccountsRouteImport.update(
    {
      path: '/accounts',
      getParentRoute: () =>
        DashboardLayoutBudgetBudgetSlugStatisticsStatisticsLayoutRoute,
    } as any,
  ).lazy(() =>
    import(
      './routes/_dashboard-layout/budget.$budgetSlug/statistics/_statistics-layout/accounts/route.lazy'
    ).then((d) => d.Route),
  )

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
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
    '/_auth/login': {
      id: '/_auth/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof AuthLoginRouteImport
      parentRoute: typeof AuthImport
    }
    '/_home-layout/': {
      id: '/_home-layout/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof HomeLayoutIndexImport
      parentRoute: typeof HomeLayoutImport
    }
    '/_dashboard-layout/budget/': {
      id: '/_dashboard-layout/budget/'
      path: '/budget'
      fullPath: '/budget'
      preLoaderRoute: typeof DashboardLayoutBudgetIndexRouteImport
      parentRoute: typeof DashboardLayoutImport
    }
    '/_auth/login/google': {
      id: '/_auth/login/google'
      path: '/login/google'
      fullPath: '/login/google'
      preLoaderRoute: typeof AuthLoginGoogleRouteImport
      parentRoute: typeof AuthImport
    }
    '/_dashboard-layout/budgets/join': {
      id: '/_dashboard-layout/budgets/join'
      path: '/budgets/join'
      fullPath: '/budgets/join'
      preLoaderRoute: typeof DashboardLayoutBudgetsJoinRouteImport
      parentRoute: typeof DashboardLayoutImport
    }
    '/_dashboard-layout/budget/$budgetSlug/': {
      id: '/_dashboard-layout/budget/$budgetSlug/'
      path: '/budget/$budgetSlug'
      fullPath: '/budget/$budgetSlug'
      preLoaderRoute: typeof DashboardLayoutBudgetBudgetSlugIndexImport
      parentRoute: typeof DashboardLayoutImport
    }
    '/_dashboard-layout/budget/$budgetSlug/accounts/$accountSlug': {
      id: '/_dashboard-layout/budget/$budgetSlug/accounts/$accountSlug'
      path: '/budget/$budgetSlug/accounts/$accountSlug'
      fullPath: '/budget/$budgetSlug/accounts/$accountSlug'
      preLoaderRoute: typeof DashboardLayoutBudgetBudgetSlugAccountsAccountSlugRouteImport
      parentRoute: typeof DashboardLayoutImport
    }
    '/_dashboard-layout/budget/$budgetSlug/statistics': {
      id: '/_dashboard-layout/budget/$budgetSlug/statistics'
      path: '/budget/$budgetSlug/statistics'
      fullPath: '/budget/$budgetSlug/statistics'
      preLoaderRoute: typeof DashboardLayoutBudgetBudgetSlugStatisticsImport
      parentRoute: typeof DashboardLayoutImport
    }
    '/_dashboard-layout/budget/$budgetSlug/statistics/_statistics-layout': {
      id: '/_dashboard-layout/budget/$budgetSlug/statistics/_statistics-layout'
      path: '/budget/$budgetSlug/statistics'
      fullPath: '/budget/$budgetSlug/statistics'
      preLoaderRoute: typeof DashboardLayoutBudgetBudgetSlugStatisticsStatisticsLayoutImport
      parentRoute: typeof DashboardLayoutBudgetBudgetSlugStatisticsRoute
    }
    '/_dashboard-layout/budget/$budgetSlug/statistics/_statistics-layout/accounts': {
      id: '/_dashboard-layout/budget/$budgetSlug/statistics/_statistics-layout/accounts'
      path: '/accounts'
      fullPath: '/budget/$budgetSlug/statistics/accounts'
      preLoaderRoute: typeof DashboardLayoutBudgetBudgetSlugStatisticsStatisticsLayoutAccountsRouteImport
      parentRoute: typeof DashboardLayoutBudgetBudgetSlugStatisticsStatisticsLayoutImport
    }
    '/_dashboard-layout/budget/$budgetSlug/statistics/_statistics-layout/categories': {
      id: '/_dashboard-layout/budget/$budgetSlug/statistics/_statistics-layout/categories'
      path: '/categories'
      fullPath: '/budget/$budgetSlug/statistics/categories'
      preLoaderRoute: typeof DashboardLayoutBudgetBudgetSlugStatisticsStatisticsLayoutCategoriesRouteImport
      parentRoute: typeof DashboardLayoutBudgetBudgetSlugStatisticsStatisticsLayoutImport
    }
    '/_dashboard-layout/budget/$budgetSlug/statistics/_statistics-layout/counterparties': {
      id: '/_dashboard-layout/budget/$budgetSlug/statistics/_statistics-layout/counterparties'
      path: '/counterparties'
      fullPath: '/budget/$budgetSlug/statistics/counterparties'
      preLoaderRoute: typeof DashboardLayoutBudgetBudgetSlugStatisticsStatisticsLayoutCounterpartiesRouteImport
      parentRoute: typeof DashboardLayoutBudgetBudgetSlugStatisticsStatisticsLayoutImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  AuthRoute: AuthRoute.addChildren({
    AuthLoginRouteRoute,
    AuthLoginGoogleRouteRoute,
  }),
  DashboardLayoutRoute: DashboardLayoutRoute.addChildren({
    DashboardLayoutBudgetIndexRouteRoute,
    DashboardLayoutBudgetsJoinRouteRoute,
    DashboardLayoutBudgetBudgetSlugIndexRoute,
    DashboardLayoutBudgetBudgetSlugAccountsAccountSlugRouteRoute,
    DashboardLayoutBudgetBudgetSlugStatisticsRoute:
      DashboardLayoutBudgetBudgetSlugStatisticsRoute.addChildren({
        DashboardLayoutBudgetBudgetSlugStatisticsStatisticsLayoutRoute:
          DashboardLayoutBudgetBudgetSlugStatisticsStatisticsLayoutRoute.addChildren(
            {
              DashboardLayoutBudgetBudgetSlugStatisticsStatisticsLayoutAccountsRouteRoute,
              DashboardLayoutBudgetBudgetSlugStatisticsStatisticsLayoutCategoriesRouteRoute,
              DashboardLayoutBudgetBudgetSlugStatisticsStatisticsLayoutCounterpartiesRouteRoute,
            },
          ),
      }),
  }),
  HomeLayoutRoute: HomeLayoutRoute.addChildren({ HomeLayoutIndexRoute }),
})

/* prettier-ignore-end */