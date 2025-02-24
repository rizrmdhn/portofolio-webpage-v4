import "server-only";
import { db } from "../db";
import { messages } from "../db/schema";
import { z } from "zod";
import { createMesssageSchema } from "@/schema/message";
import { nanoid } from "nanoid";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";

export const getLatestMessages = async () => {
  const results = await db.query.messages.findMany({
    orderBy: (messages, { desc }) => [desc(messages.created_at)],
  });

  return results;
};

export const findMessageById = async (id: string) => {
  const message = await db.query.messages.findFirst({
    where: eq(messages.id, id),
  });

  return message;
};

export const insertMessage = async (
  data: z.infer<typeof createMesssageSchema>,
) => {
  const [message] = await db
    .insert(messages)
    .values({
      id: `message_${nanoid(16)}`,
      ...data,
    })
    .returning()
    .execute();

  if (!message) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to insert message",
    });
  }

  return message;
};

export const deleteMessage = async (id: string) => {
  const isExists = await findMessageById(id);

  if (!isExists) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Message not found",
    });
  }

  const [result] = await db
    .delete(messages)
    .where(eq(messages.id, id))
    .returning()
    .execute();

  if (!result) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to delete message",
    });
  }

  return result;
};
