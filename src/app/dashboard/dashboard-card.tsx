import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type DashboardCardProps = {
  title: string;
  count: number;
  textLocation?: "left" | "right";
};

export default function DashboardCard({
  title,
  count,
  textLocation = "left",
}: DashboardCardProps) {
  return (
    <Card className="max-w-xs sm:col-span-2">
      <CardHeader>
        <CardTitle>
          {title.slice(0, 1).toUpperCase() + title.slice(1)}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription
          className={
            textLocation === "left"
              ? "max-w-lg text-balance text-left text-xl leading-relaxed text-black dark:text-white"
              : "max-w-lg text-balance text-right text-xl leading-relaxed text-black dark:text-white"
          }
        >
          {count} views
        </CardDescription>
      </CardContent>
    </Card>
  );
}
