"use client";

import React from "react";
import Image from "next/image";
import { Star, Pill, ShieldCheck, Plus, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// MediStore ব্র্যান্ড লোগো কম্পোনেন্ট
const MediStoreLogo = () => (
  <div className="flex items-center gap-2 group">
    <div className="relative h-11 w-11 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 transition-transform group-hover:rotate-6">
      <Pill className="h-6 w-6 text-primary-foreground transform rotate-45" />
      <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-emerald-500 border-2 border-background flex items-center justify-center shadow-md">
        <Plus className="h-3 w-3 text-white stroke-[3]" />
      </div>
    </div>
    <div className="flex flex-col">
      <span className="text-2xl font-extrabold tracking-tighter leading-none">
        Medi<span className="text-primary">Store</span>
      </span>
      <span className="text-[10px] font-medium text-muted-foreground tracking-wider uppercase">
        Authentic Medicines
      </span>
    </div>
  </div>
);

// রিভিউ ডাটা (এখানে আমরা ইমেজ ইউআরএল ব্যবহার করছি)
const REVIEWS = [
  {
    id: 1,
    name: "Dr. Farhan Ahmed",
    role: "Consultant Physician",
    // আপনি public/images/avatars/user1.png ফোল্ডারে ইমেজ রাখতে পারেন
    image: "/images/avatars/user1.png", 
    rating: 5,
    verified: true,
    comment: "I regularly order chronic illness medications for my family. MediStore always delivers temperature-sensitive drugs perfectly. Their authenticity is unquestionable.",
  },
  {
    id: 2,
    name: "Tanjina Khan",
    role: "Mother of Two",
    image: "/images/avatars/user2.png",
    rating: 5,
    verified: true,
    comment: "Excellent service! Ordering online was seamless. The pharmacist called to clarify my prescription before processing. Very professional and trustable.",
  },
  {
    id: 3,
    name: "Tanvir Hossain",
    role: "Regular Customer",
    // প্লেসহোল্ডার ইমেজ (যদি ইউজার ইমেজ না থাকে)
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200", 
    rating: 4,
    verified: true,
    comment: "Prices are competitive and delivery is quick within Dhaka. Appreciate the cash-on-delivery option for medicines. Highly recommended!",
  },
];

export default function AdvancedReviewsSection() {
  return (
    <section className="w-full py-20 bg-background relative overflow-hidden">
      
      {/* Background Subtle Accent */}
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl -z-10" />

      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 p-8 rounded-3xl border bg-muted/30">
          <div className="space-y-4">
            {/* আমাদের নতুন লোগো */}
            <MediStoreLogo />
            <p className="text-muted-foreground max-w-lg mt-4">
              Our commitment to your health starts with authenticity. See why thousands of patients trust us with their medicine orders every day.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center p-6 bg-background rounded-2xl border shadow-sm text-center">
            <span className="text-6xl font-bold">4.9<span className="text-3xl text-muted-foreground">/5</span></span>
            <div className="flex mt-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">Based on 12,500+ Reviews</p>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {REVIEWS.map((review, index) => (
            <Card key={review.id} className={cn(
                "relative h-full flex flex-col border bg-background hover:shadow-lg transition-all duration-300 rounded-3xl",
                index === 1 ? "md:scale-105 border-primary/20 shadow-primary/5 shadow-xl" : ""
            )}>
              <CardHeader className="p-8 pb-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    {/* Shadcn Avatar - এখানে আমরা 'src' ব্যবহার করছি */}
                    <Avatar className="h-14 w-14 border-2 border-primary/10 shadow-sm">
                      <AvatarImage src={review.image} alt={review.name} className="object-cover" />
                      {/* যদি ইমেজ লোড না হয় তবে ব্যাকআপ হিসেবে ইনিশিয়াল */}
                      <AvatarFallback className="bg-primary/5 text-primary font-bold">
                        {review.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-lg font-bold leading-none">{review.name}</span>
                      <span className="text-sm text-muted-foreground mt-1">{review.role}</span>
                    </div>
                  </div>
                  {/* Rating Stars */}
                  <div className="flex shrink-0 gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8 pt-0 flex-grow">
                <blockquote className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed italic mt-4 relative">
                  <span className="text-6xl font-serif text-primary/10 absolute -top-8 -left-4">“</span>
                  {review.comment}
                </blockquote>
              </CardContent>
              {review.verified && (
                <div className="px-8 pb-8 mt-auto">
                   <Badge variant="outline" className="w-full justify-center gap-2 py-2 rounded-full border-emerald-500/30 text-emerald-700 bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-400">
                     <ShieldCheck className="h-4 w-4" /> Verified MediStore Order
                   </Badge>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
            <Badge variant="outline" className="px-6 py-2 rounded-full text-xs font-semibold gap-2 border-primary/30 text-primary bg-primary/5">
                <CheckCircle2 className="h-3 w-3" /> Licensed Pharmacy | Safe Delivery
            </Badge>
        </div>

      </div>
    </section>
  );
}