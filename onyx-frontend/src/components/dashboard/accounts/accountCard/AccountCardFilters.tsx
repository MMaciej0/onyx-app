import { FC, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { format } from "date-fns";

import AccountCardFiltersDayCalendar from "@/components/dashboard/accounts/accountCard/AccountCardFiltersDayCalendar";
import AccountCardFiltersWeekCalendar from "@/components/dashboard/accounts/accountCard/AccountCardFiltersWeekCalendar";
import AccountCardFiltersMonthCalendar from "@/components/dashboard/accounts/accountCard/AccountCardFiltersMonthCalendar";
import AccountCardFiltersRangeCalendar from "@/components/dashboard/accounts/accountCard/AccountCardFiltersRangeCalendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { DATE_PERIOD_OPTIONS, DATE_PERIOD_SELECT } from "@/lib/constants/date";
import { getTransactionsQueryKey } from "@/lib/api/transaction";
import { SingleBudgetPageSearchParams } from "@/lib/validation/searchParams";

interface AccountCardFiltersProps {
  disabled: boolean;
}

const AccountCardFilters: FC<AccountCardFiltersProps> = ({ disabled }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { accPeriod } = useSearch({
    from: "/_dashboard-layout/budget/$budgetId/accounts/$accountId",
  });
  const { accountId } = useParams({
    from: "/_dashboard-layout/budget/$budgetId/accounts/$accountId",
  });

  const defaultPeriod =
    DATE_PERIOD_SELECT.find((v) => v.value === accPeriod)?.value || "";

  const [selectedPeriod, setSelectedPeriod] = useState<
    (typeof DATE_PERIOD_OPTIONS)[number]
  >(defaultPeriod as (typeof DATE_PERIOD_OPTIONS)[number]);

  const handleSelectChange = async (
    value: (typeof DATE_PERIOD_OPTIONS)[number],
  ) => {
    setSelectedPeriod(value);

    if (value === "last30days" || value === "last7days") {
      await navigate({
        search: (prev: SingleBudgetPageSearchParams) => ({
          ...prev,
          accPeriod: value,
          accDate: format(new Date(), "yyyy-MM-dd"),
        }),
        mask: "/budget/$budgetId/accounts/$accountId",
      });
      await queryClient.invalidateQueries({
        queryKey: getTransactionsQueryKey(accountId),
      });
    }
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium tracking-wide text-muted-foreground">
        Display data for:
      </p>
      <div className="grid grid-cols-1 gap-y-2 md:grid-cols-2 md:gap-x-2 md:gap-y-0">
        <Select
          disabled={disabled}
          value={selectedPeriod}
          onValueChange={(v) =>
            handleSelectChange(v as (typeof DATE_PERIOD_OPTIONS)[number])
          }
        >
          <SelectTrigger className="w-full bg-transparent">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {DATE_PERIOD_SELECT.map((select, index) => (
              <SelectItem key={index} value={select.value}>
                {select.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedPeriod === "day" && <AccountCardFiltersDayCalendar />}
        {selectedPeriod === "week" && <AccountCardFiltersWeekCalendar />}
        {selectedPeriod === "month" && <AccountCardFiltersMonthCalendar />}
        {selectedPeriod === "range" && <AccountCardFiltersRangeCalendar />}
      </div>
    </div>
  );
};

export default AccountCardFilters;
