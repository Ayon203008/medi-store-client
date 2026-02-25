import { Navbar } from "@/components/Navbar/Navbar";
import React from "react";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>
    <Navbar></Navbar>
    <div className="w-11/12 mx-auto">

    {children}
    </div>
    </div>;
}
