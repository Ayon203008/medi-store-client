import { UserServices } from "@/services/user.services";
import React from "react";
export default async function Home() {
  const { data } = await UserServices.getSession();
  console.log(data);
  return <div>Home</div>;
}
