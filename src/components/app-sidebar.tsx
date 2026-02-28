import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { Routes } from "@/types/routes.type";
import { AdminRoutes } from "@/routes/admin.routes";
import { CusotmerRoutes } from "@/routes/customer.routes";
import { sellerRoutes } from "@/routes/seller.routes";
import { Roles } from "@/types/role.type";
import { LayoutDashboard } from "lucide-react";

export function AppSidebar({
  user,
  ...props
}: {
  user: { role: string; name?: string; email?: string } & React.ComponentProps<typeof Sidebar>;
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
  }

  return (
    <Sidebar {...props}>
      {/* Header */}
      <SidebarHeader className="px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary rounded-md p-1.5">
            <LayoutDashboard className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-sm">Dashboard</span>
        </div>
      </SidebarHeader>

      <Separator />

      {/* User Info */}
      <div className="px-4 py-3 flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
            {user.name?.charAt(0).toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium leading-none">{user.name || "User"}</span>
          <span className="text-xs text-muted-foreground mt-0.5">{user.role}</span>
        </div>
      </div>

      <Separator />

      {/* Navigation */}
      <SidebarContent className="px-2 py-2">
        {routes.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground px-2 mb-1">
              {section.title}
            </SidebarGroupLabel>
            <SidebarMenu>
              {section.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="rounded-md hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Link href={item.url} className="flex items-center gap-2 px-2 py-1.5 text-sm">
                      {item.title}
                    </Link>
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