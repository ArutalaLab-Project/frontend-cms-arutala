"use client";

import { ColumnDef } from "@tanstack/react-table";
// import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Course } from "../type";
// import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group";
import { CourseDeleteDialog } from "./course-delete";
import { IconListDetails, IconWorldSearch } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Calendar, MoreVertical } from "lucide-react";
import { formatedDate } from "@/shared/utils/date";
import { cn } from "@/shared/lib/cn";
import { StatusColorCoursebatch } from "@/features/course-batch/component/columns";
import { formatSnakeCaseToTitle } from "@/shared/utils/string";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export const columns: ColumnDef<Course>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
  // },
  {
    id: "course_title",
    accessorKey: "course_title",
    header: "Title",
    enableColumnFilter: true,
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.original.course_title}</span>
      </div>
    ),
  },
  {
    accessorKey: "course_category_name",
    header: "Category",
    cell: ({ row }) => (
      <div className="flex gap-1 flex-wrap">
        <Badge>{row.original.course_category_name}</Badge>
      </div>
    ),
    filterFn: "arrIncludes",
  },
  {
    accessorKey: "course_field_name",
    header: "Field",
  },
  {
    accessorKey: "is_displayed",
    header: "Status",
    enableColumnFilter: true,
    cell: ({ row }) => <Badge className={row.original.is_displayed ? "bg-success" : "bg-destructive"}>{row.original.is_displayed ? "Published" : "Unpublished"}</Badge>,
    filterFn: (row, columnId, value) => {
      if (value === null || value === undefined) return true;
      return String(row.getValue(columnId)) === String(value);
    },
  },
  {
    id: "next_batch",
    header: "Next Batch",
    cell: ({ row }) => {
      const batch = row.original.course_batch;
      const hasBatch = batch && Object.keys(batch).length > 0;

      if (!hasBatch) {
        return (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground italic">No Batch</span>
            <Button variant="ghost" size="icon-sm" className="h-7 w-7" asChild>
              <Link href={`/content-website/courses/${row.original.course_id}/batch/create`}>
                <PlusCircle className="size-4 text-primary" />
              </Link>
            </Button>
          </div>
        );
      }

      return (
        <div className="flex flex-col gap-2 items-start max-w-50">
          <Link href={`/content-website/courses/${row.original.course_id}/batch/${batch.id}`} className="text-sm font-semibold leading-tight hover:underline text-left">
            {batch.name}
          </Link>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className={cn("text-shadow-2xs", StatusColorCoursebatch[batch.status])}>
              {formatSnakeCaseToTitle(batch.status)}
            </Badge>
            {batch.registration_start && (
              <span className="text-[10px] text-muted-foreground flex items-center gap-0.5 whitespace-nowrap" suppressHydrationWarning>
                <Calendar className="size-3" />
                {formatedDate(batch.registration_start)}
              </span>
            )}
          </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon-sm" variant="outline">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-45">
          <Link href={`/content-website/courses/${row.original.course_id}`}>
            <div className="w-full relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent">
              <IconListDetails className="size-4 shrink-0" />
              <span>Detail Course</span>
            </div>
          </Link>

          <Link href={`/general/seo-manage/${row.original.course_page_id}`}>
            <div className="w-full relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent">
              <IconWorldSearch className="size-4 shrink-0" />
              <span>Manage SEO</span>
            </div>
          </Link>

          <CourseDeleteDialog courseId={row.original.course_id} />
        </DropdownMenuContent>
      </DropdownMenu>
      // <ButtonGroup>
      //   <Button variant="outline" size="sm" asChild>
      //     <Link href={`/content-website/courses/${row.original.course_id}`}>
      //       <IconWorldSearch className="size-4" />
      //     </Link>
      //   </Button>
      //   <Button variant="outline" size="icon-sm" asChild>
      //     <Link href={`/content-website/courses/${row.original.course_id}`}>
      //       <IconListDetails />
      //     </Link>
      //   </Button>
      //   <ButtonGroupSeparator />
      //   <CourseDeleteDialog courseId={row.original.course_id} />
      // </ButtonGroup>
    ),
  },
];
