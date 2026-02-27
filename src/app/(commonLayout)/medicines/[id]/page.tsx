import { MedicineServices } from "@/services/medicine.services";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { IMedicine } from "@/types/medicines.type";

export default async function MedicineDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: medicine }: { data: IMedicine } = await MedicineServices.GetMedicineById(id);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Breadcrumb Style */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground uppercase tracking-widest">
          <span>Catalog</span>
          <span>/</span>
          <span>{medicine.manufacturer}</span>
          <span>/</span>
          <span className="text-primary ">{medicine.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT: Image Gallery Style */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border-4 border-white dark:border-slate-900 shadow-2xl">
              <Image
                src={medicine.image || "https://avatar.vercel.sh/shadcn"}
                alt={medicine.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-5 left-5">
                <Badge className="bg-black/80 text-white backdrop-blur-md border-none px-4 py-1.5 text-sm">
                  GENUINE PRODUCT
                </Badge>
              </div>
            </div>
            
            {/* Meta Info Grid */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border shadow-sm">
                <p className="text-2xl font-black text-primary">{medicine.stock}</p>
                <p className="text-[10px] uppercase tracking-tighter text-muted-foreground">Available Stock</p>
              </div>
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border shadow-sm">
                <p className="text-2xl font-black text-primary">100%</p>
                <p className="text-[10px] uppercase tracking-tighter text-muted-foreground">Safe Secure</p>
              </div>
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border shadow-sm">
                <p className="text-2xl font-black text-primary">Fast</p>
                <p className="text-[10px] uppercase tracking-tighter text-muted-foreground">Global Delivery</p>
              </div>
            </div>
          </div>

          {/* RIGHT: Product Details Card */}
          <div className="lg:col-span-5">
            <Card className="border-none shadow-none bg-transparent">
              <CardContent className="p-0 space-y-8">
                
                {/* Title & Price Section */}
                <div className="space-y-4">
                  <h1 className="text-5xl font-black tracking-tighter lg:text-4xl text-slate-900 dark:text-slate-50 uppercase">
                    {medicine.name}
                  </h1>
                  <div className="flex items-center gap-6">
                     <span className="text-4xl font-light text-primary italic">{medicine.price} tk </span>
                     <Badge variant="outline" className="border-primary text-primary px-4">Limited Edition</Badge>
                  </div>
                </div>

                <Separator className="bg-slate-300 dark:bg-slate-700" />

                {/* Description Body */}
                <div className="space-y-4">
                   <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Product Narrative</h2>
                   <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 italic">
                     "{medicine.description}"
                   </p>
                </div>

                {/* Technical Specifications Table */}
                <div className="rounded-2xl border bg-white dark:bg-slate-900 overflow-hidden">
                  <div className="p-4 bg-slate-100 dark:bg-slate-800 border-b">
                    <h3 className="text-xs font-bold uppercase italic">Specifications</h3>
                  </div>
                  <div className="divide-y text-sm">
                    <div className="flex justify-between p-4">
                      <span className="text-muted-foreground">Manufacturer</span>
                      <span className="font-bold">{medicine.manufacturer}</span>
                    </div>
                    <div className="flex justify-between p-4">
                      <span className="text-muted-foreground">Product Code</span>
                      <span className="font-mono">{medicine.id.slice(0, 12)}</span>
                    </div>
                    <div className="flex justify-between p-4">
                      <span className="text-muted-foreground">Category UID</span>
                      <span className="font-mono">{medicine.Category?.name}</span>
                    </div>
                    <div className="flex justify-between p-4">
                      <span className="text-muted-foreground">Registered Seller</span>
                      <span className="font-mono">{medicine.Seller?.name}</span>
                    </div>
                  </div>
                </div>

                {/* Call to Actions */}
                <div className="grid grid-cols-1 gap-4">
           
                  <div className="flex gap-4">
                    <Button variant="outline" size="lg" className="flex-1 h-14 rounded-full border-2">
                      SAVE TO WISHLIST
                    </Button>
                   
                  </div>
                </div>

                <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest">
                  Last Updated: {new Date(medicine.updatedAt).toDateString()}
                </p>

              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}