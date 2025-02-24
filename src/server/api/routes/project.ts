import { addProjectSchema, updateProjectSchema } from "@/schema/projects";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import {
  getNewestProject,
  getProjectDetail,
  insertImageToProject,
  insertProject,
  updateProject,
} from "@/server/queries/project-queries";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { utapi } from "@/server/uploadthing";
import { incrementProjectViews } from "@/server/queries/project-views-queries";

export const projectRouter = createTRPCRouter({
  list: publicProcedure.query(async () => {
    const projects = await getNewestProject();

    return projects;
  }),

  create: protectedProcedure
    .input(addProjectSchema)
    .mutation(async ({ input }) => {
      const newProject = await insertProject(input);

      return newProject;
    }),

  incrementView: publicProcedure
    .input(
      z.object({
        id: z.string({
          required_error: "ID is required",
        }),
      }),
    )
    .mutation(async ({ input: { id } }) => {
      await incrementProjectViews(id);

      return true;
    }),

  update: protectedProcedure
    .input(updateProjectSchema)
    .mutation(async ({ input }) => {
      const newProject = await updateProject(input);

      return newProject;
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
      const project = await getProjectDetail(id);

      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not found",
        });
      }

      return project;
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
      const project = await getProjectDetail(id);
      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not found",
        });
      }
    }),

  deleteImage: protectedProcedure
    .input(
      z.object({
        id: z.string({
          required_error: "ID is required",
        }),
      }),
    )
    .mutation(async ({ input: { id } }) => {
      const project = await getProjectDetail(id);

      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not found",
        });
      }

      const imageFiles = project.image_url?.split("/").pop();

      if (!imageFiles) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project image not found",
        });
      }

      await utapi.deleteFiles(imageFiles);

      await insertImageToProject(id, null);

      return true;
    }),
});
