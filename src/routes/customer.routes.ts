import { Routes } from "@/types/routes.type";

export const CusotmerRoutes: Routes[] = [{
  title: "Customer Dashbaord",
  items: [{
    title: "Manage Profile",
    url: "/customer-dashboard/manage-profile",
  },
  {
    title: "Wishlist",
    url: "/customer-dashboard/wishlist",
  },
  {
    title: "Orders",
    url: "/customer-dashboard/orders",
  }]
}]