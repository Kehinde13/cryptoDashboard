"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import logo from "@/assets/Logo (1).png";
import {
  LayoutDashboard,
  Settings,
  BadgeDollarSign,
  ArrowLeftRight,
  UserRoundPen,
  LogOut,
  BadgeHelp,
} from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const pathname = usePathname();
  const items = [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Markets",
      url: "#",
      icon: BadgeDollarSign,
    },
    {
      title: "Transactions",
      url: "#",
      icon: ArrowLeftRight,
    },
    {
      title: "Profile",
      url: "#",
      icon: UserRoundPen,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ];

  return (
    <Sidebar className="hidden md:block bg-white">
      <div className="flex gap-2 items-center p-5">
        <Image src={logo} alt="logo" className="w-12" />
        <h1 className="font-semibold md:text-xl">
          <span className="text-blue-400">Zoom</span>Trade
        </h1>
      </div>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        {items.map((item) => (
          <SidebarMenuItem
            key={item.title}
            className={`list-none ${
              item.url === pathname ? "text-blue-400" : ""
            }`}
          >
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        <SidebarGroup />
        <SidebarGroup>
          <SidebarMenuItem className="list-none">
            <SidebarMenuButton asChild>
              <a href={"/"}>
                <BadgeHelp />
                <span>Help</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="list-none">
            <SidebarMenuButton asChild>
              <a href={"/"}>
                <LogOut />
                <span>Logout</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <ModeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}
