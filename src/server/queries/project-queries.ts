import "server-only";

import type { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { nanoid } from "nanoid";
import { projects } from "@/server/db/schema";
import { addProjectSchema } from "@/schema/projects";
import { insertProjectView } from "./project-views-queries";
import { utapi } from "../uploadthing";

export const getAllProjects = async () => {
  const projects = await db.query.projects.findMany({
    with: {
      projectView: true,
    },
  });

  return projects;
};

export const getProjectDetail = async (projectId: string) => {
  const project = await db.query.projects.findFirst({
    where: eq(projects.id, projectId),
    with: {
      projectView: true,
    },
  });

  return project;
};

export const insertProject = async (data: z.infer<typeof addProjectSchema>) => {
  const tech: string[] = [];
  data.tech.split(",").forEach((t) => {
    tech.push(t.trim());
  });

  const [project] = await db
    .insert(projects)
    .values({
      id: `project_${nanoid(16)}`,
      name: data.name,
      description: data.description,
      tech: tech,
      github_url: data.github_url,
      url: data.url,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .returning({
      id: projects.id,
      name: projects.name,
      description: projects.description,
      tech: projects.tech,
      image_url: projects.image_url,
      github_url: projects.github_url,
      url: projects.url,
      created_at: projects.created_at,
      updated_at: projects.updated_at,
    })
    .execute();

  if (!project) {
    throw new Error("Failed to create project");
  }

  await insertProjectView(project.id);

  return project;
};

export const insertImageToProject = async (
  projectId: string,
  imageUrl: string | null,
) => {
  const [project] = await db
    .update(projects)
    .set({
      image_url: imageUrl,
    })
    .where(eq(projects.id, projectId))
    .returning({
      id: projects.id,
      name: projects.name,
      description: projects.description,
      tech: projects.tech,
      image_url: projects.image_url,
      github_url: projects.github_url,
      url: projects.url,
      created_at: projects.created_at,
      updated_at: projects.updated_at,
    })
    .execute();

  if (!project) {
    throw new Error("Failed to update project");
  }

  return project;
};

export const deleteProject = async (projectId: string) => {
  const [project] = await db
    .delete(projects)
    .where(eq(projects.id, projectId))
    .returning()
    .execute();

  if (!project) {
    throw new Error("Failed to delete project");
  }

  if (project.image_url) {
    const imageFiles = project.image_url.split("/").pop();

    if (!imageFiles) {
      throw new Error("Project image not found");
    }

    await utapi.deleteFiles(imageFiles);
  }

  return project;
};
