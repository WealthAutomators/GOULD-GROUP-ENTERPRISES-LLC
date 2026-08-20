import { HeroBanner } from "@/components/homepage/hero-banner";
import { FeaturedDepartments } from "@/components/homepage/featured-departments";
import { DealsOfTheDay } from "@/components/homepage/deals-of-the-day";
import { FeaturedCollection } from "@/components/homepage/featured-collection";
import { PromotionalBanner } from "@/components/homepage/promotional-banner";
import { NewArrivals } from "@/components/homepage/new-arrivals";
import { ShopByNeed } from "@/components/homepage/shop-by-need";
import { BestSellers } from "@/components/homepage/best-sellers";
import { CustomerReviews } from "@/components/homepage/customer-reviews";
import { Newsletter } from "@/components/homepage/newsletter";

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <FeaturedDepartments />
      <DealsOfTheDay />
      <FeaturedCollection />
      <PromotionalBanner />
      <NewArrivals />
      <ShopByNeed />
      <BestSellers />
      <CustomerReviews />
      <Newsletter />
    </>
  );
}
