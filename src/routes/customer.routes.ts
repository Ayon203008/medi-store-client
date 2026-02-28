import { Routes } from "@/types/routes.type";

export const CusotmerRoutes: Routes[] = [{
  title: "Customer Dashbaord",
  items: [{
    title: "Manage Profile",
    url: "/dashboard/manage-profile",
  },
  {
    title: "My Cart",
    url: "/dashboard/my-cart",
  },
  {
    title: "Orders",
    url: "/dashboard/orders",
  },
  {
    title: "Home",
    url: "/",
  }]
}]