
import HeroCarousel from "@/components/Home/Hero/HeroCarousel";
import Footer from "@/components/Shared/Footer/Footer";
import { Navbar } from "@/components/Shared/Navbar/Navbar";
import React from "react";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col min-h-screen">
    <Navbar></Navbar>
    
    <div className="w-11/12 mx-auto flex-grow">
    {children}
    </div>
    <div className="mt-10">
      <Footer></Footer>
    </div>
    </div>;
}
