// components/app-sidebar.tsx
"use client";

import {
  ActivitySquare,
  ArchiveIcon,
  ChartBarBig,
  ChartLine,
  ChevronDownIcon,
  ChevronUp,
  CircleCheck,
  CircleDashed,
  CircleFadingArrowUp,
  FolderKanban,
  LayoutDashboard,
  ListTree,
  LoaderCircle,
  Building2,
  Users,
  User2,
} from "lucide-react";
import React from "react";
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "./ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Button } from "./ui/button";
import { EUserRole } from "@/types/enums";
import { useAuth } from "@/hooks/use.auth";

interface NavItem {
  title: string;
  url: string;
  icon: React.ElementType;
}

const NAV_BY_ROLE: Record<EUserRole, NavItem[]> = {
  [EUserRole.ADMIN]: [
    { title: "Dashboard", url: "/a/dashboard", icon: LayoutDashboard },
    { title: "Users", url: "/a/users", icon: Users },
    { title: "Team", url: "/p/members", icon: Building2 },
    { title: "Projects", url: "/p/projects", icon: FolderKanban },
    { title: "Tasks", url: "/m/tasks", icon: ListTree },
  ],
  [EUserRole.PROJECT_MANAGER]: [
    { title: "Dashboard", url: "/p/dashboard", icon: LayoutDashboard },
    { title: "Team", url: "/p/members", icon: Building2 },
    { title: "Projects", url: "/p/projects", icon: FolderKanban },
    { title: "Tasks", url: "/m/tasks", icon: ListTree },
  ],
  [EUserRole.MEMBER]: [
    { title: "Projects", url: "/p/projects", icon: FolderKanban },
    { title: "Tasks", url: "/m/tasks", icon: ListTree },
  ],
  [EUserRole.VIEWER]: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Tasks", url: "/m/tasks", icon: ListTree },
  ],
};

export default function AppSidebar() {
  const { displayName, logout, role } = useAuth();

  const navItems = role ? (NAV_BY_ROLE[role] ?? []) : [];

  const showProjects =
    role === EUserRole.ADMIN || role === EUserRole.PROJECT_MANAGER;

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/" className="flex items-center gap-2">
                <Image src="/logo.svg" alt="logo" width={20} height={20} />
                <span>Lorem</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarSeparator />

        {/* Main nav — role-filtered */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Projects section — admin + project_manager only */}
        {showProjects && (
          <SidebarGroup>
            <Collapsible defaultOpen className="group/collapsible">
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="group w-full">
                    Projects
                    <ChevronDownIcon className="ml-auto transition-transform group-data-[state=open]:rotate-180" />
                  </Button>
                </CollapsibleTrigger>
              </SidebarGroupLabel>

              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/p/projects">
                          <ChartBarBig /> Status
                        </Link>
                      </SidebarMenuButton>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton asChild>
                            <Link href="/p/projects?status=active">
                              <ActivitySquare /> Active
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton asChild>
                            <Link href="/p/projects?status=archived">
                              <ArchiveIcon /> Archived
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton asChild>
                            <Link href="/p/projects?status=completed">
                              <CircleCheck /> Completed
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>
        )}

        {/* Tasks progress — all roles */}
        <SidebarGroup>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="group w-full">
                  Tasks progress
                  <ChevronDownIcon className="ml-auto transition-transform group-data-[state=open]:rotate-180" />
                </Button>
              </CollapsibleTrigger>
            </SidebarGroupLabel>

            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/m/tasks">
                        <ChartLine /> Status
                      </Link>
                    </SidebarMenuButton>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/m/tasks?status=pending">
                            <CircleDashed /> Pending
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/m/tasks?status=in_progress">
                            <LoaderCircle /> In Progress
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/m/tasks?status=in_review">
                            <CircleFadingArrowUp /> In Review
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <Link href="/m/tasks?status=done">
                            <CircleCheck /> Done
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 />
                  {displayName}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <SidebarSeparator />
                <DropdownMenuItem className="text-destructive" onClick={logout}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
