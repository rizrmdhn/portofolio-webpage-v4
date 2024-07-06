import Modal from "@/components/Modal";
import { DialogTitle } from "@/components/ui/dialog";
import React from "react";
import AddExperienceForm from "./add-experience-form";

export default function AddExperienceModal() {
  return (
    <Modal className="max-w-lg xl:w-full">
      <div className="flex flex-col gap-4">
        <DialogTitle className="text-3xl font-bold">
          Add New Experience
        </DialogTitle>
        <AddExperienceForm />
      </div>
    </Modal>
  );
}
