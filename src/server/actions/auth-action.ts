"use server";

import { actionClient, authActionClient } from "@/lib/safe-action";
import { loginSchema, registerSchema } from "@/schema/auth";
import { fetchUserByEmail } from "../queries/users-queries";
import { verify, hash } from "@node-rs/argon2";
import { lucia } from "@/lib/auth";
import { nanoid } from "nanoid";
import response from "@/lib/response";
import { cookies } from "next/headers";
import { db } from "../db";
import { users } from "../db/schema";
import { getIP, getUserAgent, getUserCountry } from "@/lib/ip-grabber";

export const login = actionClient
  .schema(loginSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    const user = await fetchUserByEmail(email);

    if (!user) {
      throw new Error("Invalid user credentials");
    }

    const verifyPasswordResult = await verify(user.password!, password);

    if (!verifyPasswordResult) {
      throw new Error("Invalid user credentials");
    }

    const userCountry = await getUserCountry(getIP());

    const session = await lucia.createSession(
      user.id,
      {
        ip: getIP(),
        os: `${getUserAgent().os.name} ${getUserAgent().os.version}`,
        country: `${userCountry?.city}, ${userCountry?.countryCode}`,
        timezone: userCountry?.timezone,
        userAgent: getUserAgent().ua,
        browser: `${getUserAgent().browser.name} ${getUserAgent().browser.version}`,
        createdAt: new Date().toISOString(),
      },
      {
        sessionId: `session_${nanoid(16)}`,
      },
    );

    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return response("success", "Login successful", { session });
  });

export const register = actionClient
  .schema(registerSchema)
  .action(async ({ parsedInput: { name, email, password } }) => {
    try {
      const user = await fetchUserByEmail(email);

      if (user) {
        throw new Error("User already exists");
      }

      const hashedPassword = await hash(password);

      const newUser = await db
        .insert(users)
        .values({
          id: `user_${nanoid(16)}`,
          name,
          email,
          password: hashedPassword,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
        .returning({
          id: users.id,
          name: users.name,
          email: users.email,
          created_at: users.createdAt,
          updated_at: users.updatedAt,
        });

      return response("success", "Registration successful", { user: newUser });
    } catch (error) {
      throw new Error(`${error}`);
    }
  });

export const logout = authActionClient.action(
  async ({ ctx: { sessionId } }) => {
    await lucia.invalidateSession(sessionId);

    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return response("success", "Logout successful");
  },
);

export const getAuthenticatedUser = authActionClient.action(
  async ({ ctx: { user } }) => {
    return response("success", "User authenticated", { user });
  },
);
