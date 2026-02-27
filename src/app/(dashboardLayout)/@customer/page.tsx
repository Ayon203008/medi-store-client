import { redirect } from 'next/navigation'

export default function CustomerDashboard() {
  return (
    redirect("/dashboard/wishlist")
  )
}
