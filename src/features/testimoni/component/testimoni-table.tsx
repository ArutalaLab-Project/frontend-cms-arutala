"use client";

import React, { useMemo } from "react";
import { DataTable, useTableState } from "@/components/shared/data-table";
import { columns } from "./columns";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TestimoniAddDialog } from "./testimoni-add";
import { useTestimonies } from "../hook";
import { getUniqueOptions } from "@/shared/utils/filter";
import { Testimoni } from "../type";

const getRowId = (row: Testimoni) => row.testimoni_id;

export function TestimoniTable() {
  const { data: testimonies, isLoading } = useTestimonies();
  const table = useTableState(8);

  const categoryOptions = useMemo(() => {
    return getUniqueOptions(testimonies, "testimoni_category", (type) => (type === "SISWA" ? "Siswa" : "Talent"));
  }, [testimonies]);

  const statusOptions = useMemo(() => {
    return getUniqueOptions(testimonies, "is_displayed", (status) => (status ? "Published" : "Unpublished"));
  }, [testimonies]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:flex-wrap">
          <Input placeholder="Search by name..." onChange={(e) => table.setColumnFilter("author_name", e.target.value)} className="w-full sm:max-w-sm" />

          {/* Filter by Type */}
          <Select defaultValue="ALL" onValueChange={(v) => table.setColumnFilter("testimoni_category", v !== "ALL" ? v : null)}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="All Category" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectGroup>
                <SelectItem value="ALL">All Category</SelectItem>
                {categoryOptions.map((category) => (
                  <SelectItem value={category.value} key={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Filter by Status */}
          <Select defaultValue="ALL" onValueChange={(v) => table.setColumnFilter("is_displayed", v !== "ALL" ? v : null)}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent position="popper">
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
        <TestimoniAddDialog />
      </div>

      <DataTable data={testimonies ?? []} columns={columns} getRowId={getRowId} isLoading={isLoading} {...table} />
    </div>
  );
}
