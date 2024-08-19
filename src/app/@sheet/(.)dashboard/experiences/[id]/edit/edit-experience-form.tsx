"use client";

import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import { updateExperienceSchema } from "@/schema/experiences";
import { updateProjectAction } from "@/server/actions/project-action";
import { type Experiences } from "@/types/expereince";
import { LoaderCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { type z } from "zod";

export default function EditExperienceForm({
  id,
  name,
  description,
  company,
  date,
  type,
}: Experiences) {
  const [values, setValues] = useState<z.infer<typeof updateExperienceSchema>>({
    id: id,
    name: name,
    description: description ?? "",
    company: company,
    date: date,
    type: type,
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
    <ScrollArea className="flex h-full w-full flex-col items-center justify-center">
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
          formSchema={updateExperienceSchema}
          fieldConfig={{
            id: {
              label: "Experience ID",
              inputProps: {
                readOnly: true,
                disabled: true,
              },
            },
            description: {
              fieldType: "textarea",
            },
            type: {
              fieldType: "select",
              inputProps: {
                defaultValue: type,
              },
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
