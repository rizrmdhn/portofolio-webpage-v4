import { z } from "zod";

export const addExperienceSchema = z.object({
  name: z.string().min(3, {
    message: "Name is too short (minimum is 3 characters)",
  }),
  description: z.string().min(3, {
    message: "Description is too short (minimum is 3 characters)",
  }),
  company: z.string().min(3, {
    message: "Company is too short (minimum is 3 characters)",
  }),
  type: z
    .enum(["work", "internship", "freelance"])
    .describe("Type of experience"),
  date: z
    .string()
    .min(1, {
      message: "Date is required",
    })
    .describe("Date of experience"),
});

export const updateExperienceSchema = z.object({
  id: z.string({
    required_error: "ID is required",
  }),
  name: z
    .string()
    .min(3, {
      message: "Name is too short (minimum is 3 characters)",
    })
    .optional(),
  description: z
    .string()
    .min(3, {
      message: "Description is too short (minimum is 3 characters)",
    })
    .optional(),
  company: z
    .string()
    .min(3, {
      message: "Company is too short (minimum is 3 characters)",
    })
    .optional(),
  type: z
    .enum(["work", "internship", "freelance"])
    .describe("Type of experience")
    .optional(),
  date: z
    .string()
    .min(1, {
      message: "Date is required",
    })
    .describe("Date of experience")
    .optional(),
});
