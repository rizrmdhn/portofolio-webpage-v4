import { projectViews, projects } from "@/server/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type Project = {
  project: ProjectElement[];
};

export type ProjectElement = InferSelectModel<typeof projects> & {
  projectView: InferSelectModel<typeof projectViews>;
};
