import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CoordinationDiagram } from "@/components/coordination-diagram";
import { GithubIcon } from "@/components/github-icon";
import { hero } from "@/lib/content";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-border"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-60 -left-44 h-[580px] w-[860px] rounded-full bg-primary/[0.08] blur-[150px]"
      />

      <div className="relative mx-auto flex w-full max-w-[1280px] flex-col items-start gap-12 px-5 pt-5 pb-20 sm:px-8 sm:pt-8 sm:pb-24 lg:flex-row lg:items-center lg:gap-18 lg:px-10 lg:pt-10 lg:pb-28">
        <div className="flex flex-1 flex-col gap-6">
          <Badge
            variant="outline"
            className="h-auto border-primary/30 bg-primary/[0.07] px-3.5 py-1.5 font-mono text-xs tracking-[0.04em] text-primary-soft"
          >
            {hero.badge}
          </Badge>

          <div className="flex flex-col gap-4">
            <span className="font-mono text-xl font-medium tracking-tight text-primary">
              {site.name}
            </span>
            <h1 className="max-w-[720px] text-4xl font-semibold tracking-[-0.03em] sm:text-5xl lg:text-[58px] lg:leading-[1.05]">
              {hero.title}
            </h1>
          </div>

          <p className="max-w-[580px] text-base leading-relaxed text-muted-foreground sm:text-[17px]">
            {hero.subtitle}
          </p>

          <div className="flex flex-col gap-4 pt-1.5 sm:flex-row sm:items-start">
            <div className="flex flex-col gap-2.5">
              <Button
                asChild
                className="h-12 gap-2.5 rounded-[10px] px-5.5 text-[15px] font-semibold shadow-[0_0_0_1px_rgb(255_176_32/0.5),0_6px_24px_rgb(255_176_32/0.22),inset_0_1px_0_0_rgb(255_255_255/0.3)]"
              >
                <a
                  href={site.githubUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <GithubIcon className="size-[17px]" />
                  {hero.secondaryCta}
                </a>
              </Button>
              <span className="text-[13px] text-muted-foreground">
                {hero.secondaryCtaHint}
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              <Button
                disabled
                aria-disabled="true"
                variant="outline"
                className="h-12 cursor-not-allowed rounded-[10px] border-border-strong bg-white/[0.03] px-5.5 text-[15px] text-subtle-foreground opacity-100 dark:bg-white/[0.03]"
              >
                {hero.primaryCta}
              </Button>
              <span className="text-[13px] text-muted-foreground">
                {hero.primaryCtaHint}
              </span>
            </div>
          </div>
        </div>

        <CoordinationDiagram />
      </div>
    </section>
  );
}
