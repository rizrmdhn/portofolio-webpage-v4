import "server-only";

import { eq, sql } from "drizzle-orm";
import { db } from "@/server/db";
import { pageViews } from "@/server/db/schema";
import { nanoid } from "nanoid";

export const incrementViews = async (pageId: string) => {
  await db
    .update(pageViews)
    .set({
      count: sql`${pageViews.count} + 1`,
    })
    .where(eq(pageViews.id, pageId));
};

export const getViews = async (pageId: string) => {
  const views = await db.query.pageViews.findFirst({
    where: eq(pageViews.id, pageId),
  });

  return views;
};

export const getAllViews = async () => {
  const views = await db.query.pageViews.findMany();

  let totalCount = 0;

  views.forEach((view) => {
    totalCount += view.count;
  });

  return { views, totalCount: totalCount };
};

export const generatePageViews = async (title: string) => {
  const [pageView] = await db
    .insert(pageViews)
    .values({
      id: `page_view_${nanoid(16)}`,
      count: 0,
      title: title,
    })
    .returning()
    .execute();

  if (!pageView) {
    throw new Error("Failed to generate page view");
  }

  return pageView;
};

export const getViewsByTitle = async (title: string) => {
  const views = await db.query.pageViews.findMany({
    where: eq(pageViews.title, title),
  });

  if (!views) {
    throw new Error("Failed to get views by title");
  }

  return views;
};

export const incrementPageViewByTitle = async (title: string) => {
  const [views] = await getViewsByTitle(title);

  if (!views) {
    throw new Error("Failed to get views by title");
  }

  await incrementViews(views.id);
};
