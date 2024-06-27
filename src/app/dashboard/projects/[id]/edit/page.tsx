import EditProjectForm from "./edit-project-form";
import { getProjectDetail } from "@/server/queries/project-queries";

export default async function EditProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const detailProject = await getProjectDetail(params.id);

  return (
    <div className="flex flex-col items-center justify-center gap-4 xl:p-4">
      <h1 className="self-start text-3xl font-bold">Edit Project</h1>
      <EditProjectForm {...detailProject} />
    </div>
  );
}
