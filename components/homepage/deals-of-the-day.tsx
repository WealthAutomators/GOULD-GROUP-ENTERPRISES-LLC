"use client";

import { dealsEndTime, homepageDealsSlugs } from "@/data/homepage";
import { getProductsBySlugs } from "@/data/products";
import { Container } from "@/components/ui/container";
import { CountdownTimer } from "@/components/ui/countdown-timer";
import { Carousel } from "@/components/ui/carousel";
import { ProductCard } from "@/components/product/product-card";

export function DealsOfTheDay() {
  const deals = getProductsBySlugs(homepageDealsSlugs);

  return (
    <section className="bg-dark py-12 text-white md:py-16">
      <Container>
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Limited Time</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">Today&apos;s Finds</h2>
            <p className="mt-2 max-w-md text-sm text-white/70">
              High-energy deals with sale prices worth grabbing before the clock runs out.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Ends in</span>
            <CountdownTimer endTime={dealsEndTime} />
          </div>
        </div>
        <Carousel slidesToShow={4} className="px-8">
          {deals.map((product) => (
            <div key={product.id} className="rounded-xl bg-white p-1">
              <ProductCard product={product} />
            </div>
          ))}
        </Carousel>
      </Container>
    </section>
  );
}
