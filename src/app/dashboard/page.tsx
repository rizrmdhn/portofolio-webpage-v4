import React from "react";
import DashboardContent from "./dashboard-content";

export const metadata = {
  title: "Dashboard | My Portfolio",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function DashboardPage() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      <div className="flex flex-row flex-wrap gap-4 p-4 lg:gap-6 lg:p-6">
        <DashboardContent />
      </div>
    </>
  );
}
