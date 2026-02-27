import { Routes } from "@/types/routes.type";

export const CusotmerRoutes: Routes[] = [{
  title: "Customer Dashbaord",
  items: [{
    title: "Manage Profile",
    url: "/dashboard/manage-profile",
  },
  {
    title: "Wishlist",
    url: "/dashboard/wishlist",
  },
  {
    title: "Orders",
    url: "/dashboard/orders",
  }]
}]