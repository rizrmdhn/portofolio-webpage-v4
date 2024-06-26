import Modal from "@/components/Modal";
import { DialogTitle } from "@/components/ui/dialog";
import React from "react";
import EditExperienceForm from "./edit-experience-form";

export default function EditExperienceModal({
  params,
}: {
  params: { id: string };
}) {
  return (
    <Modal className="w-dvw xl:w-full">
      <div className="flex flex-col gap-4">
        <DialogTitle className="text-3xl font-bold">
          Edit Experience
        </DialogTitle>
        <EditExperienceForm id={params.id} />
      </div>
    </Modal>
  );
}
