import Link from "next/link";
import Image from "next/image";
import { Globe, Share2, Users } from "lucide-react";
import { company } from "@/data/company";
import { footerLinks, paymentMethods } from "@/data/navigation";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const addressLine = company.address.suite
    ? `${company.address.street}\n${company.address.suite}`
    : company.address.street;

  return (
    <footer className="bg-dark text-white">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Image
              src="/logo/logo.svg"
              alt={company.name}
              width={220}
              height={44}
              className="mb-4 h-11 w-auto brightness-0 invert"
            />
            <p className="text-sm leading-relaxed text-white/65">{company.tagline}</p>
            <div className="mt-4 flex gap-3">
              <a href={company.social.instagram} className="text-white/60 transition-colors hover:text-accent" aria-label="Instagram">
                <Share2 className="h-5 w-5" />
              </a>
              <a href={company.social.facebook} className="text-white/60 transition-colors hover:text-accent" aria-label="Facebook">
                <Users className="h-5 w-5" />
              </a>
              <a href={company.social.twitter} className="text-white/60 transition-colors hover:text-accent" aria-label="Twitter">
                <Globe className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Shop</h3>
            <ul className="space-y-2.5">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/65 transition-colors hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Company</h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/65 transition-colors hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Customer Support</h3>
            <ul className="space-y-2.5">
              {footerLinks.customerSupport.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/65 transition-colors hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mb-4 mt-8 text-sm font-bold uppercase tracking-wider text-white">Policies</h3>
            <ul className="space-y-2.5">
              {footerLinks.policies.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/65 transition-colors hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Contact</h3>
            <ul className="space-y-2.5 text-sm text-white/65">
              <li className="font-semibold text-white">{company.name}</li>
              <li className="whitespace-pre-line">
                {addressLine}
                {"\n"}
                {company.address.city}, {company.address.state} {company.address.zip}
              </li>
              <li>
                <a href={`mailto:${company.email}`} className="transition-colors hover:text-accent">
                  {company.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <Separator className="bg-white/10" />

      <Container className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
        <p className="text-sm text-white/50">{company.copyright}</p>
        <div className="flex items-center gap-2">
          {paymentMethods.map((method) => (
            <Image
              key={method.name}
              src={method.icon}
              alt={method.name}
              width={40}
              height={28}
              className="rounded bg-white/90 p-0.5"
            />
          ))}
        </div>
      </Container>
    </footer>
  );
}
