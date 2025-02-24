import { loginSchema } from "@/schema/auth";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { fetchUserByEmail } from "@/server/queries/users-queries";
import { verify } from "@node-rs/argon2";
import { encrypt } from "@/server/auth";
import { createTokenCookie, deleteTokenCookie } from "@/server/auth/utils";

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(loginSchema)
    .mutation(async ({ input: { email, password } }) => {
      const user = await fetchUserByEmail(email);

      if (!user) {
        throw new Error("Invalid user credentials");
      }

      if (user.email !== "rizrmdhn@admin.com") {
        throw new Error("Invalid user credentials");
      }

      const verifyPasswordResult = await verify(user.password!, password);

      if (!verifyPasswordResult) {
        throw new Error("Invalid user credentials");
      }

      const token = await encrypt({
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        jti: user.id,
        exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
      });

      createTokenCookie(token, new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));

      return true;
    }),

  logout: protectedProcedure.mutation(async () => {
    deleteTokenCookie();

    return true;
  }),

  me: protectedProcedure.query(async ({ ctx }) => {
    return ctx.user;
  }),
});
