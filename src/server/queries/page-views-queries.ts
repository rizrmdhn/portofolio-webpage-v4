import { eq, sql } from "drizzle-orm";
import { db } from "@/server/db";
import { pageViews } from "@/server/db/schema";

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
  return views;
};
