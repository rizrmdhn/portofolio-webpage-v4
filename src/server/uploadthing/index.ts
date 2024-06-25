import { lucia } from "@/lib/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { z } from "zod";
import { insertImageToProject } from "../queries/project-queries";
import { UTApi } from "uploadthing/server";

export const utapi = new UTApi();

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .input(
      z.object({
        projectId: z.string({
          required_error: "projectId is required",
        }),
      }),
    )
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req, input }) => {
      const sessionId = req.cookies.get(lucia.sessionCookieName)?.value ?? null;

      if (!sessionId) throw new UploadThingError("Unauthorized not logged in");

      const { user } = await lucia.validateSession(sessionId);

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized not logged in");

      if (user.email !== "rizrmdhn@admin.com")
        throw new UploadThingError("Unauthorized not admin");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id, projectId: input.projectId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload

      await insertImageToProject(metadata.projectId, file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
