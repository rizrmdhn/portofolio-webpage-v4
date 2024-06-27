"use client";

import { AlertConfirmation } from "@/components/AlertConfirmation";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { deleteSessionAction } from "@/server/actions/sessions-action";
import { LoaderCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type DeleteSessionFormProps = {
  sessionId: string;
};

export default function DeleteSessionForm({
  sessionId,
}: DeleteSessionFormProps) {
  const [confirmation, setShowConfirmation] = useState(false);

  const router = useRouter();

  const { execute, isExecuting } = useAction(deleteSessionAction, {
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

  const handleDelete = () => {
    setShowConfirmation(true);
  };

  return (
    <div className="flex flex-row items-center gap-2">
      <AlertConfirmation
        open={confirmation}
        setOpen={setShowConfirmation}
        confirmationAction={() => {
          execute({ sessionId });
        }}
        message="Are you sure you want to delete this session?"
      />
      <Button
        disabled={isExecuting}
        variant="destructive"
        className="ml-auto"
        type="submit"
        onClick={handleDelete}
      >
        {isExecuting ? (
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
        ) : null}
        Delete
      </Button>
    </div>
  );
}
