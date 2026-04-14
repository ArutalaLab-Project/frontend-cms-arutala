"use client";

import { type Icon } from "@tabler/icons-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

type NavItem = {
  title: string;
  url?: string;
  icon?: Icon;
  items?: { title: string; url: string }[];
};

function NavItemRow({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(() => item.items?.some((sub) => pathname.startsWith(sub.url)) ?? false);

  if (item.items && item.items.length > 0) {
    const isParentActive = item.items.some((sub) => pathname.startsWith(sub.url));
    return (
      <SidebarMenuItem>
        <SidebarMenuButton tooltip={item.title} isActive={isParentActive} onClick={() => setOpen((o) => !o)}>
          {item.icon && <item.icon />}
          <span>{item.title}</span>
          {open ? <ChevronDown className="ml-auto size-4" /> : <ChevronRight className="ml-auto size-4" />}
        </SidebarMenuButton>
        {open && (
          <SidebarMenuSub>
            {item.items.map((sub) => (
              <SidebarMenuSubItem key={sub.title}>
                <SidebarMenuSubButton asChild isActive={pathname === sub.url}>
                  <Link href={sub.url}>{sub.title}</Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        )}
      </SidebarMenuItem>
    );
  }

  const isActive = pathname === item.url;
  return (
    <SidebarMenuItem>
      <SidebarMenuButton tooltip={item.title} asChild isActive={isActive}>
        {item.url ? (
          <Link href={item.url}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
          </Link>
        ) : (
          <button>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
          </button>
        )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function NavMain({ items, labels }: { items: NavItem[]; labels: string }) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarGroupLabel>{labels}</SidebarGroupLabel>
        <SidebarMenu>
          {items.map((item) => (
            <NavItemRow key={item.title} item={item} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
