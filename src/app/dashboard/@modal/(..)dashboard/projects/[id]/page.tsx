import Modal from "@/components/Modal";
import EditProjectForm from "./edit-project-form";
import { DialogTitle } from "@/components/ui/dialog";

export default function EditProjectModal({
  params,
}: {
  params: { id: string };
}) {
  return (
    <Modal className="w-dvw xl:w-full">
      <div className="flex flex-col gap-4">
        <DialogTitle className="text-3xl font-bold">Edit Article</DialogTitle>
        <EditProjectForm id={params.id} />
      </div>
    </Modal>
  );
}
