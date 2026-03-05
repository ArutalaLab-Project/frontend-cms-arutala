"use client";

import React, { useMemo } from "react";
import { DataTable, useTableState } from "@/components/shared/data-table";
import { columns } from "./columns";
import { Input } from "@/components/ui/input";
import { usePages } from "../hook";
import { SkeletonTable } from "@/components/shared/skeleton-table";
import { Page } from "../type";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getUniqueOptions } from "@/shared/utils/filter";
import { formatSnakeCaseToTitle } from "@/shared/utils/string";

const getRowId = (row: Page) => row.page_id;

export function PageTable() {
  const { data: pages, isLoading } = usePages();
  const table = useTableState(8);

  const statusOptions = useMemo(() => {
    return getUniqueOptions(pages, "seo_status", formatSnakeCaseToTitle);
  }, [pages]);

  if (isLoading) return <SkeletonTable />;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:flex-wrap">
          <Input placeholder="Search by page name..." onChange={(e) => table.setColumnFilter("page_title", e.target.value)} className="w-full sm:max-w-sm" />

          <Select defaultValue="ALL" onValueChange={(v) => table.setColumnFilter("seo_status", v !== "ALL" ? v : null)}>
            <SelectTrigger className="w-full sm:w-40 h-9 text-sm">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent position="popper" className="text-sm">
              <SelectGroup>
                <SelectItem value="ALL">All Status</SelectItem>
                {statusOptions.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <DataTable data={pages ?? []} columns={columns} getRowId={getRowId} isLoading={isLoading} {...table} />
    </div>
  );
}
