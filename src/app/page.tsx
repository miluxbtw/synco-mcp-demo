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

export default function Home() {
  const capabilities = solution.capabilities;

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />

        {/* What it is — short prose beside three one-line highlights */}
        <Section id="what-it-is">
          <div className="flex flex-col gap-14 lg:flex-row lg:gap-24">
            <div className="flex flex-1 flex-col gap-7">
              <SectionHeading
                eyebrow={whatItIs.eyebrow}
                title={whatItIs.title}
                titleClassName="max-w-[600px]"
              />
              <div className="flex max-w-[600px] flex-col gap-5">
                {whatItIs.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-[17px] leading-[1.7] text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <ul className="flex shrink-0 flex-col lg:w-[400px]">
              {whatItIs.highlights.map((highlight, index) => (
                <li
                  key={highlight.title}
                  className={cn(
                    "flex flex-col gap-1.5 py-6",
                    index === 0 && "pt-0",
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
                    <span className="text-base font-medium">
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

        {/* Six problems — pain only, one uniform card, clean 3x2 grid */}
        <Section id="problems">
          <SectionHeading
            eyebrow={problems.eyebrow}
            title={problems.title}
            description={problems.description}
            titleClassName="max-w-[640px]"
          />

          <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {problems.items.map((item) => (
              <li
                key={item.index}
                className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-white/[0.02] p-7 shadow-[0_0_0_1px_rgb(255_255_255/0.03),0_8px_32px_rgb(0_0_0/0.4)]"
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
          </ul>
        </Section>

        {/* The answer to all six, stated once — one panel, not a card grid */}
        <Section id="solution" className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-75 right-20 h-[520px] w-[720px] rounded-full bg-primary/[0.06] blur-[150px]"
          />
          <div className="relative flex flex-col gap-14 lg:flex-row lg:gap-24">
            <div className="flex flex-col gap-6 lg:w-[400px] lg:shrink-0">
              <SectionHeading
                eyebrow={solution.eyebrow}
                title={solution.title}
                description={solution.lead}
              />
              <p className="border-t border-border pt-6 text-sm leading-relaxed text-subtle-foreground">
                {solution.caveat}
              </p>
            </div>

            <div className="flex-1 overflow-hidden rounded-2xl border border-border bg-card shadow-[0_0_0_1px_rgb(255_255_255/0.04),0_14px_48px_rgb(0_0_0/0.5)]">
              <div
                aria-hidden="true"
                className="h-0.5 w-full bg-gradient-to-r from-primary to-primary/5"
              />
              <dl className="grid sm:grid-cols-2">
                {capabilities.map((capability, index) => (
                  <div
                    key={capability.label}
                    className={cn(
                      "flex flex-col gap-2 p-7",
                      index > 0 && "border-t border-white/[0.06]",
                      index === 1 && "sm:border-t-0",
                      index % 2 === 0 && "sm:border-r sm:border-white/[0.06]",
                    )}
                  >
                    <dt className="flex items-center gap-2.5">
                      <span
                        aria-hidden="true"
                        className="size-1.5 shrink-0 rounded-full bg-primary"
                      />
                      <span className="text-base font-medium">
                        {capability.label}
                      </span>
                    </dt>
                    <dd className="text-[15px] leading-relaxed text-muted-foreground">
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
            titleClassName="max-w-[620px]"
          />

          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-0">
            {values.items.map((value, index) => {
              const Icon = valueIcons[index];
              return (
                <div
                  key={value.title}
                  className={cn(
                    "flex flex-col gap-3.5",
                    index === 0 && "md:pr-12",
                    index === 1 && "md:border-l md:border-border md:px-12",
                    index === 2 && "md:border-l md:border-border md:pl-12",
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

        {/* Who it's for — two short columns, not a bullet wall */}
        <Section id="audience">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-24">
            <SectionHeading
              eyebrow={audience.eyebrow}
              title={audience.title}
              className="lg:w-[400px] lg:shrink-0"
              titleClassName="text-[26px] sm:text-[32px] lg:text-[34px] lg:leading-[1.2]"
            />
            <ul className="grid flex-1 gap-x-12 gap-y-5 sm:grid-cols-2">
              {audience.items.map((item) => (
                <li key={item} className="flex items-start gap-3.5">
                  <span
                    aria-hidden="true"
                    className="mt-[9px] size-[7px] shrink-0 rounded-[2px] bg-primary"
                  />
                  <span className="text-base leading-relaxed">{item}</span>
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
