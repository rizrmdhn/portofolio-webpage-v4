"use client";

import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import { updateProjectSchema } from "@/schema/projects";
import { updateProjectAction } from "@/server/actions/project-action";
import { type Projects } from "@/types/project";
import { LoaderCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { type z } from "zod";

export default function EditProjectForm({
  id,
  description,
  github_url,
  name,
  tech,
  url,
}: Projects) {
  const [values] = useState<z.infer<typeof updateProjectSchema>>({
    id: id,
    name: name,
    description: description ?? "",
    tech: tech.toString(),
    github_url: github_url ?? "",
    url: url ?? "",
  });

  const router = useRouter();

  const { execute, isExecuting } = useAction(updateProjectAction, {
    onSuccess(args) {
      if (args.data?.status === "success") {
        toast({
          description: args.data?.message,
          title: "Success",
        });
      }

      router.refresh();
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
    <ScrollArea className="flex max-h-[650px] w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center p-4">
        <AutoForm
          values={values}
          onSubmit={(data) => {
            execute({ ...data, id: id });
          }}
          formSchema={updateProjectSchema}
          fieldConfig={{
            id: {
              label: "Project ID",
              inputProps: {
                readOnly: true,
                disabled: true,
              },
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
