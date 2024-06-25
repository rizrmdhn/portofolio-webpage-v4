import { getAllProjects } from "@/server/queries/project-queries";
import React, { Suspense } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export const metadata = {
  title: "Projects | My Portfolio",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Projects</h1>
      </div>
      <div className="flex flex-col flex-wrap gap-4 p-4 lg:gap-6 lg:p-6">
        <Suspense fallback={<div>Loading...</div>}>
          <DataTable data={projects} columns={columns} />
        </Suspense>
      </div>
    </>
  );
}
