import "server-only";

import type { JWTPayload as JoseJWTPayload } from "jose";
import { jwtVerify, SignJWT } from "jose";

import { env } from "@/env";

export interface Session {
  id: string;
  userId: string;
  expiresAt: Date;
  createdAt: string;
}

export interface SessionUser {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface JWTPayload extends JoseJWTPayload {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string | null;
}

const secretKey = env.JWT_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: JWTPayload): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    // 1 month expiration
    .setExpirationTime("30d")
    .sign(key);
}

export async function decrypt(token: string): Promise<JWTPayload> {
  const { payload } = await jwtVerify(token, key);
  return payload as JWTPayload;
}
