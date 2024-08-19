import EditProjectForm from "./edit-project-form";
import { getProjectDetail } from "@/server/queries/project-queries";
import Sheets from "@/components/Sheets";
import { SheetTitle } from "@/components/ui/sheet";

export default async function EditProjectModal({
  params,
}: {
  params: { id: string };
}) {
  const detailProject = await getProjectDetail(params.id);

  return (
    <Sheets className="max-w-lg xl:w-full">
      <div className="flex flex-col gap-4">
        <SheetTitle className="text-3xl font-bold">Edit Project</SheetTitle>
        <EditProjectForm {...detailProject} />
      </div>
    </Sheets>
  );
}
