import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";

import { validateSessionToken } from "./utils";
import { type Session, type SessionUser } from ".";

export const getCurrentSession = cache(
  async (): Promise<{
    session: Session | null;
    user: SessionUser | null;
  }> => {
    const token = cookies().get("token")?.value;

    if (!token) {
      return { session: null, user: null };
    }

    const result = await validateSessionToken(token);
    return result;
  },
);

export default getCurrentSession;
