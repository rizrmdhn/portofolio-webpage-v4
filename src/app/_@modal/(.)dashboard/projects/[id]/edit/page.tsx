import Modal from "@/components/Modal";
import EditProjectForm from "./edit-project-form";
import { DialogTitle } from "@/components/ui/dialog";
import { getProjectDetail } from "@/server/queries/project-queries";

export default async function EditProjectModal({
  params,
}: {
  params: { id: string };
}) {
  const detailProject = await getProjectDetail(params.id);

  return (
    <Modal className="max-w-lg xl:w-full">
      <div className="flex flex-col gap-4">
        <DialogTitle className="text-3xl font-bold">Edit Project</DialogTitle>
        <EditProjectForm {...detailProject} />
      </div>
    </Modal>
  );
}
