import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type DashboardCardProps = {
  title: string;
  count: number;
};

export default function DashboardCard({ title, count }: DashboardCardProps) {
  return (
    <Card className="max-w-xs sm:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle>
          {title.slice(0, 1).toUpperCase() + title.slice(1)}
        </CardTitle>
        <CardDescription className="max-w-lg text-balance text-xl leading-relaxed text-black dark:text-white">
          {count} views
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
