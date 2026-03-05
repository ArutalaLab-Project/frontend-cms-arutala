"use client";
import { DataTable, useTableState } from "@/components/shared/data-table";
import React, { useMemo } from "react";
import { column } from "./column";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserAddDialog } from "./user-add";
import { useUsers } from "../hooks";
import { Input } from "@/components/ui/input";
import { formatSnakeCaseToTitle } from "@/shared/utils/string";
import { getUniqueOptions } from "@/shared/utils/filter";

export function UserTable() {
  const { data: users, isLoading } = useUsers();
  const table = useTableState(8);

  const roleOptions = useMemo(() => {
    return getUniqueOptions(users, "role_name", formatSnakeCaseToTitle);
  }, [users]);

  return (
    <div className="space-y-4 ">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Toolbar */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:flex-wrap">
          {/* Search by name */}
          <Input placeholder="Search by name..." onChange={(e) => table.setColumnFilter("full_name", e.target.value)} className="w-full sm:max-w-sm" />

          {/* Filter by role */}
          <Select defaultValue="ALL" onValueChange={(v) => table.setColumnFilter("role_name", v !== "ALL" ? v : null)}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Filter role" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectGroup>
                <SelectItem value="ALL">All Role</SelectItem>
                {roleOptions.map((role) => (
                  <SelectItem value={role.value} key={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Add User */}
        <UserAddDialog />
      </div>

      {/* Table */}

      <DataTable data={users ?? []} columns={column} getRowId={(row) => row.user_id} isLoading={isLoading} {...table} />
    </div>
  );
}
