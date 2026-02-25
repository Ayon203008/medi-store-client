import { AppSidebar } from "@/components/app-sidebar";
import {} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React from "react";

export default function Page({
  customer,
  admin,
  seller,
}: {
  customer: React.ReactNode;
  admin: React.ReactNode;
  seller: React.ReactNode;
}) {
  const userInfo = {
    role: "customer",
  };

  return (
    <SidebarProvider>
      <AppSidebar user={userInfo} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {userInfo.role === "admin" ? admin : userInfo.role==="seller"? seller:customer}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
