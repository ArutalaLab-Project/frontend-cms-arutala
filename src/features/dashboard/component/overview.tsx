"use client";
import { SkeletonCard } from "@/components/shared/skeleton-card";
import { useOverview } from "../hook";
import { EmptyState } from "@/components/shared/empty-state";
import { HorizontalBarChart } from "./chart/horizontal-bar-chart";
import { StatisticsLead } from "./statistics-lead";
import { DonutChart } from "./chart/donut-chart";
import { RecentLeadTable } from "./table-recent-leads/table";
import { LineAreaChart } from "./chart/line-area-chart";

export default function OverviewPage() {
  const { data, isPending } = useOverview();

  if (isPending) {
    return <SkeletonCard />;
  }

  if (!data) {
    return <EmptyState title="No data available" description="No data available" />;
  }

  const { stats } = data.messages;

  const messageStats = stats.messageStats[0] || {
    total_leads: "0",
    closed_won: "0",
    closed_lost: "0",
    conversion_rate: "0.00",
  };

  const statItems = [
    { title: "Total Leads", number: messageStats.total_leads },
    { title: "Closed Won", number: messageStats.closed_won },
    { title: "Closed Lost", number: messageStats.closed_lost },
    { title: "Conversion Rate", number: messageStats.conversion_rate, suffix: "%" },
  ];

  return (
    <div className="px-4 lg:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-4">
          <StatisticsLead data={statItems} />
        </div>

        <div className="lg:col-span-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
          <LineAreaChart data={stats.messageMonthly} />
          <HorizontalBarChart data={stats.messageStatus} />
        </div>

        <div className="lg:col-span-2 xl:col-span-3">
          <RecentLeadTable />
        </div>

        <div className="lg:col-span-2 xl:col-span-1">
          <DonutChart data={stats.messageSubject} />
        </div>
      </div>
    </div>
  );
}
