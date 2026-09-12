import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { connect } from "@/lib/content";
import { CONVEX_SITE_URL } from "@/lib/convex";

export const metadata: Metadata = {
  title: "Connect MCP — synco-mcp",
  description:
    "Two actions to connect an MCP client: get a key on the desk, then paste it into Cursor.",
};

const mcpUrl = `${CONVEX_SITE_URL || "https://little-raven-61.eu-west-1.convex.site"}/mcp`;

const snippet = `{
  "mcpServers": {
    "synco-mcp": {
      "url": "${mcpUrl}",
      "headers": {
        "Authorization": "Bearer <key from Agent keys>"
      }
    }
  }
}`;

export default function ConnectPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-border">
          <div className="mx-auto w-full max-w-[1280px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
            <p className="font-mono text-xs tracking-[0.16em] text-primary uppercase">
              {connect.eyebrow}
            </p>
            <h1 className="mt-4 max-w-[720px] text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
              {connect.title}
            </h1>
            <p className="mt-5 max-w-[580px] text-base leading-relaxed text-muted-foreground sm:text-[17px]">
              {connect.lead}
            </p>

            <ol className="mt-14 grid gap-5 lg:grid-cols-2">
              {connect.steps.map((step) => (
                <li
                  key={step.index}
                  className="flex flex-col rounded-2xl border border-border bg-card p-7 shadow-[0_0_0_1px_rgb(255_255_255/0.03),0_8px_32px_rgb(0_0_0/0.4)]"
                >
                  <span className="font-mono text-xs tracking-[0.14em] text-primary">
                    {step.index}
                  </span>
                  <h2 className="mt-3 text-[22px] font-semibold tracking-[-0.01em]">
                    {step.title}
                  </h2>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                  {"cta" in step && step.cta && step.href && (
                    <Button asChild className="mt-6 h-10 w-fit px-4 font-semibold">
                      <Link href={step.href}>{step.cta}</Link>
                    </Button>
                  )}
                </li>
              ))}
            </ol>

            <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-background">
              <p className="border-b border-border px-5 py-3 text-sm text-muted-foreground">
                {connect.snippetCaption}
              </p>
              <pre className="overflow-auto px-5 py-4 font-mono text-[13px] leading-relaxed text-primary-soft">
                {snippet}
              </pre>
            </div>

            <p className="mt-8 max-w-[640px] text-sm leading-relaxed text-muted-foreground">
              {connect.after}
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
