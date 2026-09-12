import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/github-icon";
import { hero } from "@/lib/content";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-44 h-80 bg-primary/15 blur-3xl"
      />
      <div className="relative mx-auto w-full max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
        <Badge variant="outline" className="font-mono text-[11px]">
          {hero.badge}
        </Badge>
        <h1 className="mt-6 font-heading text-4xl font-semibold tracking-tight sm:text-6xl">
          <span className="font-mono text-primary">{site.name}</span>
          <span className="mt-2 block">{hero.title}</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {hero.subtitle}
        </p>

        <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex flex-col gap-1.5">
            <Button size="lg" disabled aria-disabled="true">
              {hero.primaryCta}
            </Button>
            <span className="font-mono text-[11px] text-muted-foreground">
              {hero.primaryCtaHint}
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            <Button size="lg" variant="outline" asChild>
              <a
                href={site.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                <GithubIcon className="size-4" />
                {hero.secondaryCta}
              </a>
            </Button>
            <span className="font-mono text-[11px] text-muted-foreground">
              {hero.secondaryCtaHint}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
