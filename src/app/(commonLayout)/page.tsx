
import FeaturedMedicine from "@/components/Home/FeatureMedicine/FeaturedMedicine";
import HeroCarousel from "@/components/Home/Hero/HeroCarousel";
import ReviewsSection from "@/components/Home/Review/ReviewSection";
import WhyChooseUs from "@/components/Home/WhyChooseUs/WhyChooseUs";
import { UserServices } from "@/services/user.services";
import React from "react";
export default async function Home() {
  const {data}=await UserServices.getSession()
  console.log(data);
  return <div>
    <HeroCarousel/>
    <FeaturedMedicine></FeaturedMedicine>
    <WhyChooseUs/>
    <ReviewsSection/>
  </div>;
}

