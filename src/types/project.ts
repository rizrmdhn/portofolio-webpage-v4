import { type projectViews, type projects } from "@/server/db/schema";
import { type InferSelectModel } from "drizzle-orm";

export type Projects = InferSelectModel<typeof projects> & {
  projectView: InferSelectModel<typeof projectViews>;
};
