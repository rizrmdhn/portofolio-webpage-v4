"use client";

import React, { Suspense } from "react";
import DashboardChart from "./chart";
import { api } from "@/trpc/react";

export default function SettingsPage() {
  const [projects] = api.project.all.useSuspenseQuery();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardChart chartData={projects} />
    </Suspense>
  );
}
