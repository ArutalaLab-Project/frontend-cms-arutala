"use client";

import * as React from "react";
import { Bar, BarChart, Cell, XAxis, YAxis } from "recharts";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const chartConfig = {
  number: {
    label: "Total Message",
  },
  new: {
    label: "New",
    color: "var(--color-status-new)",
  },
  contacted: {
    label: "Contacted",
    color: "var(--color-status-contacted)",
  },
  qualified: {
    label: "Qualified",
    color: "var(--color-status-qualified)",
  },
  proposal_sent: {
    label: "Proposal Sent",
    color: "var(--color-status-proposal-sent)",
  },
  negotiation: {
    label: "Negotiation",
    color: "var(--color-status-negotiation)",
  },
  verbal_commitment: {
    label: "Verbal Commitment",
    color: "var(--color-status-verbal-commitment)",
  },
  closed_won: {
    label: "Closed Won",
    color: "var(--color-status-closed-won)",
  },
  closed_lost: {
    label: "Closed Lost",
    color: "var(--color-status-closed-lost)",
  },
  on_hold: {
    label: "On Hold",
    color: "var(--color-status-on-hold)",
  },
} satisfies ChartConfig;

export function HorizontalBarChart({ data }: { data?: { title: string; number: string }[] }) {
  const mergedData = React.useMemo(() => {
    return Object.keys(chartConfig)
      .filter((key) => key !== "number")
      .map((key) => {
        const apiItem = data?.find((d) => d.title.toLowerCase() === key);

        return {
          title: key,
          number: apiItem ? Number(apiItem.number) : 0,
          fill: `var(--color-status-${key.replace(/_/g, "-")})`,
        };
      });
  }, [data]);

  console.log(mergedData);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Pipeline</CardTitle>
        {/* <CardDescription>Message by Status</CardDescription> */}
      </CardHeader>

      <CardContent>
        <ChartContainer className="h-[350px] w-full" config={chartConfig}>
          <BarChart accessibilityLayer data={mergedData} layout="vertical" margin={{ left: 10 }}>
            <YAxis axisLine={false} dataKey="title" tickFormatter={(value) => chartConfig[value as keyof typeof chartConfig]?.label} tickLine={false} tickMargin={10} type="category" width={160} />
            <XAxis dataKey="number" hide type="number" />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} cursor={false} />
            <Bar dataKey="number" radius={5}>
              {mergedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
