import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/github-icon";
import { site } from "@/lib/site";

const nav = [
  { href: "#what-it-is", label: "What it is" },
  { href: "#problems", label: "Problems" },
  { href: "#values", label: "Value" },
  { href: "#audience", label: "Who it's for" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#top" className="font-mono text-sm font-medium tracking-tight">
          <span className="text-primary">{site.name}</span>
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Button key={item.href} variant="ghost" size="sm" asChild>
              <a href={item.href}>{item.label}</a>
            </Button>
          ))}
        </nav>
        <Button variant="outline" size="sm" asChild>
          <a href={site.githubUrl} target="_blank" rel="noreferrer noopener">
            <GithubIcon className="size-4" />
            <span className="hidden sm:inline">Self-host on GitHub</span>
            <span className="sm:hidden">GitHub</span>
          </a>
        </Button>
      </div>
    </header>
  );
}
