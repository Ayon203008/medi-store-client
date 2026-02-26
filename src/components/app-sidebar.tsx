/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { GalleryVerticalEnd } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Routes } from "@/types/routes.type";
import { AdminRoutes } from "@/routes/admin.routes";
import { CusotmerRoutes } from "@/routes/customer.routes";
import { sellerRoutes } from "@/routes/seller.routes";
import { Roles } from "@/types/role.type";

export function AppSidebar({
  user,
  ...props
}: {
  user: { role: string } & React.ComponentProps<typeof Sidebar>;
}) {
  let routes: Routes[] = [];
  switch (user.role) {
    case Roles.ADMIN:
      routes = AdminRoutes;
      break;
    case Roles.CUSTOMER:
      routes = CusotmerRoutes;
      break;

    case Roles.SELLER:
      routes = sellerRoutes;
      break;
    default:
      routes = [];
      break;
  }

  return (
    <Sidebar {...props}>
      <SidebarContent>
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarMenu>
              {item.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>{item.title}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
