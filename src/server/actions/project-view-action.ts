"use server";

import { z } from "zod";
import { incrementProjectViews } from "../queries/project-views-queries";
import { publicActionClient } from "@/lib/public-safe-action";
import { revalidatePath } from "next/cache";

export const incrementProjectView = publicActionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput: { id } }) => {
    try {
      await incrementProjectViews(id);

      revalidatePath("/");
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  });
