"use client";

import React, { useMemo } from "react";
import { DataTable, useTableState } from "@/components/shared/data-table";
import { columns } from "./columns";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useArticles } from "../hook";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { formatSnakeCaseToTitle } from "@/shared/utils/string";
import { getUniqueOptions } from "@/shared/utils/filter";

export function ArticleTable() {
  const { data: articles, isLoading } = useArticles();
  const table = useTableState(8);

  const statusOptions = useMemo(() => {
    return getUniqueOptions(articles, "article_status", formatSnakeCaseToTitle);
  }, [articles]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:flex-wrap">
          {/* Search by Title */}
          <Input placeholder="Search by title..." onChange={(e) => table.setColumnFilter("article_title", e.target.value)} className="w-full sm:max-w-sm" />

          {/* Filter by Status */}
          <Select defaultValue="ALL" onValueChange={(v) => table.setColumnFilter("article_status", v !== "ALL" ? v : null)}>
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
          <Link href="/content-website/articles/create">
            <PlusCircle /> Create Article
          </Link>
        </Button>
      </div>

      <DataTable data={articles ?? []} columns={columns} getRowId={(row) => row.article_id} isLoading={isLoading} {...table} />
    </div>
  );
}
