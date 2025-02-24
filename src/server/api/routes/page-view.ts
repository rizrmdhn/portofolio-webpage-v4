import { getAllViews } from "@/server/queries/page-views-queries";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const pageViewRouter = createTRPCRouter({
  view: protectedProcedure.query(async () => {
    return await getAllViews();
  }),
});
