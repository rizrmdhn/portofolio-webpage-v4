import EditExperienceForm from "./edit-experience-form";

export default function EditProjectPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 xl:p-4">
      <h1 className="self-start text-3xl font-bold">Edit Project</h1>
      <EditExperienceForm id={params.id} />
    </div>
  );
}
