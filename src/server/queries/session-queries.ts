import "server-only";

import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { session } from "../db/schema";

export const getSessions = async (userId: string) => {
  const sessions = await db.query.session.findMany({
    where: eq(session.userId, userId),
  });

  return sessions;
};

export const getSession = async (sessionId: string) => {
  const sessionData = await db.query.session.findFirst({
    where: eq(session.id, sessionId),
  });

  if (!sessionData) throw new Error("Session not found");

  return sessionData;
};

export const deleteSession = async (sessionId: string) => {
  await db.delete(session).where(eq(session.id, sessionId));
};
