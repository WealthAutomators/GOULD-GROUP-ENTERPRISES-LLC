import { NavLink } from "@/types";
import { categories } from "./categories";

export const categoryNavLinks: NavLink[] = [
  { label: "Shop", href: "/shop" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Home", href: "/categories/home" },
  { label: "Electronics", href: "/categories/electronics" },
  { label: "Kitchen", href: "/categories/kitchen" },
  { label: "Office", href: "/categories/office" },
  { label: "Beauty", href: "/categories/beauty" },
  { label: "Outdoor", href: "/categories/outdoor" },
  { label: "Deals", href: "/shop?sale=true" },
];

export const navigationLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  {
    label: "Categories",
    href: "/categories",
    children: categories.map((c) => ({
      label: c.name,
      href: `/categories/${c.slug}`,
    })),
  },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Best Sellers", href: "/best-sellers" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerLinks = {
  shop: [
    { label: "Shop All", href: "/shop" },
    { label: "New Arrivals", href: "/new-arrivals" },
    { label: "Best Sellers", href: "/best-sellers" },
    { label: "Deals", href: "/shop?sale=true" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Careers", href: "/contact" },
    { label: "FAQs", href: "/faq" },
  ],
  customerSupport: [
    { label: "Track Order", href: "/track-order" },
    { label: "Returns", href: "/returns" },
    { label: "Shipping Policy", href: "/shipping" },
    { label: "Support", href: "/contact" },
  ],
  policies: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Refund Policy", href: "/refund" },
  ],
};

export const paymentMethods = [
  { name: "Visa", icon: "/payments/visa.svg" },
  { name: "Mastercard", icon: "/payments/mastercard.svg" },
  { name: "Amex", icon: "/payments/amex.svg" },
  { name: "PayPal", icon: "/payments/paypal.svg" },
  { name: "Apple Pay", icon: "/payments/apple-pay.svg" },
];
