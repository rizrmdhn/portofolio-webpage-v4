"use client";

import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { api } from "@/trpc/react";

export default function ExperiencesPage() {
  const [experiences] = api.experience.all.useSuspenseQuery();

  return <DataTable data={experiences} columns={columns} />;
}
