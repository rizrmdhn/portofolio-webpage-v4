import React from "react";
import AddProjectForm from "./add-project-form";
import Sheets from "@/components/Sheets";
import { SheetTitle } from "@/components/ui/sheet";

export default function AddProjectModal() {
  return (
    <Sheets className="max-w-lg xl:w-full">
      <div className="flex flex-col gap-4">
        <SheetTitle className="text-3xl font-bold">Add New Project</SheetTitle>
        <AddProjectForm />
      </div>
    </Sheets>
  );
}
