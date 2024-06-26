"use server";

import {
  generatePageViews,
  getViewsByTitle,
  incrementViews,
} from "../queries/page-views-queries";
import { unstable_noStore as noStore } from "next/cache";

export const genereatePageViewAction = async (title: string) => {
  const [prevPageView] = await getViewsByTitle(title);

  if (prevPageView) {
    return prevPageView;
  }

  const newPage = await generatePageViews(title);

  return newPage;
};

export const incrementPageViewAction = async (title: string) => {
  noStore();
  const page = await genereatePageViewAction(title);

  await incrementViews(page.id);
};
