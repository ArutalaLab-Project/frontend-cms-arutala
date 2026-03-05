"use client";

import React, { useMemo } from "react";
import { DataTable, useTableState } from "@/components/shared/data-table";
import { Input } from "@/components/ui/input";
import { CourseBatch } from "../type";
import { columns } from "./columns";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatSnakeCaseToTitle } from "@/shared/utils/string";
import { getUniqueOptions } from "@/shared/utils/filter";

type CourseBatchProps = {
  batch: CourseBatch[];
  courseId: string;
};

const getRowId = (row: CourseBatch) => row.name;

export function CourseBatchTable({ batch, courseId }: CourseBatchProps) {
  const table = useTableState(8);

  const statusOptions = useMemo(() => {
    return getUniqueOptions(batch, "batch_status", formatSnakeCaseToTitle);
  }, [batch]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:flex-wrap">
          <Input placeholder="Search by name..." onChange={(e) => table.setColumnFilter("name", e.target.value)} className="w-full sm:max-w-sm" />

          {/* Filter by status */}
          <Select defaultValue="ALL" onValueChange={(v) => table.setColumnFilter("batch_status", v !== "ALL" ? v : null)}>
            <SelectTrigger className="w-full sm:w-40 h-9 text-sm">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent position="popper" className="text-sm">
              <SelectGroup>
                <SelectItem value="ALL">All Status</SelectItem>
                {statusOptions.map((status) => (
                  <SelectItem value={status.value} key={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <DataTable data={batch ?? []} columns={columns(courseId)} getRowId={getRowId} {...table} />
    </div>
  );
}
