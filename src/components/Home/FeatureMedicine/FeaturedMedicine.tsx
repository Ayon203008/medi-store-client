import MedicineCard from "@/components/MedicineCard/MedicineCard";
import { MedicineServices } from "@/services/medicine.services";
import { IMedicine } from "@/types/medicines.type";
import React from "react";

export default async function FeaturedMedicine() {
    
    const {data}= await MedicineServices.GetAllMedicines()
    console.log(data)
  
    return (
    <div className="mt-20 mb-20">
      <div>
        <h1 className="text-6xl text-center font-serif mb-10">Featured Medicine</h1>
      </div>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5'>
     
              {
                data?.data?.slice(0,6).map((medi: IMedicine)=>(<MedicineCard key={medi.id} medi={medi}/>))
              }
              </div>
    </div>
  );
}
