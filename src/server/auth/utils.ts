import "server-only";

import { decrypt } from ".";
import { cookies } from "next/headers";

export async function createTokenCookie(
  token: string,
  // 1 month expiration
  expiresAt: Date = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
): Promise<void> {
  (await cookies()).set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
  });
}

export async function deleteTokenCookie(): Promise<void> {
  (await cookies()).delete("token");
}

export async function validateSessionToken(token: string) {
  try {
    const payload = await decrypt(token);

    // Validate expiration
    const now = Date.now() / 1000;
    if (payload.exp && payload.exp < now) {
      return { session: null, user: null };
    }

    const session = {
      id: payload.jti ?? crypto.randomUUID(), // JWT ID claim or generate new
      userId: payload.id,
      expiresAt: new Date((payload.exp ?? 0) * 1000),
      createdAt: new Date((payload.iat ?? 0) * 1000).toISOString(),
    };

    const user = {
      id: payload.id,
      username: payload.username,
      createdAt: payload.createdAt,
      updatedAt: payload.updatedAt,
    };

    return { session, user };
  } catch {
    return { session: null, user: null };
  }
}
