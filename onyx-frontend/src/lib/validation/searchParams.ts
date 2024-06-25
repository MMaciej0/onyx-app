import { z } from "zod";
import { MonthStringSchema, YearStringSchema } from "@/lib/validation/base";

export const SingleBudgetPageParamsSchema = z.object({
  month: MonthStringSchema,
  year: YearStringSchema,
});
