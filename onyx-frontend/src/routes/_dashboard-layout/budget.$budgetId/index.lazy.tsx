import { useMemo, useState } from "react";
import { useSuspenseQueries } from "@tanstack/react-query";
import { Navigate, createLazyFileRoute } from "@tanstack/react-router";

import AssignmentCard from "@/components/dashboard/budget/assignmentCard/AssigmentCard";
import CategoriesCard from "@/components/dashboard/budget/categoriesCard/CategoriesCard";
import SubcategoriesCard from "@/components/dashboard/budget/subcategoriesCard/SubcategoriesCard";

import { getToAssignQueryOptions } from "@/lib/api/budget";
import { getCategoriesQueryOptions } from "@/lib/api/category";
import {
  DEFAULT_MONTH_NUMBER,
  DEFAULT_YEAR_STRING,
} from "@/lib/constants/date";

export const Route = createLazyFileRoute(
  "/_dashboard-layout/budget/$budgetId/",
)({
  component: SingleBudget,
});

function SingleBudget() {
  const [activeCategoryId, setActiveCategoryId] = useState("");
  const { budgetId } = Route.useParams();
  const { month, year } = Route.useSearch();
  const [{ data: categories }, { data: toAssign }] = useSuspenseQueries({
    queries: [
      getCategoriesQueryOptions(budgetId),
      getToAssignQueryOptions({ budgetId, month, year }),
    ],
  });
  const activeCategoryData = categories.find(
    (category) => category.id === activeCategoryId,
  );

  const availableDates = useMemo(() => {
    const initialDates = {
      [DEFAULT_YEAR_STRING]: new Set([
        DEFAULT_MONTH_NUMBER - 1,
        DEFAULT_MONTH_NUMBER,
      ]),
    };

    const aggregatedDates = categories.reduce((result, category) => {
      category.subcategories.forEach((subcategory) => {
        subcategory.assignments?.forEach((assignment) => {
          if (assignment?.month) {
            const { year, month } = assignment.month;
            if (!result[year]) {
              result[year] = new Set();
            }
            result[year].add(month - 1);
          }
        });
      });
      return result;
    }, initialDates);

    const sortedAvailableDates = Object.fromEntries(
      Object.entries(aggregatedDates).map(([year, monthsSet]) => [
        Number(year),
        Array.from(monthsSet).sort((a, b) => a - b),
      ]),
    );

    return sortedAvailableDates;
  }, [categories]);

  if (
    !Object.keys(availableDates).includes(year) ||
    !availableDates[year].includes(Number(month) - 1)
  ) {
    return <Navigate to="/budget" />;
  }

  return (
    <div className="grid h-full grid-cols-1 gap-x-8 gap-y-4 overflow-hidden rounded-md lg:grid-cols-5">
      <div className="flex h-full flex-col space-y-4 lg:col-span-2">
        <AssignmentCard toAssign={toAssign} availableDates={availableDates} />
        <CategoriesCard
          activeCategoryId={activeCategoryId}
          setActiveCategoryId={setActiveCategoryId}
          categories={categories}
        />
      </div>
      {activeCategoryData && (
        <SubcategoriesCard activeCategory={activeCategoryData} />
      )}
    </div>
  );
}
