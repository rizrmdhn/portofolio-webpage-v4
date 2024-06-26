import React from "react";
import AddExperienceForm from "./add-experience-form";

export default function NewExperiencePage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 xl:p-4">
      <h1 className="self-start text-3xl font-bold">Add New Experience</h1>
      <AddExperienceForm />
    </div>
  );
}
