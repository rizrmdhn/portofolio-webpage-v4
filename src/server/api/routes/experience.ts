import {
  addExperienceSchema,
  updateExperienceSchema,
} from "@/schema/experiences";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import {
  deleteExperience,
  getExperienceDetail,
  getNewestExperience,
  insertExperience,
  updateExperience,
} from "@/server/queries/experience-queries";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const experienceRouter = createTRPCRouter({
  list: publicProcedure.query(async () => {
    const experiences = await getNewestExperience();

    return experiences;
  }),

  create: protectedProcedure
    .input(addExperienceSchema)
    .mutation(async ({ input }) => {
      const newExperience = await insertExperience(input);

      return newExperience;
    }),

  update: protectedProcedure
    .input(updateExperienceSchema)
    .mutation(async ({ input }) => {
      const newExperience = await updateExperience(input);

      return newExperience;
    }),

  details: protectedProcedure
    .input(
      z.object({
        id: z.string({
          required_error: "ID is required",
        }),
      }),
    )
    .query(async ({ input: { id } }) => {
      const experience = await getExperienceDetail(id);

      if (!experience) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Experience not found",
        });
      }

      return experience;
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string({
          required_error: "ID is required",
        }),
      }),
    )
    .mutation(async ({ input: { id } }) => {
      const experience = await getExperienceDetail(id);
      if (!experience) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Experience not found",
        });
      }

      await deleteExperience(id);

      return experience;
    }),
});
