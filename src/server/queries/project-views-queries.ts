import "server-only";

import { eq, sql } from "drizzle-orm";
import { db } from "@/server/db";
import { projectViews } from "@/server/db/schema";
import { nanoid } from "nanoid";

export const incrementProjectViews = async (projectId: string) => {
  await db
    .update(projectViews)
    .set({
      count: sql`${projectViews.count} + 1`,
    })
    .where(eq(projectViews.id, projectId));
};

export const getProjectViews = async (projectId: string) => {
  const views = await db.query.projectViews.findFirst({
    where: eq(projectViews.id, projectId),
  });

  return views;
};

export const getAllProjectViews = async () => {
  const views = await db.query.projectViews.findMany();

  let totalCount = 0;

  views.forEach((view) => {
    totalCount += view.count;
  });

  return { views, totalCount: totalCount };
};

export const insertProjectView = async (projectId: string) => {
  const [projectView] = await db
    .insert(projectViews)
    .values({
      id: `project_view_${nanoid(16)}`,
      project_id: projectId,
      count: 0,
    })
    .returning()
    .execute();

  return projectView;
};
