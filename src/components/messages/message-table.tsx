"use client";

import React, { useEffect, useMemo } from "react";
import { Message } from "@/types/message";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAllMessagesAction } from "@/app/general/messages/action";
import { toast } from "sonner";

export function MessageTable() {
  const [data, setData] = React.useState<Message[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [filters, setFilters] = React.useState<ColumnFiltersState>([]);
  useEffect(() => {
    getAllMessagesAction()
      .then((res) => {
        if (res.success === false) {
          toast.error(res.message, { position: "top-center" });
          return;
        }
        setData(res.data ?? []);
      })
      .catch(() => toast.error("Gagal mengambil data"));
  }, []);

  /* ------------------------------------------------------------------ */
  /* Helpers                                                             */
  /* ------------------------------------------------------------------ */

  const uniqueStatuses = useMemo(() => [...new Set(data.map((d) => d.message_status))], [data]);

  const setColumnFilter = (id: string, value: string | null) => {
    setFilters((prev) => {
      const others = prev.filter((f) => f.id !== id);
      return value ? [...others, { id, value }] : others;
    });
  };

  /* ------------------------------------------------------------------ */
  return (
    <div className="space-y-4 ">
      {/* Toolbar */}
      <div className="flex items-center gap-4 ">
        {/* Search by name */}
        <Input placeholder="Search by name..." onChange={(e) => setColumnFilter("sender_name", e.target.value)} className="max-w-sm" />

        {/* Filter by status */}

        <Select defaultValue="ALL" onValueChange={(v) => setColumnFilter("message_status", v !== "ALL" ? v : null)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectGroup>
              <SelectItem value="ALL">All Status</SelectItem>
              {uniqueStatuses.map((status) => {
                return (
                  <SelectItem value={status} key={status}>
                    {status}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <DataTable data={data} columns={columns} getRowId={(row) => row.message_id} sorting={sorting} columnFilters={filters} onSortingChange={setSorting} onColumnFiltersChange={setFilters} />
    </div>
  );
}
