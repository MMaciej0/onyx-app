import { FC, MouseEvent, useMemo, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { ChevronRight } from "lucide-react";
import SubcategoryAccordionContent from "@/components/dashboard/budget/subcategoriesCard/subcategoryAccordion/subcategoryAccordionContent/SubcategoryAccordionContent";
import SubcategoryAccordionAssignmentForm from "@/components/dashboard/budget/subcategoriesCard/subcategoryAccordion/SubcategoryAccordionAssignmentForm";
import SubcategoryAccordionNameForm from "@/components/dashboard/budget/subcategoriesCard/subcategoryAccordion/SubcategoryAccordionNameForm";

import { Subcategory } from "@/lib/validation/subcategory";
import { cn, getFormattedCurrency } from "@/lib/utils";
import { Currency, Money } from "@/lib/validation/base";
import { getToAssignQueryKey } from "@/lib/api/budget";
import { useBudgetStore } from "@/store/dashboard/budgetStore";
import { useAuthStore } from "@/store/auth/authStore";

interface SubcategoryAccordionProps {
  subcategory: Subcategory;
}

const SubcategoryAccordion: FC<SubcategoryAccordionProps> = ({
  subcategory,
}) => {
  const queryClient = useQueryClient();
  const budgetId = useBudgetStore.use.budgetId();
  const selectedSubcategoryId = useBudgetStore.use.subcategoryId();
  const month = useBudgetStore.use.budgetMonth();
  const year = useBudgetStore.use.budgetYear();
  const user = useAuthStore.use.user();
  const budgetToAssign = queryClient.getQueryData<Money>(
    getToAssignQueryKey(budgetId),
  );
  const setSubcategoryId = useBudgetStore.use.setSubcategoryId();

  const [isNameEditActive, setIsNameEditActive] = useState(false);

  const assignFormRef = useRef<HTMLDivElement>(null);
  const isActive = selectedSubcategoryId === subcategory.id;
  const isDisabled = subcategory.name === "Unknown";

  const onExpandClick = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
  ) => {
    const isAssignFormClicked = assignFormRef.current?.contains(
      e.target as Node,
    );
    if (isAssignFormClicked || isNameEditActive || isDisabled) return;
    setSubcategoryId(isActive ? null : subcategory.id);
  };

  const currentlyAssigned = useMemo(
    () =>
      subcategory.assignments?.find(
        (asignment) =>
          asignment.month.month === month && asignment.month.year === year,
      ),
    [subcategory, month, year],
  );

  const currencyToDisplay =
    currentlyAssigned?.actualAmount.currency ||
    budgetToAssign?.currency ||
    (user?.currency as Currency);

  return (
    <li
      className={cn(
        isActive && "border-b last-of-type:border-none",
        subcategory.optimistic && "opacity-50",
        isDisabled && "cursor-not-allowed opacity-50",
      )}
    >
      <div
        onClick={(e) => onExpandClick(e)}
        className={cn(
          "grid cursor-pointer grid-cols-3 items-center space-x-4 p-3 text-sm transition-all duration-200 hover:bg-accent",
          isActive && "border-b",
          isDisabled && "cursor-not-allowed",
        )}
      >
        <div className="col-span-1 flex items-center md:space-x-4">
          <ChevronRight
            className={cn(
              "flex-shrink-0 rotate-0 opacity-60 transition-all duration-300 ease-in-out",
              isActive && "rotate-90",
            )}
          />
          <SubcategoryAccordionNameForm
            subcategory={subcategory}
            isNameEditActive={isNameEditActive}
            setIsNameEditActive={setIsNameEditActive}
          />
        </div>
        <div className="col-span-2 grid grid-cols-2 items-center justify-items-end gap-x-4">
          <p>
            {getFormattedCurrency(
              currentlyAssigned?.actualAmount.amount || 0,
              currencyToDisplay,
            )}
          </p>
          <div className="md:ml-10" ref={assignFormRef}>
            {currencyToDisplay && (
              <SubcategoryAccordionAssignmentForm
                defaultAmount={currentlyAssigned?.assignedAmount.amount}
                currencyToDisplay={currencyToDisplay}
                subcategoryId={subcategory.id}
                disabled={isDisabled}
              />
            )}
          </div>
        </div>
      </div>
      <div
        className={cn(
          "grid grid-rows-[0fr] transition-all duration-300 ease-in-out",
          isActive && "grid-rows-[1fr]",
        )}
      >
        <div className="overflow-hidden">
          <SubcategoryAccordionContent
            subcategory={subcategory}
            currencyToDisplay={currencyToDisplay}
            setIsNameEditActive={setIsNameEditActive}
          />
        </div>
      </div>
    </li>
  );
};

export default SubcategoryAccordion;
