import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { audience, problems, values, whatItIs } from "@/lib/content";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />

        <Section
          id="what-it-is"
          eyebrow={whatItIs.eyebrow}
          title={whatItIs.title}
        >
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div className="space-y-4">
              {whatItIs.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-relaxed text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <ul className="space-y-3">
              {whatItIs.highlights.map((highlight) => (
                <li
                  key={highlight.title}
                  className="rounded-lg border border-border/60 bg-card/40 p-4"
                >
                  <p className="text-sm font-medium">{highlight.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {highlight.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Section
          id="problems"
          eyebrow={problems.eyebrow}
          title={problems.title}
          description={problems.description}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {problems.items.map((item, index) => (
              <Card key={item.title} className="h-full">
                <CardHeader>
                  <Badge
                    variant="secondary"
                    className="mb-1 font-mono text-[11px]"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </Badge>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription className="leading-relaxed">
                    {item.problem}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-primary">
                    How synco-mcp solves it
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {item.solutions.map((solution) => (
                      <li
                        key={solution}
                        className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span aria-hidden="true" className="text-primary">
                          —
                        </span>
                        <span>{solution}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        <Section
          id="values"
          eyebrow={values.eyebrow}
          title={values.title}
          description={values.description}
        >
          <div className="grid gap-4 md:grid-cols-3">
            {values.items.map((value, index) => (
              <div
                key={value.title}
                className="rounded-xl border border-border/60 bg-card/40 p-6"
              >
                <span className="font-mono text-xs text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-heading text-lg font-medium">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="audience" eyebrow={audience.eyebrow} title={audience.title}>
          <ul className="grid gap-3 sm:grid-cols-2">
            {audience.items.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-lg border border-border/60 bg-card/40 px-4 py-3 text-sm leading-relaxed"
              >
                <span aria-hidden="true" className="text-primary">
                  ▸
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
