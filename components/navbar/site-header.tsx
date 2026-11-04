"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Menu, ShoppingBag, User, X } from "lucide-react";
import { company } from "@/data/company";
import { categoryNavLinks, navigationLinks } from "@/data/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { AnnouncementBar } from "@/components/navbar/announcement-bar";
import { SearchBar } from "@/components/navbar/search-bar";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { itemCount } = useCart();
  const { wishlist } = useWishlist();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="sticky top-0 z-50">
      <AnnouncementBar />

      <div className={cn("bg-white transition-shadow duration-200", scrolled && "shadow-md")}>
        <Container>
          <div className="flex items-center gap-4 py-3 lg:gap-8 lg:py-4">
            <Link href="/" className="flex shrink-0 items-center">
              <Image
                src="/logo/logo.svg"
                alt={company.name}
                width={220}
                height={44}
                priority
                className="h-9 w-auto sm:h-10 lg:h-11"
              />
            </Link>

            <div className="hidden min-w-0 flex-1 md:flex md:justify-center">
              <div className="w-full max-w-2xl">
                <SearchBar variant="inline" />
              </div>
            </div>

            <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
              <Button variant="ghost" size="icon" asChild className="hidden sm:inline-flex relative h-10 w-10">
                <Link href="/wishlist" aria-label="Wishlist">
                  <Heart className="h-[18px] w-[18px]" />
                  {wishlist.length > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                      {wishlist.length}
                    </span>
                  )}
                </Link>
              </Button>

              <Button variant="ghost" size="icon" asChild className="hidden sm:inline-flex h-10 w-10">
                <Link href="/profile" aria-label="Account">
                  <User className="h-[18px] w-[18px]" />
                </Link>
              </Button>

              <Button variant="ghost" size="icon" asChild className="relative h-10 w-10">
                <Link href="/cart" aria-label="Cart">
                  <ShoppingBag className="h-[18px] w-[18px]" />
                  {itemCount > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-white">
                      {itemCount}
                    </span>
                  )}
                </Link>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 lg:hidden"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
              </Button>
            </div>
          </div>

          <div className="pb-3 md:hidden">
            <SearchBar variant="inline" />
          </div>
        </Container>

        <nav className="hidden border-t border-border bg-white lg:block">
          <Container>
            <ul className="flex items-center justify-center gap-1 py-2.5">
              {categoryNavLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="inline-flex rounded-md px-3.5 py-2 text-sm font-bold uppercase tracking-wide text-foreground/85 transition-colors hover:bg-soft-section hover:text-secondary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </nav>
      </div>

      {mobileOpen && (
        <div className="max-h-[calc(100vh-3rem)] overflow-y-auto border-t border-border bg-white lg:hidden">
          <Container className="py-4">
            <p className="mb-2 px-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Shop by Category
            </p>
            <ul className="space-y-0.5">
              {categoryNavLinks.map((link) => (
                <li key={`m-${link.href}-${link.label}`}>
                  <Link
                    href={link.href}
                    className="block rounded-md px-3 py-2.5 text-sm font-bold text-foreground transition-colors hover:bg-soft-section hover:text-secondary"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
                          <li data-mobile-extra className="sm:hidden"><Link href="/wishlist" className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground" onClick={() => setMobileOpen(false)}>Wishlist</Link></li>
              <li data-mobile-extra className="sm:hidden"><Link href="/profile" className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground" onClick={() => setMobileOpen(false)}>Account</Link></li>
            </ul>
            <div className="my-3 border-t border-border" />
            <ul className="space-y-0.5">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-soft-section hover:text-foreground"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </div>
      )}
    </div>
  );
}
