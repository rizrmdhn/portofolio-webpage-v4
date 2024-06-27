import { getExperienceDetail } from "@/server/queries/experience-queries";
import EditExperienceForm from "./edit-experience-form";

export default async function EditProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const detailExperience = await getExperienceDetail(params.id);

  return (
    <div className="flex flex-col items-center justify-center gap-4 xl:p-4">
      <h1 className="self-start text-3xl font-bold">Edit Project</h1>
      <EditExperienceForm {...detailExperience} />
    </div>
  );
}
