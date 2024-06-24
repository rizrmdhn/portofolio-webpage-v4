import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(3, {
      message: "Email is too short (minimum is 3 characters)",
    })
    .email("Invalid email address"),
  password: z.string().min(8, {
    message: "Password is too short (minimum is 8 characters)",
  }),
});

export const registerSchema = z.object({
  name: z.string().min(3, {
    message: "Fullname is too short (minimum is 3 characters)",
  }),
  email: z
    .string()
    .min(3, {
      message: "Email is too short (minimum is 3 characters)",
    })
    .email("Invalid email address"),
  password: z.string().min(8, {
    message: "Password is too short (minimum is 8 characters)",
  }),
});
