import Link from "next/link";
import { announcement } from "@/data/homepage";
import { Container } from "@/components/ui/container";

export function AnnouncementBar() {
  return (
    <div className="bg-primary text-white">
      <Container className="flex h-9 items-center justify-center gap-3 text-[12px] font-medium tracking-wide sm:justify-between">
        <p className="min-w-0 flex-1 truncate text-center sm:flex-none sm:text-left">{announcement.text}</p>
        <Link
          href={announcement.ctaLink}
          className="shrink-0 font-bold text-white transition-colors hover:text-accent"
        >
          {announcement.ctaText}
        </Link>
      </Container>
    </div>
  );
}
