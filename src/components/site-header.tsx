"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type MouseEvent } from "react";

import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/github-icon";
import { StatusLamp } from "@/components/status-lamp";
import { hero, nav } from "@/lib/content";
import { scrollBehavior } from "@/lib/motion";
import { site } from "@/lib/site";

function scrollToDocumentTop(event: MouseEvent<HTMLAnchorElement>) {
  if (
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  event.preventDefault();
  window.scrollTo({ top: 0, behavior: scrollBehavior() });
}

export function SiteHeader() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const progress = progressRef.current;
    if (!header || !progress) return;

    let planted = false;

    const update = () => {
      const y = window.scrollY;
      const next = y > 8;
      if (next !== planted) {
        planted = next;
        header.toggleAttribute("data-scrolled", next);
      }

      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, y / max) : 0;
      progress.style.transform = `scaleX(${ratio})`;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="site-header relative sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-sm"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden"
      >
        <div
          ref={progressRef}
          className="h-full origin-left bg-primary/65"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
      <div className="relative mx-auto flex h-14 w-full max-w-[1280px] items-center gap-6 px-5 sm:px-8 lg:gap-10 lg:px-10">
        <Link
          href="/"
          onClick={pathname === "/" ? scrollToDocumentTop : undefined}
          className="group flex shrink-0 items-center gap-2.5 font-mono text-base font-medium tracking-tight"
        >
          <StatusLamp className="transition-shadow duration-200 ease-out group-hover:shadow-[0_0_16px_3px_rgb(255_176_32/0.62)] group-focus-visible:shadow-[0_0_16px_3px_rgb(255_176_32/0.62)]" />
          {site.name}
        </Link>

        <nav className="hidden flex-1 items-center gap-8 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors duration-200 ease-out hover:text-foreground focus-visible:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2 md:ml-0">
          <Button
            asChild
            className="h-[38px] px-3.5 text-[13px] font-semibold"
          >
            <Link href="/desk">{hero.primaryCta}</Link>
          </Button>
          <Button
            variant="outline"
            asChild
            className="h-[38px] gap-2 border-border-strong bg-white/[0.04] px-3.5 text-[13px] shadow-[inset_0_1px_0_0_rgb(255_255_255/0.06)] dark:bg-white/[0.04] dark:hover:bg-white/[0.07]"
          >
            <a href={site.githubUrl} target="_blank" rel="noreferrer noopener">
              <GithubIcon className="size-[15px]" />
              <span className="hidden sm:inline">{hero.secondaryCta}</span>
              <span className="sm:hidden">GitHub</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
