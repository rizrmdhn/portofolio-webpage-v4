import { z } from "zod";

export const createMesssageSchema = z.object({
  name: z.string().min(3, {
    message: "Name is too short (minimum is 3 characters)",
  }),
  email: z
    .string()
    .min(3, {
      message: "Email is too short (minimum is 3 characters)",
    })
    .email("Invalid email address"),
  message: z.string().min(3, {
    message: "Message is too short (minimum is 3 characters)",
  }),
});
