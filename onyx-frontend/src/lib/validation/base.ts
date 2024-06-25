import { z } from "zod";
import {
  DEFAULT_MONTH_STRING,
  DEFAULT_YEAR_STRING,
} from "@/lib/constants/date";

export const ErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
});

export const MoneySchema = z.object({
  currency: z.string().min(1),
  amount: z.number(),
});

export type Money = z.infer<typeof MoneySchema>;

export const MonthDateSchema = z.object({
  month: z.number(),
  year: z.number(),
});

export type MonthDate = z.infer<typeof MonthDateSchema>;

export const ResultSchema = z.object({
  isSuccess: z.boolean(),
  isFailure: z.boolean(),
  error: ErrorSchema,
});

export const TargetSchema = z.object({
  upToMonth: MonthDateSchema,
  startedAt: MonthDateSchema,
  targetAmount: MoneySchema,
  collectedAmount: MoneySchema,
  amountAssignedEveryMonth: MoneySchema,
  optimistic: z.boolean().optional(),
});

export type Target = z.infer<typeof TargetSchema>;

export const AssignmentSchema = z.object({
  month: MonthDateSchema,
  assignedAmount: MoneySchema,
  actualAmount: MoneySchema,
});

export type Assignment = z.infer<typeof AssignmentSchema>;

export const MonthStringSchema = z
  .string()
  .regex(/^\d{1,2}$/)
  .refine(
    (val) => {
      const monthNumber = parseInt(val, 10);
      return monthNumber >= 1 && monthNumber <= 12;
    },
    {
      message: "Month must be a number between 1 and 12",
    },
  )
  .catch(DEFAULT_MONTH_STRING)
  .default(DEFAULT_MONTH_STRING);

export const YearStringSchema = z
  .string()
  .refine((val) => Number(val) >= 2024, {
    message: "Year must be at least 2024",
  })
  .catch(DEFAULT_YEAR_STRING)
  .default(DEFAULT_YEAR_STRING);
