"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, type ChartConfig } from "@/components/ui/chart";

export const description = "Monthly message statistics";

const chartConfig = {
  total: {
    label: "Total Messages",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

type ChartProps = {
  stats: {
    month: string;
    sort_key: string;
    total: number;
  }[];
};

export function ChartArea({ stats }: ChartProps) {
  const chartData = React.useMemo(() => {
    if (!stats?.length) return [];

    const lastTwelveMonths = stats.slice(-12);

    return lastTwelveMonths.map((item) => ({
      date: item.month,
      total: item.total,
    }));
  }, [stats]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Messages</CardTitle>
        <CardDescription>Total messages received in the last 12 months</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart data={chartData}>
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                })
              }
            />

            <ChartTooltip />

            <Area dataKey="total" type="natural" fill="var(--primary)" stroke="var(--primary)" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
