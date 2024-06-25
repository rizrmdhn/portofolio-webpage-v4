import { z } from "zod";

export const addProjectSchema = z.object({
  name: z.string().min(3, {
    message: "Name is too short (minimum is 3 characters)",
  }),
  description: z.string().min(3, {
    message: "Description is too short (minimum is 3 characters)",
  }),
  tech: z
    .string()
    .min(1, {
      message: "Tech is required",
    })
    .describe("List of tech used in the project"),
  github_url: z.string().optional(),
  url: z.string().optional(),
});

export const updateProjectSchema = z.object({
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
  tech: z
    .string()
    .min(1, {
      message: "Tech is required",
    })
    .describe("List of tech used in the project")
    .optional(),
  github_url: z.string().optional(),
  url: z.string().optional(),
});
