"use client";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import React from "react";
import { useAuthenticated } from "@/features/auth";
import { BreadcrumbNav } from "./breadcrumb-nav";

export function SiteHeader() {
  const { data: authenticated, isLoading } = useAuthenticated();

  return (
    <header className="flex h-(--header-height) shrink-0 items-center border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full min-w-0 items-center gap-2 px-4 lg:gap-4 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <div className="flex-1 min-w-0">
          <BreadcrumbNav />
        </div>
        <div className="ml-auto flex shrink-0 items-center gap-2">{!isLoading && authenticated && <NavUser user={authenticated} />}</div>
      </div>
    </header>
  );
}
