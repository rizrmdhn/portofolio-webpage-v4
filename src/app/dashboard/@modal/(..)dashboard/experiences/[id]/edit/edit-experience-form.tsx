"use client";

import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import useGetDetailExperience from "@/hooks/useGetDetailExperience";
import { updateExperienceSchema } from "@/schema/experiences";
import { updateExperienceAction } from "@/server/actions/experience-action";
import { LoaderCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { z } from "zod";

type EditProjectFormProps = {
  id: string;
};

export default function EditExperienceForm({ id }: EditProjectFormProps) {
  const { data, status } = useGetDetailExperience(id);

  const [values, setValues] = useState<z.infer<typeof updateExperienceSchema>>({
    id: id,
    name: "",
    description: "",
    company: "",
    date: "",
    type: undefined,
  });

  const router = useRouter();

  const { execute, isExecuting } = useAction(updateExperienceAction, {
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
        company: data?.data?.data?.company ?? "",
        date: data?.data?.data?.date ?? "",
        type: data?.data?.data?.type ?? undefined,
      });
    }
  }, [data, setValues]);

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
