import React, { Suspense } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getAllExperiences } from "@/server/queries/experience-queries";

export const metadata = {
  title: "Experiences | My Portfolio",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function ExperiencesPage() {
  const experiences = await getAllExperiences();

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Experiences</h1>
      </div>
      <div className="flex flex-col flex-wrap gap-4 p-4 lg:gap-6 lg:p-6">
        <Suspense fallback={<div>Loading...</div>}>
          <DataTable data={experiences} columns={columns} />
        </Suspense>
      </div>
    </>
  );
}
