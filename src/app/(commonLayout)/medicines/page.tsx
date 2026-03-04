import MedicineCard from "@/components/MedicineCard/MedicineCard";
import MedicineSearch from "@/components/MedicineSearch/MedicineSearch";
import { MedicineServices } from "@/services/medicine.services";
import { IMedicine } from "@/types/medicines.type";
import React from "react";
export default async function page({
  searchParams,
}: {
  searchParams: Promise<{
    name?: string;
    manufacturer?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}) {
  const { name, manufacturer, minPrice, maxPrice } = await searchParams;
  const { data } = await MedicineServices.GetAllMedicines({
    name,
    manufacturer,
    minPrice,
    maxPrice,
  });
  console.log(data);
  return (
    <div>
      <h1 className="text-6xl font-serif text-center mb-10">Medicines</h1>
      <MedicineSearch />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
        {data?.data?.map((medi: IMedicine) => (
          <MedicineCard key={medi.id} medi={medi} />
        ))}
      </div>
    </div>
  );
}
