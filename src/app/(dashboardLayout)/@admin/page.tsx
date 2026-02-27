import { redirect } from 'next/navigation'

export default function AdminDashboard() {
  return (
    redirect("/dashboard/manage-user")
  )
}
