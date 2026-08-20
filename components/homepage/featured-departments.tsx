"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { featuredDepartments } from "@/data/homepage";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const sizeClasses = {
  large: "md:col-span-2 md:row-span-2 min-h-[280px] md:min-h-full",
  medium: "md:col-span-1 min-h-[200px]",
  small: "md:col-span-1 min-h-[160px]",
};

export function FeaturedDepartments() {
  return (
    <section className="bg-soft-section/60 py-12 md:py-16">
      <Container>
        <SectionHeading
          title="Shop By Department"
          subtitle="Browse the aisles of a modern American marketplace."
          viewMoreLink="/categories"
          viewMoreText="All Departments"
        />
        <div className="mt-8 grid auto-rows-fr gap-3 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-3 md:min-h-[540px]">
          {featuredDepartments.map((dept, index) => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className={cn(sizeClasses[dept.size])}
            >
              <Link
                href={`/categories/${dept.slug}`}
                className="group relative block h-full overflow-hidden rounded-xl border border-border bg-card"
              >
                <Image
                  src={dept.image}
                  alt={dept.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                  <h3 className="text-lg font-bold text-white md:text-xl">{dept.name}</h3>
                  <p className="mt-1 hidden max-w-xs text-sm text-white/75 sm:block">{dept.description}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.14em] text-accent">
                    Shop <ArrowRight className="h-3.5 w-3.5" />
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
