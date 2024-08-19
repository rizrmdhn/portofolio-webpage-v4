import Modal from "@/components/Modal";
import SourceCodeButton from "@/components/SourceCodeButton";
import { DialogTitle } from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getProjectDetail } from "@/server/queries/project-queries";
import { FolderGit } from "lucide-react";
import Image from "next/image";
import React from "react";

export default async function ModalDetailProject({
  params,
}: {
  params: { id: string };
}) {
  const detailProject = await getProjectDetail(params.id);

  return (
    <Modal className="max-w-md xl:w-full">
      <DialogTitle className="text-3xl font-bold">Detail Project</DialogTitle>
      <div className="flex w-full flex-col items-center justify-center gap-5">
        <h1 className="self-start text-3xl font-bold">{detailProject.name}</h1>
        {detailProject.image_url ? (
          <Image
            alt={"Project Image"}
            className="w-full max-w-[60%] overflow-hidden rounded-xl object-cover"
            height="1080"
            src={
              detailProject.image_url
                ? detailProject.image_url
                : "/images/loader.png"
            }
            width="1920"
          />
        ) : (
          <div className="flex aspect-[3/2] w-full max-w-[60%] flex-col items-center justify-center overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
            <FolderGit className="m-auto h-20 w-20" />
          </div>
        )}
        <ScrollArea className="flex h-[200px] w-full flex-col items-center justify-center">
          <p className="text-lg font-medium">{detailProject.description}</p>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
        <div className="flex w-full flex-col items-center justify-center gap-5">
          <p className="text-lg font-medium">Tech Stack</p>
          <ul className="flex flex-wrap gap-1">
            {detailProject.tech.map((tech, idx) => (
              <li
                key={idx}
                className="rounded-md border px-2 py-1 dark:border-white"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex w-full flex-row items-center justify-start gap-5">
          {detailProject.url && (
            <a
              href={detailProject.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:cursor-pointer hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            >
              Live Demo
            </a>
          )}
          <SourceCodeButton
            id={detailProject.id}
            github_url={detailProject.github_url ?? ""}
          />
        </div>
      </div>
    </Modal>
  );
}
