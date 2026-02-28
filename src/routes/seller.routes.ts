import { Routes } from "@/types/routes.type";

export const sellerRoutes:Routes[]=[{
  title: "Seller Dashboard",
  items: [{
    title: "Add Medicine",
    url: "/dashboard/add-medicine",
  },
  {
    title: "Medicine Management",
    url: "/dashboard/medicine-management",
  },
  {
    title: "Manage Orders",
    url: "/dashboard/manage-orders",
  },
  {
    title: "Home",
    url: "/",
  }
]
}]