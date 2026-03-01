"use client"
import { cartServices } from '@/services/cart.services'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'

export default function AddToCart({ medicineId }: { medicineId: string }) {

     const router = useRouter()

     const handleAddToCart=async()=>{
        const toastId=toast.loading("Adding to cart...")
        const {error}=await cartServices.addToCart({
            Medicine_id:medicineId,
            quantity:1
        })
        if(error){
            toast.error(error.message,{id:toastId})
            return
        }
        toast.success("Added to cart successfully",{id:toastId})
        router.push("/dashboard/my-cart")
     }  


  return (
   <Button variant="outline" size="lg" className="flex-1 h-14 rounded-full border-2" onClick={handleAddToCart}>
      SAVE MY CART
    </Button>
  )
}
