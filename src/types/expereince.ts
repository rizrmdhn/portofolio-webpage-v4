import { experiences } from "@/server/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type Experiences = InferSelectModel<typeof experiences>;
