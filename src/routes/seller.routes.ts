import { Routes } from "@/types/routes.type";

export const sellerRoutes:Routes[]=[{
  title: "Seller Dashboard",
  items: [{
    title: "Add Medicine",
    url: "/dashboard/add-medicine",
  },
  {
    title: "Update Medicine",
    url: "/dashboard/update-medicine",
  },
  {
    title: "Delete Medicine",
    url: "/dashboard/delete-medicine",
  },
  {
    title: "Home",
    url: "/",
  }
]
}]