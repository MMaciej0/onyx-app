import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard-layout/budget/$budgetSlug/statistics')({
  component: () => <div>Hello /_dashboard-layout/budget/$budgetId/statistics/ts!</div>
})