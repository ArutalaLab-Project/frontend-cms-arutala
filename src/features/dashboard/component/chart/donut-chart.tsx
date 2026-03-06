"use client";

import * as React from "react";
import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts";

import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const chartConfig = {
  number: {
    label: "number",
  },
  it_education: {
    label: "IT Education",
    color: "var(--color-subject-it-education)",
  },
  resource: {
    label: "Resource",
    color: "var(--color-subject-resource)",
  },
  software_services: {
    label: "Software Services",
    color: "var(--color-subject-software-services)",
  },
  partner: {
    label: "Partner",
    color: "var(--color-subject-partner)",
  },
  others: {
    label: "Lainnya",
    color: "var(--color-subject-others)",
  },
} satisfies ChartConfig;

export function DonutChart({ data }: { data?: { title: string; number: string }[] }) {
  console.log(data);
  const mergedData = React.useMemo(() => {
    return Object.keys(chartConfig)
      .filter((key) => key !== "number")
      .map((key) => {
        const apiItem = data?.find((d) => d.title.toLowerCase() === key);
        return {
          title: key,
          number: apiItem ? Number(apiItem.number) : 0,
          fill: `var(--color-subject-${key.replace(/_/g, "-")})`,
        };
      });
  }, [data]);

  console.log(mergedData);

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle>Leads by Subject</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center min-h-[400px]">
        <ChartContainer className="w-full h-[350px]" config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} cursor={false} />
              <Pie data={mergedData} dataKey="number" innerRadius={40} nameKey="title" strokeWidth={5}>
                {mergedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <ChartLegend className="flex-wrap flex-col items-start pl-6 gap-2" content={<ChartLegendContent nameKey="title" />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
