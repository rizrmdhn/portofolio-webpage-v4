"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { type Projects } from "@/types/project";

type DashboardChartProps = {
  chartData: Projects[];
};

export default function DashboardChart({ chartData }: DashboardChartProps) {
  const chartConfig: ChartConfig = {};

  chartData.map((data) => {
    chartConfig[data.name] = {
      label: data.name,
      color: "hsl(var(--chart-1))",
    };
  });

  return (
    <Card className="xl:max-1/2 xl:mx-auto xl:w-2/3 xl:px-0">
      <CardHeader>
        <CardTitle>Total Project Views</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar
              dataKey="projectView.count"
              fill="hsl(var(--chart-1))"
              name={"Total Views"}
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
