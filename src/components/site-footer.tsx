import { GithubIcon } from "@/components/github-icon";
import { StatusLamp } from "@/components/status-lamp";
import { footer, hero, nav } from "@/lib/content";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-background-deep">
      <div className="mx-auto w-full max-w-[1280px] px-5 py-14 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-20">
          <div className="max-w-[420px]">
            <div className="flex items-center gap-2.5">
              <StatusLamp />
              <span className="font-mono text-[15px] font-medium tracking-tight">
                {site.name}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {footer.description}
            </p>
          </div>

          <div className="flex flex-col gap-10 sm:flex-row sm:gap-16 lg:gap-20">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-subtle-foreground">
                {footer.pageLinksLabel}
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors duration-200 ease-out hover:text-foreground focus-visible:text-foreground"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-subtle-foreground">
                {footer.sourceLabel}
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                <li>
                  <a
                    href={site.githubUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <GithubIcon className="size-4" />
                    {hero.secondaryCta}
                  </a>
                </li>
                <li>
                  <a
                    href={footer.connectHref}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {footer.connectLabel}
                  </a>
                </li>
                <li>
                  <a
                    href={footer.startNowHref}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span
                      aria-hidden="true"
                      className="size-1.5 rounded-full bg-primary"
                    />
                    {footer.startNowStatus}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-14 border-t border-border pt-6 text-xs leading-relaxed text-subtle-foreground">
          {footer.disclaimer}
        </p>
      </div>
    </footer>
  );
}
