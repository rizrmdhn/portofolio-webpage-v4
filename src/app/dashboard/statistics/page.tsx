import React, { Suspense } from "react";
import DashboardChart from "./chart";
import { getAllProjects } from "@/server/queries/project-queries";

export const metadata = {
  title: "Settings | My Portfolio",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function SettingsPage() {
  const projects = await getAllProjects();

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Statistics</h1>
      </div>
      <div className="flex items-center justify-center">
        <Suspense fallback={<div>Loading...</div>}>
          <DashboardChart chartData={projects} />
        </Suspense>
      </div>
    </>
  );
}
