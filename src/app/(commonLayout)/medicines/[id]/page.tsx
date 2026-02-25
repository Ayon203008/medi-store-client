import { MedicineServices } from "@/services/medicine.services";
import React from "react";

import { Button } from "@/components/ui/button"
import {
  Card,
  
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { IMedicine } from "@/types/medicines.type";

export default async function MedicineDetailsPage({
  params,
}: {
  params:Promise <{ id: string }>;
}) {
  const { id } = await params;
  
  const {data:medicine}=await MedicineServices.GetMedicineById(id)
 return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src="https://avatar.vercel.sh/shadcn1"
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
      <CardHeader>
    {medicine.name}
        <CardTitle>Design systems meetup</CardTitle>
        <CardDescription>
          {medicine.description}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">View Event</Button>
      </CardFooter>
    </Card>
  )
  
}




