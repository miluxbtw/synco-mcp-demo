"use client";

import { useEffect, useRef } from "react";
import { cn } from "cn";

import { prefersReducedMotion } from "@/lib/motion";

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.dataset.revealed = "true";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.revealed = "true";
          delete el.dataset.revealPending;
          observer.disconnect();
          return;
        }

        if (!el.dataset.revealed) {
          el.dataset.revealPending = "";
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      className={cn("section-reveal border-b border-border", className)}
    >
      <div className="mx-auto w-full max-w-[1280px] px-5 py-24 sm:px-8 sm:py-32 lg:px-10 lg:py-40">
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  titleClassName,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {eyebrow && (
        <span className="font-mono text-xs tracking-[0.16em] text-primary uppercase">
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "text-[30px] font-semibold tracking-[-0.025em] sm:text-[38px] lg:text-[44px] lg:leading-[1.1]",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="max-w-[520px] text-[17px] leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
