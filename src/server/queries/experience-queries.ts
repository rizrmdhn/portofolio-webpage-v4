import "server-only";

import type { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { nanoid } from "nanoid";
import {
  addExperienceSchema,
  updateExperienceSchema,
} from "@/schema/experiences";
import { experiences } from "../db/schema";

export const getNewestExperience = async () => {
  const experience = await db.query.experiences.findMany({
    orderBy: (experiences, { desc }) => [desc(experiences.created_at)],
  });

  return experience;
};

export const getAllExperiences = async () => {
  const experiences = await db.query.experiences.findMany();

  return experiences;
};

export const getExperienceDetail = async (experienceId: string) => {
  const experience = await db.query.experiences.findFirst({
    where: eq(experiences.id, experienceId),
  });

  if (!experience) {
    throw new Error("Experience not found");
  }

  return experience;
};

export const insertExperience = async (
  data: z.infer<typeof addExperienceSchema>,
) => {
  const [experience] = await db
    .insert(experiences)
    .values({
      id: `experience_${nanoid(16)}`,
      name: data.name,
      description: data.description,
      type: data.type,
      company: data.company,
      date: data.date,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .returning()
    .execute();

  if (!experience) {
    throw new Error("Failed to create experience");
  }

  return experience;
};

export const updateExperience = async (
  data: z.infer<typeof updateExperienceSchema>,
) => {
  const [experience] = await db
    .update(experiences)
    .set({
      name: data.name,
      description: data.description,
      type: data.type,
      company: data.company,
      date: data.date,
      updated_at: new Date().toISOString(),
    })
    .where(eq(experiences.id, data.id))
    .returning()
    .execute();

  if (!experience) {
    throw new Error("Failed to update experience");
  }

  return experience;
};

export const deleteExperience = async (experienceId: string) => {
  const experience = await db.query.experiences.findFirst({
    where: eq(experiences.id, experienceId),
  });

  if (!experience) {
    throw new Error("Experience not found");
  }

  await db
    .delete(experiences)
    .where(eq(experiences.id, experienceId))
    .execute();

  return experience;
};
