"use client";

import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import { useSheetStore } from "@/provider/sheet-store-provider";
import { updateExperienceSchema } from "@/schema/experiences";
import { api } from "@/trpc/react";
import { type Experiences } from "@/types/expereince";
import { LoaderCircle } from "lucide-react";
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
  const [values] = useState<z.infer<typeof updateExperienceSchema>>({
    id: id,
    name: name,
    description: description ?? "",
    company: company,
    date: date,
    type: type,
  });

  const utils = api.useUtils();
  const router = useRouter();

  const setOpen = useSheetStore((state) => state.setOpen);

  const { mutate: execute, isPending } = api.experience.update.useMutation({
    onSuccess: async () => {
      await utils.experience.all.invalidate();

      toast({
        title: "Success",
        description: "Experience updated successfully",
      });

      setOpen(false);

      setTimeout(() => {
        router.back();
        setOpen(true);
      }, 300);
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
    <ScrollArea className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center p-4">
        <AutoForm
          values={values}
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
