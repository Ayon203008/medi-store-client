
import FeaturedMedicine from "@/components/Home/FeatureMedicine/FeaturedMedicine";
import HeroCarousel from "@/components/Home/Hero/HeroCarousel";
import ReviewsSection from "@/components/Home/Review/ReviewSection";
import WhyChooseUs from "@/components/Home/WhyChooseUs/WhyChooseUs";
import { SessionServices } from "@/services/session.services";
import React from "react";
export default async function Home() {
  const {data}=await SessionServices.getSession()
  console.log(data);
  return <div>
    <HeroCarousel/>
    <FeaturedMedicine></FeaturedMedicine>
    <WhyChooseUs/>
    <ReviewsSection/>
  </div>;
}

