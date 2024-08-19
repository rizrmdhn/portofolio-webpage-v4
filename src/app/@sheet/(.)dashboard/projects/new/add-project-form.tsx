"use client";

import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import { addProjectSchema } from "@/schema/projects";
import { createNewProject } from "@/server/actions/project-action";
import { LoaderCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import React from "react";

export default function AddProjectForm() {
  const router = useRouter();

  const { execute, isExecuting } = useAction(createNewProject, {
    onSuccess(args) {
      if (args.data?.status === "success") {
        toast({
          description: args.data?.message,
          title: "Success",
        });
      }

      router.back();
    },
    onError(args) {
      if (args.error.validationErrors) {
        args.error.validationErrors._errors?.forEach((error: string) => {
          toast({
            description: error,
            title: "Error",
            variant: "destructive",
          });
        });
      }

      toast({
        description: args.error.serverError,
        title: "Error",
        variant: "destructive",
      });
    },
  });

  return (
    <ScrollArea className="h-full xl:flex xl:flex-col xl:items-center xl:justify-center">
      <div className="flex flex-col items-center justify-center p-4">
        <AutoForm
          onSubmit={(data) => {
            execute(data);
          }}
          formSchema={addProjectSchema}
          fieldConfig={{
            description: {
              fieldType: "textarea",
              description: "Description of the project",
            },
            github_url: {
              label: "Github",
            },
            url: {
              label: "Website",
            },
            tech: {
              label: "Tech",
              description: "use comma to separate",
            },
          }}
        >
          <AutoFormSubmit disabled={isExecuting} className="w-full">
            {isExecuting ? (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Submit
          </AutoFormSubmit>
        </AutoForm>
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
}
