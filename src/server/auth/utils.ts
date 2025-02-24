import "server-only";

import { decrypt, Session, SessionUser } from ".";
import { cookies } from "next/headers";

export async function createTokenCookie(
  token: string,
  // 1 month expiration
  expiresAt: Date = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
): Promise<void> {
  cookies().set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
  });
}

export async function deleteTokenCookie(): Promise<void> {
  cookies().delete("token");
}

export async function validateSessionToken(token: string): Promise<{
  session: Session | null;
  user: SessionUser | null;
}> {
  try {
    const payload = await decrypt(token);

    // Validate expiration
    const now = Date.now() / 1000;
    if (payload.exp && payload.exp < now) {
      return { session: null, user: null };
    }

    const session: Session = {
      id: payload.jti ?? crypto.randomUUID(), // JWT ID claim or generate new
      userId: payload.id,
      expiresAt: new Date((payload.exp ?? 0) * 1000),
      createdAt: new Date((payload.iat ?? 0) * 1000).toISOString(),
    };

    const user: SessionUser = {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      createdAt: payload.createdAt,
      updatedAt: payload.updatedAt,
    };

    return { session, user };
  } catch {
    return { session: null, user: null };
  }
}
