import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/github-icon";
import { StatusLamp } from "@/components/status-lamp";
import { hero, nav } from "@/lib/content";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-[1280px] items-center gap-6 px-5 sm:px-8 lg:gap-10 lg:px-10">
        <a
          href="#top"
          className="flex shrink-0 items-center gap-2.5 font-mono text-base font-medium tracking-tight"
        >
          <StatusLamp />
          {site.name}
        </a>

        <nav className="hidden flex-1 items-center gap-8 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <Button
          variant="outline"
          asChild
          className="ml-auto h-[38px] shrink-0 gap-2 border-border-strong bg-white/[0.04] px-3.5 text-[13px] shadow-[inset_0_1px_0_0_rgb(255_255_255/0.06)] md:ml-0 dark:bg-white/[0.04] dark:hover:bg-white/[0.07]"
        >
          <a href={site.githubUrl} target="_blank" rel="noreferrer noopener">
            <GithubIcon className="size-[15px]" />
            <span className="hidden sm:inline">{hero.secondaryCta}</span>
            <span className="sm:hidden">GitHub</span>
          </a>
        </Button>
      </div>
    </header>
  );
}
