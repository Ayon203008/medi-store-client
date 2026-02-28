import { Routes } from "@/types/routes.type";

export const AdminRoutes: Routes[] = [{
  title: "Admin Dashboard",
  items: [{
    title: "Manage User",
    url: "/dashboard/manage-user",
  },
  {
    title: "Manage Medicines",
    url: "/dashboard/manage-medicines",
  },
  {
    title: "Manage Orders",
    url: "/dashboard/manage-orders",
  },
  {
    title: "Manage Categories",
    url: "/dashboard/manage-categories",
  },
  {
    title: "Home",
    url: "/",
  }
]
}]