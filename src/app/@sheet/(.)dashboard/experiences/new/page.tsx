import React from "react";
import AddExperienceForm from "./add-experience-form";
import Sheets from "@/components/Sheets";
import { SheetTitle } from "@/components/ui/sheet";

export default function AddExperienceModal() {
  return (
    <Sheets className="max-w-lg xl:w-full">
      <div className="flex flex-col gap-4">
        <SheetTitle className="text-3xl font-bold">
          Add New Experience
        </SheetTitle>
        <AddExperienceForm />
      </div>
    </Sheets>
  );
}
