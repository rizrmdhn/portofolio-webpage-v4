"use client";

import { api } from "@/trpc/react";
import DashboardCard from "./dashboard-card";

export default function DashboardContent() {
  const [pageViews] = api.pageView.view.useSuspenseQuery();

  return (
    <>
      <DashboardCard
        title="Total Views"
        count={pageViews.totalCount}
        textLocation="right"
      />
      {pageViews.views.map((pageView) => (
        <DashboardCard key={pageView.id} {...pageView} textLocation="right" />
      ))}
    </>
  );
}
