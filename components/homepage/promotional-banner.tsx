"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { promotionalBanner } from "@/data/homepage";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function PromotionalBanner() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <div className="relative overflow-hidden rounded-2xl border border-border min-h-[340px] md:min-h-[420px]">
          <Image
            src={promotionalBanner.image}
            alt={promotionalBanner.title}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/70 to-dark/35" />
          <div className="absolute right-8 top-8 h-16 w-16 rotate-12 rounded-md bg-secondary/80" />
          <div className="absolute bottom-10 right-16 h-10 w-10 rounded-full bg-accent/90" />
          <div className="relative flex h-full min-h-[340px] flex-col items-start justify-center p-8 md:min-h-[420px] md:p-12 lg:p-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="max-w-xl"
            >
              <h2 className="text-3xl font-extrabold uppercase tracking-tight text-white md:text-4xl lg:text-5xl">
                {promotionalBanner.title}
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-white/85 md:text-lg">
                {promotionalBanner.description}
              </p>
              <Button asChild size="lg" className="mt-8 bg-white text-primary hover:bg-secondary hover:text-white">
                <Link href={promotionalBanner.buttonLink}>{promotionalBanner.buttonText}</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
