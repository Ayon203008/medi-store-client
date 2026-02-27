import MedicineCard from '@/components/MedicineCard/MedicineCard'
import { MedicineServices } from '@/services/medicine.services'
import React from 'react'
export default async function page() {

  const {data}= await MedicineServices.GetAllMedicines()
  console.log(data)
  return (
    <div>
        <h1 className='text-6xl font-serif text-center mb-10'>Medicines</h1>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5'>

        {
          data?.data?.map((medi)=>(<MedicineCard key={medi.id} medi={medi}/>))
        }
        </div>
    </div>
  )
}
