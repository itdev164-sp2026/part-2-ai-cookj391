"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, FolderOpen, Home, LogOut, Settings } from "lucide-react";
import type { User } from "@supabase/supabase-js";

import { ModeToggle } from "@/components/mode-toggle";
import { signOut } from "@/app/actions";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Overview",
    href: "/",
    icon: Home,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: FolderOpen,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

interface AppSidebarProps {
  user: User | null;
}

export function AppSidebar({ user }: AppSidebarProps) {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();

  const handleNavItemClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader className="gap-3 px-3 py-4">
        <div className="flex items-center gap-3 px-1">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <BookOpen className="size-4" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-tight">
              ITDEV-164
            </p>
            <p className="truncate text-xs text-sidebar-foreground/70">
              Course Dashboard
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                      onClick={handleNavItemClick}
                    >
                      <Link href={item.href}>
                        <Icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="gap-3 border-t border-sidebar-border px-3 py-4">
        <div className="flex items-center justify-between gap-3 rounded-xl bg-sidebar-accent/50 px-3 py-2 text-sm text-sidebar-accent-foreground">
          <div className="min-w-0">
            <p className="truncate font-medium">Theme</p>
            <p className="truncate text-xs text-sidebar-foreground/70">
              Switch appearance
            </p>
          </div>
          <ModeToggle />
        </div>

        {user && (
          <button
            onClick={handleSignOut}
            className="flex w-full items-center justify-between gap-3 rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive hover:bg-destructive/20"
          >
            <div className="min-w-0">
              <p className="truncate font-medium">Sign Out</p>
              <p className="truncate text-xs text-destructive/70">
                {user.email}
              </p>
            </div>
            <LogOut className="size-4 flex-shrink-0" />
          </button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}