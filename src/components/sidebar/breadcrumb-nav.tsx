"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis } from "@/components/ui/breadcrumb";
import { generateBreadcrumb } from "@/shared/utils/breadcumb";
import { useBreadcrumbLabels } from "@/providers";
import { Skeleton } from "@/components/ui/skeleton";

// Paths that do not have their own pages (to avoid 404s)
const NON_CLICKABLE_PATHS = ["/content-website", "/general"];

// Regex to detect UUID (common pattern for IDs in this project)
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const MAX_SEGMENTS = 3;

export function BreadcrumbNav() {
  const pathname = usePathname();
  const { labels } = useBreadcrumbLabels();

  const breadcrumbs = generateBreadcrumb(pathname);

  const renderItem = (item: { href: string; segment: string; label: string }, isLast: boolean) => {
    const isNonClickable = NON_CLICKABLE_PATHS.includes(item.href);
    const hasLabel = labels[item.href] || labels[item.segment];
    const isId = UUID_REGEX.test(item.segment);
    const label = labels[item.href] || labels[item.segment] || item.label;

    return (
      <BreadcrumbItem className="max-w-[120px] sm:max-w-[200px]">
        {isLast ? (
          <BreadcrumbPage className="truncate">{isId && !hasLabel ? <Skeleton className="h-4 w-24" /> : label}</BreadcrumbPage>
        ) : isNonClickable ? (
          <span className="text-muted-foreground/60 cursor-default truncate">{label}</span>
        ) : (
          <BreadcrumbLink asChild className="truncate">
            {isId && !hasLabel ? <Skeleton className="h-4 w-24" /> : <Link href={item.href}>{label}</Link>}
          </BreadcrumbLink>
        )}
      </BreadcrumbItem>
    );
  };

  return (
    <Breadcrumb>
      <BreadcrumbList className="flex-nowrap overflow-hidden">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/general/dashboard">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbs.length > 0 && <BreadcrumbSeparator />}

        {breadcrumbs.length > MAX_SEGMENTS ? (
          <>
            {renderItem(breadcrumbs[0], false)}
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {renderItem(breadcrumbs[breadcrumbs.length - 1], true)}
          </>
        ) : (
          breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <React.Fragment key={item.href}>
                {renderItem(item, isLast)}
                {!isLast && <BreadcrumbSeparator />}
              </React.Fragment>
            );
          })
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
