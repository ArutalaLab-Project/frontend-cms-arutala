"use client";

import * as React from "react";
import { DndContext, closestCenter, MouseSensor, TouchSensor, KeyboardSensor, useSensor, useSensors, type DragEndEvent, type UniqueIdentifier } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { SortableContext, useSortable, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ColumnDef, Row, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { z } from "zod";
import { IconDotsVertical, IconGripVertical, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";

/* -------------------------------------------------------------------------- */
/*                                   Schema                                   */
/* -------------------------------------------------------------------------- */

export const messageSchema = z.object({
  message_id: z.string(),
  sender_name: z.string(),
  sender_email: z.string(),
  sender_phone: z.string(),
  organization_name: z.string(),
  message_status: z.enum(["NEW", "CONTACTED", "QUALIFIED", "NEGOTIATION", "PROPOSAL_SENT"]),
  subject: z.array(z.string()),
  message_body: z.string(),
  created_date: z.string(),
});

export type Message = z.infer<typeof messageSchema>;

/* -------------------------------------------------------------------------- */
/*                               Drag Handle                                  */
/* -------------------------------------------------------------------------- */

function DragHandle({ id }: { id: string }) {
  const { attributes, listeners } = useSortable({ id });

  return (
    <Button {...attributes} {...listeners} variant="ghost" size="icon" className="size-7 cursor-grab text-muted-foreground">
      <IconGripVertical className="size-4" />
    </Button>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Columns                                   */
/* -------------------------------------------------------------------------- */

const statusColor: Record<Message["message_status"], string> = {
  NEW: "bg-blue-500",
  CONTACTED: "bg-yellow-500",
  QUALIFIED: "bg-green-500",
  NEGOTIATION: "bg-orange-500",
  PROPOSAL_SENT: "bg-purple-500",
};

const columns: ColumnDef<Message>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.message_id} />,
  },
  {
    id: "select",
    header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected()} onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)} />,
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(v) => row.toggleSelected(!!v)} />,
  },
  {
    accessorKey: "sender_name",
    header: "Sender",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.original.sender_name}</span>
        <span className="text-xs text-muted-foreground">{row.original.organization_name}</span>
      </div>
    ),
  },
  {
    accessorKey: "subject",
    header: "Subject",
    cell: ({ row }) => (
      <div className="flex gap-1 flex-wrap">
        {row.original.subject.map((s) => (
          <Badge key={s} variant="secondary">
            {s}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "message_status",
    header: "Status",
    cell: ({ row }) => <Badge className={statusColor[row.original.message_status]}>{row.original.message_status}</Badge>,
  },
  {
    accessorKey: "created_date",
    header: "Date",
    cell: ({ row }) => new Date(row.original.created_date).toLocaleDateString("id-ID"),
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <IconDotsVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>View Detail</DropdownMenuItem>
          <DropdownMenuItem>Mark as Qualified</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

/* -------------------------------------------------------------------------- */
/*                              Draggable Row                                 */
/* -------------------------------------------------------------------------- */

function DraggableRow({ row }: { row: Row<Message> }) {
  const { setNodeRef, transform, transition, isDragging } = useSortable({
    id: row.original.message_id,
  });

  return (
    <TableRow
      ref={setNodeRef}
      data-state={row.getIsSelected() && "selected"}
      className={isDragging ? "opacity-70" : ""}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
      ))}
    </TableRow>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 DataTable                                  */
/* -------------------------------------------------------------------------- */

export function DataTable({ data: initialData }: { data: Message[] }) {
  const [data, setData] = React.useState<Message[]>(initialData);
  const [rowSelection, setRowSelection] = React.useState({});

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor), useSensor(KeyboardSensor));

  const dataIds = React.useMemo<UniqueIdentifier[]>(() => data.map((d) => d.message_id), [data]);

  const table = useReactTable({
    data,
    columns,
    state: { rowSelection },
    getRowId: (row) => row.message_id,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setData((items) => {
      const oldIndex = items.findIndex((i) => i.message_id === active.id);
      const newIndex = items.findIndex((i) => i.message_id === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  }

  return (
    <div className="space-y-4">
      <DndContext sensors={sensors} collisionDetection={closestCenter} modifiers={[restrictToVerticalAxis]} onDragEnd={handleDragEnd}>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id}>
                  {hg.headers.map((header) => (
                    <TableHead key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
                {table.getRowModel().rows.map((row) => (
                  <DraggableRow key={row.id} row={row} />
                ))}
              </SortableContext>
            </TableBody>
          </Table>
        </div>
      </DndContext>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{table.getFilteredSelectedRowModel().rows.length} selected</span>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            <IconChevronLeft />
          </Button>
          <Button variant="outline" size="icon" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            <IconChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
