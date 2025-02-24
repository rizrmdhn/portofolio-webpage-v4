import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { authRouter } from "./routes/auth";
import { experienceRouter } from "./routes/experience";
import { projectRouter } from "./routes/project";
import { pageViewRouter } from "./routes/page-view";
import { messageRouter } from "./routes/message";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  experience: experienceRouter,
  project: projectRouter,
  pageView: pageViewRouter,
  message: messageRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
