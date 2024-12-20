import StatisticsPendingComponent from "@/components/dashboard/statistics/StatisticsPendingComponent";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_dashboard-layout/budget/$budgetSlug/statistics/_statistics-layout/accounts",
)({
  pendingComponent: () => <StatisticsPendingComponent />,
});
