import React from "react";
import EditExperienceForm from "./edit-experience-form";
import { getExperienceDetail } from "@/server/queries/experience-queries";
import Sheets from "@/components/Sheets";
import { SheetTitle } from "@/components/ui/sheet";

export default async function EditExperienceModal({
  params,
}: {
  params: { id: string };
}) {
  const detailExperience = await getExperienceDetail(params.id);
  return (
    <Sheets className="max-w-lg xl:w-full">
      <div className="flex flex-col gap-4">
        <SheetTitle className="text-3xl font-bold">Edit Experience</SheetTitle>
        <EditExperienceForm {...detailExperience} />
      </div>
    </Sheets>
  );
}
