"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { shopByNeed } from "@/data/homepage";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function ShopByNeed() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <SectionHeading
          title="Shop By Need"
          subtitle="Start with what you want to improve — then discover the right finds."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shopByNeed.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link
                href={item.href}
                className="group relative block overflow-hidden rounded-xl border border-border"
              >
                <div className="relative aspect-[5/4]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/45 to-dark/10" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/75">{item.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent transition-colors group-hover:text-white">
                    {item.cta} <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
