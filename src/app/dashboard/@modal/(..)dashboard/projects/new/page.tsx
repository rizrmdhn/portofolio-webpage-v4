import Modal from "@/components/Modal";
import { DialogTitle } from "@/components/ui/dialog";
import React from "react";
import AddProjectForm from "./add-project-form";

export default function AddProjectModal() {
  return (
    <Modal className="w-dvw xl:w-full">
      <div className="flex flex-col gap-4">
        <DialogTitle className="text-3xl font-bold">
          Add New Article
        </DialogTitle>
        <AddProjectForm />
      </div>
    </Modal>
  );
}
