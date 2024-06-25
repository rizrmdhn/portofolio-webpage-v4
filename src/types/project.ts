import { projectViews, projects } from "@/server/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type Projects = InferSelectModel<typeof projects> & {
  projectView: InferSelectModel<typeof projectViews>;
};
