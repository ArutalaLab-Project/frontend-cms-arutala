"use client";

import React, { useMemo } from "react";
import { DataTable, useTableState } from "@/components/shared/data-table";
import { columns } from "./columns";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCourses } from "../hook";
import { getUniqueOptions } from "@/shared/utils/filter";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Course } from "../type";

const getRowId = (row: Course) => row.course_id;

export function CourseTable() {
  const { data: courses, isLoading } = useCourses();
  const table = useTableState(8);

  const categoryOptions = useMemo(() => {
    return getUniqueOptions(courses, "course_category_name");
  }, [courses]);

  const fieldOptions = useMemo(() => {
    return getUniqueOptions(courses, "course_field_name");
  }, [courses]);

  const statusOptions = useMemo(() => {
    return getUniqueOptions(courses, "is_displayed", (status) => (status ? "Published" : "Unpublished"));
  }, [courses]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:flex-wrap">
          <Input placeholder="Search by name..." onChange={(e) => table.setColumnFilter("course_title", e.target.value)} className="w-full sm:max-w-sm" />

          {/* Filter by Category */}
          <Select defaultValue="ALL" onValueChange={(v) => table.setColumnFilter("course_category_name", v !== "ALL" ? v : null)}>
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

          {/* Filter by Field */}
          <Select defaultValue="ALL" onValueChange={(v) => table.setColumnFilter("course_field_name", v !== "ALL" ? v : null)}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="All Field" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectGroup>
                <SelectItem value="ALL">All Field</SelectItem>
                {fieldOptions.map((field) => (
                  <SelectItem value={field.value} key={field.value}>
                    {field.label}
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

        <Button size="sm" asChild className="self-end shrink-0">
          <Link href="/content-website/courses/create">
            <PlusCircle /> Create Course
          </Link>
        </Button>
      </div>

      <DataTable data={courses ?? []} columns={columns} getRowId={getRowId} isLoading={isLoading} {...table} />
    </div>
  );
}
