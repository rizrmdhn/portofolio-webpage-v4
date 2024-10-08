"use client";

import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import { useSheetStore } from "@/provider/sheet-store-provider";
import { addExperienceSchema } from "@/schema/experiences";
import { createNewExperienceAction } from "@/server/actions/experience-action";
import { LoaderCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import React from "react";

export default function AddExperienceForm() {
  const router = useRouter();

  const { setOpen } = useSheetStore((state) => state);

  const { execute, isExecuting } = useAction(createNewExperienceAction, {
    onSuccess(args) {
      if (args.data?.status === "success") {
        toast({
          description: args.data?.message,
          title: "Success",
        });
      }

      setOpen(false);

      setTimeout(() => {
        router.back();
        setOpen(true);
      }, 300);
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
          onSubmit={(data) => {
            execute(data);
          }}
          formSchema={addExperienceSchema}
          fieldConfig={{
            description: {
              fieldType: "textarea",
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
