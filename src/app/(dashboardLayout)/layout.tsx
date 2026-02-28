import { AppSidebar } from "@/components/app-sidebar";
import {} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SessionServices } from "@/services/session.services";
import { Roles } from "@/types/role.type";
import React from "react";

export default async function Page({
  customer,
  admin,
  seller,
}: {
  customer: React.ReactNode;
  admin: React.ReactNode;
  seller: React.ReactNode;
}) {

  const {data}=await SessionServices.getSession()
  console.log(data)

  const userInfo = data.user

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
          
          {/* * children */}
          {userInfo.role === Roles.ADMIN ? admin : userInfo.role===Roles.SELLER? seller:customer}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
