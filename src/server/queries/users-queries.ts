import "server-only";

import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";

export const fetchUserDetail = async (userId: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  return user;
};

export const fetchUserByEmail = async (email: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  return user;
};
