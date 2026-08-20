"use client";

import { featuredCollection, homepageFeaturedSlugs } from "@/data/homepage";
import { getProductsBySlugs } from "@/data/products";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Carousel } from "@/components/ui/carousel";
import { ProductCard } from "@/components/product/product-card";

export function FeaturedCollection() {
  const products = getProductsBySlugs(homepageFeaturedSlugs);

  return (
    <section className="py-12 md:py-16">
      <Container>
        <SectionHeading
          title={featuredCollection.title}
          subtitle={featuredCollection.description}
          viewMoreLink="/shop"
        />
        <Carousel slidesToShow={5} className="px-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Carousel>
      </Container>
    </section>
  );
}
