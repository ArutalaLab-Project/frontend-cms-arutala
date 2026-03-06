"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/shared/lib/cn";
import { formatedDate } from "@/shared/utils/date";
import { formatSnakeCaseToTitle } from "@/shared/utils/string";
import { Message, MessageStatus } from "@/features/message/type";

export const statusColorMessage: Record<MessageStatus, string> = {
  NEW: "bg-status-new text-black hover:bg-status-new",
  CONTACTED: "bg-status-contacted text-white hover:bg-status-contacted",
  QUALIFIED: "bg-status-qualified text-white hover:bg-status-qualified",
  PROPOSAL_SENT: "bg-status-proposal-sent text-white hover:bg-status-proposal-sent",
  NEGOTIATION: "bg-status-negotiation text-white hover:bg-status-negotiation",
  VERBAL_COMMITMENT: "bg-status-verbal-commitment text-white hover:bg-status-verbal-commitment",
  CLOSED_WON: "bg-status-closed-won text-white hover:bg-status-closed-won",
  CLOSED_LOST: "bg-status-closed-lost text-white hover:bg-status-closed-lost",
  ON_HOLD: "bg-status-on-hold text-black hover:bg-status-on-hold",
};

export const columns: ColumnDef<Message>[] = [
  {
    accessorKey: "created_date",
    header: "Date",
    cell: ({ row }) => formatedDate(row.original.created_date),
  },
  {
    id: "sender_name",
    accessorKey: "sender_name",
    header: "Name",
    enableColumnFilter: true,
    filterFn: "includesString",
  },
  {
    accessorKey: "organization_name",
    header: "Institution",
  },
  {
    accessorKey: "subject",
    header: "Subject",
    cell: ({ row }) => (
      <div className="flex gap-1 flex-wrap">
        {row.original.subject.map((s) => (
          <Badge key={s} variant="secondary" className="text-xs">
            {s}
          </Badge>
        ))}
      </div>
    ),
    filterFn: "arrIncludes",
  },
  {
    accessorKey: "message_status",
    header: "Status",
    enableColumnFilter: true,
    cell: ({ row }) => <Badge className={cn("text-shadow-2xs", statusColorMessage[row.original.message_status])}>{formatSnakeCaseToTitle(row.original.message_status)}</Badge>,
  },
];
