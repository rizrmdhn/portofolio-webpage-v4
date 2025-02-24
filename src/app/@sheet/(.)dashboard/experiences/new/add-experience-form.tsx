"use client";

import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import { useSheetStore } from "@/provider/sheet-store-provider";
import { addExperienceSchema } from "@/schema/experiences";
import { api } from "@/trpc/react";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function AddExperienceForm() {
  const utils = api.useUtils();
  const router = useRouter();

  const setOpen = useSheetStore((state) => state.setOpen);

  const { mutate: execute, isPending } = api.experience.create.useMutation({
    onSuccess: async () => {
      await utils.experience.all.invalidate();

      toast({
        title: "Success",
        description: "Experience created successfully",
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
