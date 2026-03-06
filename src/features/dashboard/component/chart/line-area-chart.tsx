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
  data: {
    month: string;
    sort_key: string;
    total: number;
  }[];
};

export function LineAreaChart({ data }: ChartProps) {
  const totalMessage = data.reduce((acc, item) => acc + item.total, 0);
  const chartData = React.useMemo(() => {
    if (!data?.length) return [];

    return data.map((item) => ({
      date: item.month,
      total: item.total,
    }));
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leads per Month</CardTitle>
        {/* <CardDescription> */}
        {/* <strong>{totalMessage}</strong> messages received in the last 12 months */}
        {/* </CardDescription> */}
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart data={chartData}>
            <CartesianGrid vertical={false} />

            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />

            <ChartTooltip />

            <Area dataKey="total" type="natural" fill="var(--primary)" stroke="var(--primary)" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
