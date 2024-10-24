import { createFileRoute } from "@tanstack/react-router";

import { getBudgetsQueryOptions } from "@/lib/api/budget";
import BudgetsLoadingSkeleton from "@/components/dashboard/budgets/BudgetsLoadingSkeleton";
import RouteLoadingError from "@/components/RouteLoadingError";
import { BudgetsPageParamsSchema } from "@/lib/validation/searchParams";

export const Route = createFileRoute("/_dashboard-layout/budget/")({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(getBudgetsQueryOptions);
  },
  pendingComponent: () => <BudgetsLoadingSkeleton />,
  errorComponent: ({ reset }) => <RouteLoadingError reset={reset} />,
  validateSearch: BudgetsPageParamsSchema,
});
