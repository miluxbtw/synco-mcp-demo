import { Eye, Network, Share2 } from "lucide-react";
import { cn } from "cn";

import { Hero } from "@/components/hero";
import { Section, SectionHeading } from "@/components/section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  audience,
  problems,
  solution,
  values,
  whatItIs,
} from "@/lib/content";

const valueIcons = [Eye, Network, Share2];

const problemCardStyles =
  "flex h-full flex-col gap-3 rounded-2xl border border-border bg-white/[0.02] p-6 shadow-[0_0_0_1px_rgb(255_255_255/0.03),0_8px_32px_rgb(0_0_0/0.4)]";

export default function Home() {
  const listedProblems = problems.items.slice(0, -1);
  const closingProblem = problems.items[problems.items.length - 1];
  const capabilities = solution.capabilities;

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />

        {/* What it is — prose beside the three highlights */}
        <Section id="what-it-is">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
            <div className="flex flex-1 flex-col gap-6">
              <SectionHeading
                eyebrow={whatItIs.eyebrow}
                title={whatItIs.title}
                titleClassName="max-w-[620px]"
              />
              <div className="flex max-w-[620px] flex-col gap-4">
                {whatItIs.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-base leading-[1.7] text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <ul className="flex shrink-0 flex-col lg:w-[440px]">
              {whatItIs.highlights.map((highlight, index) => (
                <li
                  key={highlight.title}
                  className={cn(
                    "flex flex-col gap-2 py-5.5",
                    index === 0 && "pt-0 lg:pt-0",
                    index < whatItIs.highlights.length - 1 &&
                      "border-b border-border",
                    index === whatItIs.highlights.length - 1 && "pb-0",
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      aria-hidden="true"
                      className="size-[5px] shrink-0 rounded-full bg-primary"
                    />
                    <span className="text-[15px] font-medium">
                      {highlight.title}
                    </span>
                  </div>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">
                    {highlight.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* The seven problems — pain only, one uniform card treatment */}
        <Section id="problems">
          <SectionHeading
            eyebrow={problems.eyebrow}
            title={problems.title}
            description={problems.description}
            className="max-w-[700px]"
          />

          <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {listedProblems.map((item) => (
              <li
                key={item.index}
                className={cn(
                  problemCardStyles,
                  "sm:min-h-[236px] lg:min-h-[212px]",
                )}
              >
                <span className="font-mono text-xs tracking-[0.14em] text-primary">
                  {item.index}
                </span>
                <h3 className="text-[19px] font-semibold tracking-[-0.01em]">
                  {item.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground">
                  {item.problem}
                </p>
              </li>
            ))}

            {/* The seventh card closes the row full-width, so no orphan tail */}
            <li
              className={cn(
                problemCardStyles,
                "gap-6 sm:col-span-2 lg:col-span-3 lg:flex-row lg:items-start lg:gap-10",
              )}
            >
              <div className="flex flex-col gap-3 lg:w-[380px] lg:shrink-0">
                <span className="font-mono text-xs tracking-[0.14em] text-primary">
                  {closingProblem.index}
                </span>
                <h3 className="text-[19px] font-semibold tracking-[-0.01em]">
                  {closingProblem.title}
                </h3>
              </div>
              <p className="flex-1 text-[15px] leading-relaxed text-muted-foreground">
                {closingProblem.problem}
              </p>
            </li>
          </ul>
        </Section>

        {/* The answer to all seven, written once */}
        <Section id="solution" className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-75 right-20 h-[520px] w-[720px] rounded-full bg-primary/[0.06] blur-[150px]"
          />
          <div className="relative flex flex-col gap-12 lg:flex-row lg:gap-20">
            <div className="flex flex-col gap-4 lg:w-[400px] lg:shrink-0">
              <SectionHeading title={solution.title} />
              <p className="text-base leading-[1.7] text-muted-foreground">
                {solution.lead}
              </p>
              <p className="mt-3 border-t border-border pt-5 text-sm leading-relaxed text-muted-foreground">
                {solution.caveat}
              </p>
            </div>

            <div className="flex-1 overflow-hidden rounded-2xl border border-border bg-card shadow-[0_0_0_1px_rgb(255_255_255/0.04),0_14px_48px_rgb(0_0_0/0.5)]">
              <div
                aria-hidden="true"
                className="h-0.5 w-full bg-gradient-to-r from-primary to-primary/5"
              />
              <dl className="flex flex-col px-6 py-1.5 sm:px-7">
                {capabilities.map((capability, index) => (
                  <div
                    key={capability.label}
                    className={cn(
                      "flex flex-col gap-2 py-4.5 sm:flex-row sm:items-start sm:gap-7",
                      index < capabilities.length - 1 &&
                        "border-b border-white/[0.06]",
                    )}
                  >
                    <dt className="flex items-start gap-2.5 sm:w-[210px] sm:shrink-0">
                      <span
                        aria-hidden="true"
                        className="mt-[9px] size-1.5 shrink-0 rounded-full bg-primary"
                      />
                      <span className="text-[15px] font-medium">
                        {capability.label}
                      </span>
                    </dt>
                    <dd className="flex-1 text-[15px] leading-relaxed text-muted-foreground">
                      {capability.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Section>

        {/* Value — three columns split by hairlines */}
        <Section id="values" className="bg-background-raised">
          <SectionHeading
            title={values.title}
            description={values.description}
            className="max-w-[680px]"
          />

          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-0">
            {values.items.map((value, index) => {
              const Icon = valueIcons[index];
              return (
                <div
                  key={value.title}
                  className={cn(
                    "flex flex-col gap-3.5",
                    index === 0 && "md:pr-10",
                    index === 1 && "md:border-l md:border-border md:px-10",
                    index === 2 && "md:border-l md:border-border md:pl-10",
                  )}
                >
                  <span className="flex size-[38px] shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/[0.09]">
                    <Icon className="size-[17px] text-primary" />
                  </span>
                  <h3 className="text-xl font-semibold tracking-[-0.01em]">
                    {value.title}
                  </h3>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Section>

        {/* Who it's for */}
        <Section id="audience">
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-20">
            <SectionHeading
              eyebrow={audience.eyebrow}
              title={audience.title}
              className="lg:w-[420px] lg:shrink-0"
              titleClassName="text-[26px] sm:text-[30px] lg:text-[32px] lg:leading-[1.2]"
            />
            <ul className="flex flex-1 flex-col gap-4.5">
              {audience.items.map((item) => (
                <li key={item} className="flex items-start gap-3.5">
                  <span
                    aria-hidden="true"
                    className="mt-[9px] size-[7px] shrink-0 rounded-[2px] bg-primary"
                  />
                  <span className="text-base leading-relaxed sm:text-[17px]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
