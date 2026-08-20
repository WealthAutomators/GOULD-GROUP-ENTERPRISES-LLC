import {
  Announcement,
  Feature,
  HeroSlide,
  PromoBanner,
} from "@/types";

export const announcement: Announcement = {
  text: "New Arrivals + Weekly Deals",
  ctaText: "Shop Now →",
  ctaLink: "/shop",
};

export const heroSlides: HeroSlide[] = [
  {
    id: "1",
    image: "/hero/hero-1.jpg",
    headline: "EVERYDAY, UPGRADED.",
    description:
      "Discover practical products, smart essentials and fresh finds for every part of your life.",
    ctaText: "Shop Now",
    ctaLink: "/shop",
  },
  {
    id: "2",
    image: "/hero/hero-2.jpg",
    headline: "MAKE YOUR SPACE WORK BETTER.",
    description:
      "Home and workspace essentials designed to organize, brighten, and simplify your day.",
    ctaText: "Explore Home",
    ctaLink: "/categories/home",
  },
  {
    id: "3",
    image: "/hero/hero-3.jpg",
    headline: "DEALS WORTH DISCOVERING.",
    description:
      "Promotions and bestsellers with real value — curated picks that feel worth it.",
    ctaText: "Shop Deals",
    ctaLink: "/shop?sale=true",
  },
];

export const featuredDepartments = [
  {
    id: "1",
    name: "Home",
    slug: "home",
    image: "/categories/home.jpg",
    description: "Shelving, benches, and organizers for living spaces.",
    size: "large" as const,
  },
  {
    id: "2",
    name: "Electronics",
    slug: "electronics",
    image: "/categories/electronics.jpg",
    description: "Charging, hubs, and everyday tech utilities.",
    size: "medium" as const,
  },
  {
    id: "3",
    name: "Kitchen",
    slug: "kitchen",
    image: "/categories/kitchen.jpg",
    description: "Prep tools and countertop upgrades.",
    size: "medium" as const,
  },
  {
    id: "4",
    name: "Office",
    slug: "office",
    image: "/categories/office.jpg",
    description: "Desk systems that keep work clear.",
    size: "small" as const,
  },
  {
    id: "5",
    name: "Beauty",
    slug: "beauty",
    image: "/categories/beauty.jpg",
    description: "Vanity, organizers, and travel kits.",
    size: "small" as const,
  },
  {
    id: "6",
    name: "Sports",
    slug: "sports",
    image: "/categories/sports.jpg",
    description: "Training gear for active routines.",
    size: "small" as const,
  },
  {
    id: "7",
    name: "Outdoor",
    slug: "outdoor",
    image: "/categories/outdoor.jpg",
    description: "Coolers, lanterns, and camp tables.",
    size: "small" as const,
  },
  {
    id: "8",
    name: "Toys & Family",
    slug: "educational-toys",
    image: "/categories/educational-toys.jpg",
    description: "STEM kits and creative playsets.",
    size: "small" as const,
  },
];

export const shopByNeed = [
  {
    id: "1",
    title: "Organize Your Home",
    description: "Shelving, benches, and storage that reclaim every corner.",
    image: "/banners/need-organize.jpg",
    href: "/categories/home",
    cta: "Shop Home",
  },
  {
    id: "2",
    title: "Upgrade Your Workspace",
    description: "Stands, shelves, and organizers for focused workdays.",
    image: "/banners/need-workspace.jpg",
    href: "/categories/workspace",
    cta: "Shop Workspace",
  },
  {
    id: "3",
    title: "Refresh Your Kitchen",
    description: "Scales, kettles, and prep tools for smoother cooking.",
    image: "/banners/need-kitchen.jpg",
    href: "/categories/kitchen",
    cta: "Shop Kitchen",
  },
  {
    id: "4",
    title: "Get Outside",
    description: "Coolers, lanterns, and gear ready for weekends outdoors.",
    image: "/banners/need-outdoor.jpg",
    href: "/categories/outdoor",
    cta: "Shop Outdoor",
  },
  {
    id: "5",
    title: "Tech For Everyday",
    description: "Charging stations, hubs, and plugs that simplify devices.",
    image: "/banners/need-tech.jpg",
    href: "/categories/electronics",
    cta: "Shop Tech",
  },
  {
    id: "6",
    title: "Family Favorites",
    description: "STEM kits, nursery organizers, and shared household picks.",
    image: "/banners/need-family.jpg",
    href: "/categories/educational-toys",
    cta: "Shop Family",
  },
];

export const features: Feature[] = [
  {
    id: "1",
    icon: "truck",
    title: "Fast Shipping",
    description: "Free shipping on orders over $75. Delivered in 3–5 business days.",
  },
  {
    id: "2",
    icon: "shield",
    title: "Secure Checkout",
    description: "Your payment information is protected with industry-standard encryption.",
  },
  {
    id: "3",
    icon: "rotate",
    title: "Easy Returns",
    description: "Hassle-free 30-day returns on most items. We make it simple.",
  },
  {
    id: "4",
    icon: "headphones",
    title: "Customer Support",
    description: "Our Houston-based team is available Mon–Fri to help with orders.",
  },
  {
    id: "5",
    icon: "star",
    title: "Trusted Quality",
    description: "Every product is selected for value, durability, and everyday use.",
  },
];

export const dealsEndTime = new Date(Date.now() + 1000 * 60 * 60 * 18).toISOString();

export const homepageDealsSlugs = [
  "modular-wall-shelf-system",
  "glass-meal-prep-system",
  "touchless-foaming-dispenser",
  "usb-c-docking-hub",
  "travel-makeup-train-case",
  "percussion-massage-gun",
  "matte-polarized-sport-sunglasses",
  "low-noise-pet-grooming-kit",
] as const;

export const homepageFeaturedSlugs = [
  "gooseneck-temp-kettle",
  "nine-port-charging-station",
  "trifold-led-vanity-mirror",
  "elevated-pet-feeding-station",
  "rotomolded-cooler-25qt",
  "stem-circuit-lab-kit",
  "rustproof-shower-shelf-tower",
  "precision-kitchen-scale",
] as const;

export const homepageNewArrivalSlugs = [
  "rotating-entryway-valet",
  "portable-fhd-display",
  "rolling-file-caddy",
  "speed-agility-training-kit",
  "stroller-console-organizer",
  "folding-camp-table-organizer",
  "montessori-activity-board",
  "rgb-corner-floor-lamp",
] as const;

export const homepageBestsellerSlugs = [
  "precision-kitchen-scale",
  "conical-burr-coffee-mill",
  "vanity-drawer-organizer-set",
  "foldable-laptop-riser",
  "insulated-sport-bottle-32oz",
  "water-repellent-crossbody-sling",
  "nursery-caddy-organizer",
  "rechargeable-camp-lantern",
] as const;

export const promotionalBanner: PromoBanner = {
  id: "1",
  title: "MAKE EVERYDAY BETTER.",
  description:
    "Smart essentials, practical upgrades and products selected for the way you live.",
  buttonText: "Explore The Collection",
  buttonLink: "/shop",
  image: "/banners/lifestyle.jpg",
};

export const aboutSection = {
  title: "Shopping Made Easy.",
  description:
    "GOULD GROUP ENTERPRISES LLC brings practical products across home, kitchen, tech, outdoor, and family essentials into one bold American marketplace. We focus on value, reliability, and a smooth shopping experience from browsing to checkout.",
  checklist: [
    "Wide selection across 18 departments",
    "Competitive prices on everyday essentials",
    "Fast, reliable shipping nationwide",
    "Dedicated customer support team",
  ],
  buttonText: "Learn More About Us",
  buttonLink: "/about",
  image: "/banners/about.jpg",
};

export const featuredCollection = {
  title: "Popular Right Now",
  description: "Fresh marketplace favorites worth adding to your cart.",
  bannerImage: "/banners/featured.jpg",
  categorySlug: "home",
};

export const bestSellerTabs = [
  { label: "All", slug: "all" },
  { label: "Home", slug: "home" },
  { label: "Kitchen", slug: "kitchen" },
  { label: "Electronics", slug: "electronics" },
  { label: "Beauty", slug: "beauty" },
  { label: "Outdoor", slug: "outdoor" },
];

export const newsletter = {
  title: "Don't Miss What's Next.",
  description:
    "Get new arrivals, exclusive offers and curated product picks delivered to your inbox.",
  placeholder: "Enter your email address",
  buttonText: "Subscribe",
};

export const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];
