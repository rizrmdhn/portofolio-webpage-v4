"use client";

import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import useGetDetailProject from "@/hooks/useGetDetailProject";
import { updateProjectSchema } from "@/schema/projects";
import { updateProjectAction } from "@/server/actions/project-action";
import { LoaderCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { type z } from "zod";

type EditProjectFormProps = {
  id: string;
};

export default function EditProjectForm({ id }: EditProjectFormProps) {
  const { data, status } = useGetDetailProject(id);

  const [values, setValues] = useState<z.infer<typeof updateProjectSchema>>({
    id: id,
    name: "",
    description: "",
    tech: "",
    github_url: "",
    url: "",
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

  useEffect(() => {
    if (status === "success") {
      setValues({
        id: id,
        name: data?.data?.data?.name,
        description: data?.data?.data?.description ?? "",
        tech: Array.isArray(data?.data?.data?.tech)
          ? data?.data?.data?.tech.toString()
          : data?.data?.data?.tech ?? "",
        github_url: data?.data?.data?.github_url ?? "",
        url: data?.data?.data?.url ?? "",
      });
    }
  }, [data, id, setValues, status]);

  return (
    <ScrollArea className="flex max-h-[650px] w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center p-4">
        <AutoForm
          values={values}
          onParsedValuesChange={(data) => {
            if (data.id !== id) {
              return toast({
                title: "Error",
                description: "Something went wrong",
                variant: "destructive",
              });
            }

            setValues({
              id: data.id,
              ...data,
            });
          }}
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
          <AutoFormSubmit
            disabled={isExecuting || status === "pending"}
            className="w-full"
          >
            {isExecuting || status === "pending" ? (
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
