import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  viewMoreLink?: string;
  viewMoreText?: string;
  className?: string;
  centered?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  viewMoreLink,
  viewMoreText = "View More",
  className,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between",
        centered && "text-center sm:flex-col sm:items-center",
        className
      )}
    >
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">{title}</h2>
        {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
      </div>
      {viewMoreLink && (
        <Button variant="link" asChild className="text-sm font-medium">
          <Link href={viewMoreLink}>{viewMoreText} →</Link>
        </Button>
      )}
    </div>
  );
}
