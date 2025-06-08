import { LayoutDashboard, User } from "lucide-react";
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
} from "../../shadcn/sidebar";
import Link from "next/link";
import Image from "next/image";

const AdminMenu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/admin-panel",
  },
  {
    title: "Użytkownicy",
    icon: User,
    url: "/admin-panel/users",
  },
];

export const AdminSideBar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/">
          <Image
            src="/branding/logo.png"
            alt="Logo Rolnik App"
            width={120}
            height={24}
            priority
            className="cursor-pointer"
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Panel Administratora</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {AdminMenu.map((item) => (
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
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};
