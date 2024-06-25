import React from "react";
import AddProjectForm from "./add-project-form";

export default function page() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 xl:p-4">
      <h1 className="self-start text-3xl font-bold">Add New Project</h1>
      <AddProjectForm />
    </div>
  );
}
