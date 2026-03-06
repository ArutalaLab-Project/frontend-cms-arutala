"use client";

import { SimpleDataTable } from "@/components/shared/simple-data-table";
import { Message, useMessages } from "@/features/message";
import { columns } from "./column";
import { isAfter, subMonths } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const getRowId = (row: Message) => row.message_id;

export function RecentLeadTable() {
  const { data: messages, isLoading } = useMessages();

  const oneMonthAgo = subMonths(new Date(), 1);
  const filteredMessages = messages?.filter((message) => isAfter(new Date(message.created_date), oneMonthAgo)) ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest Leads</CardTitle>
      </CardHeader>
      <CardContent>
        <SimpleDataTable data={filteredMessages} columns={columns} getRowId={getRowId} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
}
