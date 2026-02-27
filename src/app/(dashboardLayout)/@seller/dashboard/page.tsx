import { redirect } from 'next/navigation'


export default function SellerDashboard() {
  return (
    redirect("/dashboard/add-medicine")
  )
}
