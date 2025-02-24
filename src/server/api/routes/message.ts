import {
  deleteMessage,
  getLatestMessages,
  insertMessage,
} from "@/server/queries/message-queries";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { createMesssageSchema } from "@/schema/message";
import { z } from "zod";

export const messageRouter = createTRPCRouter({
  list: protectedProcedure.query(async () => {
    const result = await getLatestMessages();

    return result;
  }),

  create: publicProcedure
    .input(createMesssageSchema)
    .mutation(async ({ input }) => {
      const result = await insertMessage(input);

      return result;
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string({
          required_error: "ID is required",
        }),
      }),
    )
    .mutation(async ({ input: { id } }) => {
      const result = await deleteMessage(id);

      return result;
    }),
});
