import Modal from "@/components/Modal";
import { DialogTitle } from "@/components/ui/dialog";
import React from "react";
import EditExperienceForm from "./edit-experience-form";
import { getExperienceDetail } from "@/server/queries/experience-queries";

export default async function EditExperienceModal({
  params,
}: {
  params: { id: string };
}) {
  const detailExperience = await getExperienceDetail(params.id);
  return (
    <Modal className="max-w-lg xl:w-full">
      <div className="flex flex-col gap-4">
        <DialogTitle className="text-3xl font-bold">
          Edit Experience
        </DialogTitle>
        <EditExperienceForm {...detailExperience} />
      </div>
    </Modal>
  );
}
