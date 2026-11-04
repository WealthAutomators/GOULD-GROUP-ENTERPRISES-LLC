"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Menu, ShoppingBag, User, X } from "lucide-react";
import { company } from "@/data/company";
import { navigationLinks } from "@/data/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

/**
 * Standalone fallback header (logo + nav + icons in a single row).
 * The primary desktop chrome now lives in `site-header.tsx`, which is
 * self-contained and does not use this component. Kept for any legacy
 * imports so nothing breaks.
 */
export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { itemCount } = useCart();
  const { wishlist } = useWishlist();

  return (
    <header className="border-b border-border bg-white">
      <Container>
        <div className="flex h-14 items-center gap-4 lg:h-16">
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/logo/logo.svg"
              alt={company.name}
              width={220}
              height={44}
              priority
              className="h-10 w-auto sm:h-11 lg:h-12"
            />
          </Link>

          <nav className="hidden flex-1 justify-center lg:flex">
            <ul className="flex items-center gap-0.5">
              {navigationLinks.map((link) => (
                <li
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className="rounded-lg px-3 py-2 text-sm font-bold text-foreground/85 transition-colors hover:bg-soft-section hover:text-secondary"
                  >
                    {link.label}
                  </Link>
                  {link.children && activeDropdown === link.label && (
                    <div className="absolute left-0 top-full z-50 mt-1 min-w-[210px] rounded-xl border border-border bg-white py-1.5 shadow-lg">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-3 py-2 text-sm text-foreground hover:bg-soft-section hover:text-secondary"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-0.5 sm:gap-1">
            <Button variant="ghost" size="icon" asChild className="hidden sm:inline-flex relative h-9 w-9">
              <Link href="/wishlist" aria-label="Wishlist">
                <Heart className="h-[18px] w-[18px]" />
                {wishlist.length > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                    {wishlist.length}
                  </span>
                )}
              </Link>
            </Button>

            <Button variant="ghost" size="icon" asChild className="hidden sm:inline-flex h-9 w-9">
              <Link href="/profile" aria-label="Log in">
                <User className="h-[18px] w-[18px]" />
              </Link>
            </Button>

            <Button variant="ghost" size="icon" asChild className="relative h-9 w-9">
              <Link href="/cart" aria-label="Cart">
                <ShoppingBag className="h-[18px] w-[18px]" />
                {itemCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-white">
                    {itemCount}
                  </span>
                )}
              </Link>
            </Button>

            <Button variant="ghost" size="icon" className="h-9 w-9 lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
            </Button>
          </div>
        </div>
      </Container>

      {mobileOpen && (
        <div className="border-t border-border bg-white lg:hidden">
          <Container className="py-3">
            <ul className="space-y-0.5">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-lg px-3 py-2 text-sm font-bold hover:bg-soft-section hover:text-secondary"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <ul className="ml-3 mt-0.5 space-y-0.5 border-l border-border pl-3">
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block rounded-lg px-3 py-1.5 text-sm text-muted-foreground hover:bg-soft-section hover:text-secondary"
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              <li data-mobile-extra className="mt-2 flex gap-2 border-t border-border pt-3 sm:hidden">
                <Link href="/wishlist" onClick={() => setMobileOpen(false)} className="flex-1 rounded-md border border-border px-3 py-2 text-center text-sm font-medium hover:bg-muted">Wishlist</Link>
                <Link href="/profile" onClick={() => setMobileOpen(false)} className="flex-1 rounded-md border border-border px-3 py-2 text-center text-sm font-medium hover:bg-muted">Account</Link>
              </li>
            </ul>
          </Container>
        </div>
      )}
    </header>
  );
}
