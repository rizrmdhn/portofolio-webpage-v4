"use server";

import { authActionClient } from "@/lib/safe-action";
import { addProjectSchema } from "@/schema/projects";
import {
  getProjectDetail,
  insertImageToProject,
  insertProject,
} from "../queries/project-queries";
import response from "@/lib/response";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { utapi } from "../uploadthing";

export const createNewProject = authActionClient
  .schema(addProjectSchema)
  .action(
    async ({
      parsedInput: { name, description, tech, image_url, github_url, url },
    }) => {
      try {
        const newProject = await insertProject({
          name,
          description,
          tech,
          image_url,
          github_url,
          url,
        });

        revalidatePath("/dashboard/projects");
        revalidatePath("/dashboard/projects/new");
        return response("success", "Project created successfully", newProject);
      } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
      }
    },
  );

export const deleteProjectImage = authActionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput: { id } }) => {
    try {
      const project = await getProjectDetail(id);

      if (!project) {
        throw new Error("Project not found");
      }

      const imageFiles = project.image_url?.split("/").pop();

      if (!imageFiles) {
        throw new Error("Project image not found");
      }

      await utapi.deleteFiles(imageFiles);

      await insertImageToProject(id, null);

      revalidatePath("/dashboard/projects");
      return response("success", "Project image deleted successfully");
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  });
