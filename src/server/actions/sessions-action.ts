"use server";

import { getUser } from "@/lib/session";
import {
  deleteSession,
  getSession,
  getSessions,
} from "../queries/session-queries";
import { authActionClient } from "@/lib/safe-action";
import { z } from "zod";
import response from "@/lib/response";
import { revalidatePath } from "next/cache";

export const getSessionListAction = async () => {
  const user = await getUser();

  if (!user) {
    throw new Error("Unauthorized user does not exist");
  }

  if (user.email !== "rizrmdhn@admin.com") {
    throw new Error("Unauthorized only admin can access");
  }

  const sessions = await getSessions(user.id);

  return sessions;
};

export const deleteSessionAction = authActionClient
  .schema(
    z.object({
      sessionId: z.string(),
    }),
  )
  .action(async ({ parsedInput: { sessionId } }) => {
    try {
      const session = await getSession(sessionId);

      await deleteSession(session.id);

      revalidatePath("/dashboard/settings/active-sessions");

      return response("success", "Session deleted successfully");
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  });
