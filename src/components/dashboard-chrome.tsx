"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";

import { ModeToggle } from "@/components/mode-toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

function getPageTitle(pathname: string) {
  if (pathname === "/") {
    return "Overview";
  }

  const segment = pathname.split("/").filter(Boolean)[0] ?? "Overview";
  return segment.charAt(0).toUpperCase() + segment.slice(1);
}

export function DashboardChrome({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  return (
    <SidebarInset>
      <header className="sticky top-0 z-20 flex h-16 items-center border-b border-border/60 bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:px-6">
        <div className="flex w-full items-center gap-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-5" />
          <Breadcrumb className="min-w-0 flex-1">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">
                    <Home className="mr-1.5 size-4" />
                    Dashboard
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{pageTitle}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto flex items-center gap-2">
            <ModeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-6 lg:px-6">
        <div className="mx-auto w-full max-w-6xl">{children}</div>
      </main>
    </SidebarInset>
  );
}