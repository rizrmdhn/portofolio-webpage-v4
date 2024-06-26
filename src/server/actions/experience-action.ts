"use server";

import response from "@/lib/response";
import { authActionClient } from "@/lib/safe-action";
import {
  addExperienceSchema,
  updateExperienceSchema,
} from "@/schema/experiences";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  deleteExperience,
  getExperienceDetail,
  insertExperience,
  updateExperience,
} from "../queries/experience-queries";

export const createNewExperienceAction = authActionClient
  .schema(addExperienceSchema)
  .action(
    async ({ parsedInput: { name, description, type, company, date } }) => {
      try {
        const newExperience = await insertExperience({
          name,
          description,
          type,
          company,
          date,
        });

        revalidatePath("/dashboard/experience");
        revalidatePath("/dashboard/experience/new");
        return response(
          "success",
          "Experience created successfully",
          newExperience,
        );
      } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
      }
    },
  );

export const updateExperienceAction = authActionClient
  .schema(updateExperienceSchema)
  .action(
    async ({ parsedInput: { id, name, description, type, company, date } }) => {
      try {
        const newExperience = await updateExperience({
          id,
          name,
          description,
          type,
          company,
          date,
        });

        revalidatePath(`/dashboard/experience/${id}/edit`);
        revalidatePath(`/dashboard/experience`);

        return response(
          "success",
          "Experience updated successfully",
          newExperience,
        );
      } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
      }
    },
  );

export const getExperienceDetailAction = authActionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput: { id } }) => {
    try {
      const experience = await getExperienceDetail(id);

      if (!experience) {
        throw new Error("Experience not found");
      }

      return response("success", "Experience found successfully", experience);
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  });

export const deleteExperienceAction = authActionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput: { id } }) => {
    try {
      const experience = await getExperienceDetail(id);
      if (!experience) {
        throw new Error("Experience not found");
      }

      await deleteExperience(id);

      revalidatePath("/dashboard/experience");
      return response("success", "Experience deleted successfully");
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  });
