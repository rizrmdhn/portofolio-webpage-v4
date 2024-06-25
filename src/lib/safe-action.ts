import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  createSafeActionClient,
} from "next-safe-action";
import { lucia } from "./auth";
import { cookies } from "next/headers";
import { getUser } from "./session";

export const actionClient = createSafeActionClient({
  // Can also be an async function.
  handleReturnedServerError(e) {
    // In this case, we can use the 'MyCustomError` class to unmask errors
    // and return them with their actual messages to the client.
    if (e instanceof Error) {
      return e.message;
    }

    // Every other error that occurs will be masked with the default message.
    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
});

export const authActionClient = actionClient.use(async ({ next }) => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId) throw new Error("Session does not exist");

  const userCookie = await getUser();

  if (!userCookie) {
    throw new Error("Unauthorized user does not exist");
  }

  if (userCookie.email !== "rizrmdhn@admin.com") {
    throw new Error("Unauthorized only admin can access");
  }

  // Return the next middleware with `userId` value in the context
  return next({ ctx: { user: userCookie, sessionId } });
});
