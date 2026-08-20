"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { heroSlides } from "@/data/homepage";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/ui/carousel";

export function HeroBanner() {
  return (
    <section className="relative border-b border-border bg-dark">
      <Carousel autoplay showDots showArrows className="w-full">
        {heroSlides.map((slide) => (
          <div
            key={slide.id}
            className="relative aspect-[16/7] min-h-[420px] w-full md:min-h-[520px] lg:aspect-[21/8] lg:min-h-[560px]"
          >
            <Image
              src={slide.image}
              alt={slide.headline}
              fill
              className="object-cover"
              priority={slide.id === "1"}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-dark/75 via-dark/45 to-dark/15" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(220,38,38,0.12),transparent_55%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(245,158,11,0.08),transparent_50%)]" />
            <Container className="relative flex h-full items-center">
              <motion.div
                className="max-w-2xl text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
              >
                <h1 className="text-3xl font-extrabold uppercase leading-[1.05] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                  {slide.headline}
                </h1>
                <p className="mt-4 max-w-lg text-base text-white/85 sm:text-lg">{slide.description}</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button asChild size="lg" className="bg-white text-primary hover:bg-secondary hover:text-white">
                    <Link href={slide.ctaLink}>{slide.ctaText}</Link>
                  </Button>
                  {slide.secondaryCtaText && slide.secondaryCtaLink && (
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="border-white/50 bg-transparent text-white hover:bg-white hover:text-primary"
                    >
                      <Link href={slide.secondaryCtaLink}>{slide.secondaryCtaText}</Link>
                    </Button>
                  )}
                </div>
              </motion.div>
            </Container>
          </div>
        ))}
      </Carousel>
    </section>
  );
}
