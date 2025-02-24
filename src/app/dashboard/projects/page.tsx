"use client";

import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { api } from "@/trpc/react";

export default function ProjectsPage() {
  const [projects] = api.project.all.useSuspenseQuery();

  return <DataTable data={projects} columns={columns} />;
}
