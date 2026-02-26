"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";


import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";

const SLIDES = [
  {
    title: "Next-Gen Experience",
    description: "High-performance web applications with modern aesthetics.",
    image: "/images/banner/banner1.jpg",
  },
  {
    title: "Cloud Integration",
    description: "Scale your infrastructure globally without compromising speed.",
    image: "/images/banner/banner2.jpg",
  },
  {
    title: "Intelligence Design",
    description: "Creating intuitive interfaces that adapt to human behavior.",
    image: "/images/banner/banner3.jpg",
  },
];

export default function HeroCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  // Optimized Autoplay: No pause on hover to keep motion fluid
  const plugin = React.useRef(Autoplay({ delay: 5000 }));

  React.useEffect(() => {
    if (!api) return;
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <section className="w-full bg-background">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        opts={{ loop: true, skipSnaps: false }}
        className="w-full relative overflow-hidden"
      >
        <CarouselContent className="ml-0">
          {SLIDES.map((slide, index) => (
            <CarouselItem key={index} className="pl-0 relative transform translate-z-0">
              <div className="relative h-[60vh] md:h-[80vh] w-full">
                {/* Optimized Image: priority for first image only */}
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  className="object-cover"
                  sizes="100vw"
                />
                
                {/* Lightweight Gradient (No Blur) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="container relative z-10 h-full flex items-center px-6">
                  <div className="max-w-2xl text-white space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                      {slide.title}
                    </h1>
                    <p className="text-lg text-zinc-200">
                      {slide.description}
                    </p>
                    <Button size="lg" className="rounded-full px-8 font-semibold">
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Minimal Controls */}
        <div className="absolute bottom-6 right-6 flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-black/20 border-white/20 text-white hover:bg-black/50"
            onClick={() => api?.scrollPrev()}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-black/20 border-white/20 text-white hover:bg-black/50"
            onClick={() => api?.scrollNext()}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Lightweight Progress Bar */}
        <div className="absolute bottom-0 flex w-full h-1 gap-1">
          {SLIDES.map((_, index) => (
            <div
              key={index}
              className={`h-full transition-all duration-300 ${
                current === index ? "flex-[2] bg-primary" : "flex-1 bg-white/30"
              }`}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
}