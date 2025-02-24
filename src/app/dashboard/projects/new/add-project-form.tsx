"use client";

import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import { addProjectSchema } from "@/schema/projects";
import { api } from "@/trpc/react";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function AddProjectForm() {
  const utils = api.useUtils();
  const router = useRouter();

  const { mutate: execute, isPending } = api.project.create.useMutation({
    onSuccess: async () => {
      await utils.project.all.invalidate();

      toast({
        title: "Success",
        description: "Project created successfully",
      });

      router.back();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <ScrollArea className="flex max-h-[650px] w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center p-4">
        <AutoForm
          onSubmit={(data) => {
            execute(data);
          }}
          formSchema={addProjectSchema}
          fieldConfig={{
            description: {
              fieldType: "textarea",
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
          <AutoFormSubmit disabled={isPending} className="w-full">
            {isPending ? (
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
