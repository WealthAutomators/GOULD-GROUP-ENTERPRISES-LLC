import { testimonials } from "@/data/testimonials";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StarRating } from "@/components/ui/star-rating";
import { BadgeCheck } from "lucide-react";

export function CustomerReviews() {
  return (
    <section className="bg-soft-section py-12 md:py-16">
      <Container>
        <SectionHeading
          title="Customer Reviews"
          subtitle="Real feedback from shoppers across the Gould Group marketplace."
          centered
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {testimonials.slice(0, 8).map((t) => (
            <div
              key={t.id}
              className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-2">
                <StarRating rating={t.rating} showCount={false} size="sm" />
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-secondary">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  Verified
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/80">&ldquo;{t.text}&rdquo;</p>
              <p className="mt-4 text-sm font-bold">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.location}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
