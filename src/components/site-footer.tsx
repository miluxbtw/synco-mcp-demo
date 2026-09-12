import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/github-icon";
import { footer, hero } from "@/lib/content";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-card/30">
      <div className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-md">
            <p className="font-mono text-sm font-medium text-primary">
              {site.name}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {footer.description}
            </p>
          </div>
          <div className="flex flex-col items-start gap-3">
            <Button variant="outline" size="sm" asChild>
              <a
                href={site.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                <GithubIcon className="size-4" />
                {hero.secondaryCta}
              </a>
            </Button>
            <Button size="sm" disabled aria-disabled="true">
              {hero.primaryCta} — {hero.primaryCtaHint.toLowerCase()}
            </Button>
          </div>
        </div>
        <p className="mt-10 text-xs leading-relaxed text-muted-foreground">
          {footer.disclaimer}
        </p>
      </div>
    </footer>
  );
}
