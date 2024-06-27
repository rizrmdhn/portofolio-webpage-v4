import { type experiences } from "@/server/db/schema";
import { type InferSelectModel } from "drizzle-orm";

export type Experiences = InferSelectModel<typeof experiences>;
