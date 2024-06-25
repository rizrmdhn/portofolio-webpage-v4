"use client";

import React from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  PieLabelRenderProps,
} from "recharts";
import { CHART_COLORS, RADIAN } from "@/lib/constant";
import { InferSelectModel } from "drizzle-orm";
import { pageViews } from "@/server/db/schema";

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius = 0,
  outerRadius = 0,
  percent,
  index,
}: PieLabelRenderProps) => {
  const radius =
    Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) * 0.5;
  const x =
    (Number(cx) || 0) + ((radius * Math.cos(-midAngle * RADIAN)) as number);
  const y =
    (Number(cy) || 0) + ((radius * Math.sin(-midAngle * RADIAN)) as number);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={Number(x) > Number(cx) ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(Number(percent) * 100).toFixed(0)}%`}
    </text>
  );
};

type PageView = InferSelectModel<typeof pageViews>;

type DashboardChartProps = {
  pageViews: PageView[];
  totalCount: number;
};

export default function DashboardChart({
  pageViews,
  totalCount,
}: DashboardChartProps) {
  const mappedPageViews = pageViews.map((pageView) => ({
    name: pageView.title,
    value: pageView.count,
  }));

  return (
    <div className="flex flex-row flex-wrap gap-4 p-4 lg:gap-6 lg:p-6">
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={mappedPageViews}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {mappedPageViews.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={CHART_COLORS[index % CHART_COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <p className="w-full text-center text-sm text-gray-500 dark:text-gray-400">
        Total Views: {totalCount}
      </p>
    </div>
  );
}
