"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import Link from "next/link";

const SLIDES = [
  {
    badge: "Fast Delivery",
    title: "Medicines at\nYour Doorstep.",
    description: "Authentic, affordable medicines delivered within 2–4 hours. Trusted by 50,000+ families across Bangladesh.",
    cta: { label: "Shop Medicines", href: "/medicines" },
    image: "/images/banner/banner1.jpg",
  },
  {
    badge: "100% Authentic",
    title: "Genuine Products Every Time.",
    description: "All medicines are sourced directly from licensed manufacturers and verified by our pharmacists.",
    cta: { label: "Browse Categories", href: "/medicines" },
    image: "/images/banner/banner2.jpg",
  },
];

export default function HeroCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  const plugin = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

  React.useEffect(() => {
    if (!api) return;
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <section className="w-full bg-background">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        opts={{ loop: true }}
        className="w-full relative"
      >
        <CarouselContent className="ml-0">
          {SLIDES.map((slide, index) => (
            <CarouselItem key={index} className="pl-0">
              <div className="relative h-[60vh] md:h-[85vh] w-full overflow-hidden">

                {/* Image */}
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  className="object-cover"
                  sizes="100vw"
                />

                {/* Gradient - right side darker for text */}
                <div className="absolute inset-0 bg-gradient-to-l from-black/85 via-black/50 to-transparent" />

                {/* Content - pushed to right */}
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full flex justify-end px-8 md:px-16">
                    <div className="max-w-md text-left space-y-5">

                      {/* Badge */}
                      <span className="inline-block text-xs font-bold uppercase tracking-widest text-white/60 border border-white/20 rounded-full px-4 py-1.5">
                        {slide.badge}
                      </span>

                      {/* Title */}
                      <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-[1.05] tracking-tight whitespace-pre-line">
                        {slide.title}
                      </h1>

                      {/* Description */}
                      <p className="text-sm md:text-base text-white/65 leading-relaxed">
                        {slide.description}
                      </p>

                      {/* CTA */}
                      <div className="flex items-center justify-end pt-1">
                        <Button asChild size="lg" className="rounded-full px-7 font-semibold">
                          <Link href={slide.cta.href}>
                            {slide.cta.label}
                            <ArrowRight className="w-4 h-4 ml-1.5" />
                          </Link>
                        </Button>
                      </div>

                    </div>
                  </div>
                </div>

              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Prev / Next */}
        <div className="absolute bottom-8 right-8 flex items-center gap-2 z-10">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-9 w-9 bg-white/10 border-white/20 text-white hover:bg-white/25 backdrop-blur-sm"
            onClick={() => api?.scrollPrev()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <span className="text-white/50 text-xs font-mono px-2">
            {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
          </span>

          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-9 w-9 bg-white/10 border-white/20 text-white hover:bg-white/25 backdrop-blur-sm"
            onClick={() => api?.scrollNext()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 flex h-[3px] gap-0.5">
          {SLIDES.map((_, i) => (
            <div
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={`h-full cursor-pointer transition-all duration-300 ${
                current === i ? "flex-[2] bg-primary" : "flex-1 bg-white/25"
              }`}
            />
          ))}
        </div>

      </Carousel>
    </section>
  );
}