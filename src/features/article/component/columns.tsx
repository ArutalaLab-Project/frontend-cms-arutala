"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ActionTable } from "@/components/action-table";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { IconListDetails } from "@tabler/icons-react";
import Link from "next/link";
import { Article } from "../type";
import { ArticleDeleteDialog } from "./article-delete";
// import { ArticleEditSheet } from "./article-edit";
// import { ArticleStatusBadge } from "./article-status-badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { formatedDate } from "@/shared/utils/date";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Article>[] = [
  {
    id: "select",
    header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} aria-label="Select all" />,
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
  },
  {
    accessorKey: "article_cover_url",
    header: "Cover",
    cell: ({ row }) => {
      if (row.original.article_cover_url === null) {
        return <span></span>;
      }
      return (
        <div className=" min-w-36">
          <AspectRatio ratio={4 / 2} className="bg-accent rounded-lg border">
            <Image src={row.original.article_cover_url} alt={row.original.article_id} fill className="object-contain" />
          </AspectRatio>
        </div>
      );
    },
  },
  {
    id: "article_title",
    accessorKey: "article_title",
    header: "Title",
    enableColumnFilter: true,
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.original.article_title}</span>
        <span className="text-muted-foreground text-xs">{row.original.full_name}</span>
      </div>
    ),
  },
  {
    accessorKey: "created_date",
    header: "Date",
    cell: ({ row }) => formatedDate(row.original.created_date),
  },
  {
    id: "article_status",
    accessorKey: "article_status",
    header: "Status",
    enableColumnFilter: true,
    cell: ({ row }) => <Badge>{row.original.article_status}</Badge>,
    // cell: ({ row }) => <ArticleStatusBadge status={row.original.article_status} />,
    filterFn: "arrIncludes",
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => (
      <ButtonGroup>
        <ArticleDeleteDialog articleId={row.original.article_id} />

        <Button size="sm" onClick={() => redirect(`/content-website/articles/${row.original.article_id}`)}>
          <IconListDetails />
          Lihat Detail
        </Button>
      </ButtonGroup>
    ),
  },
];
