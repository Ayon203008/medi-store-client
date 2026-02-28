import { Routes } from "@/types/routes.type";

export const AdminRoutes: Routes[] = [{
  title: "Admin Dashboard",
  items: [{
    title: "Manage User",
    url: "/manage-user",
  },
  {
    title: "Manage Orders",
    url: "/manage-orders",
  },
  {
    title: "Manage Categories",
    url: "/manage-categories",
  },
  {
    title: "Home",
    url: "/",
  }
]
}]