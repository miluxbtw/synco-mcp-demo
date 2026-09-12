import { Database, FileText, Lock, Repeat } from "lucide-react";

import { diagram } from "@/lib/content";

const artifactIcons = [Database, Lock, FileText, Repeat];

/**
 * The hero's dominant visual: three agents on one project, meeting at the
 * coordination layer. It illustrates the architecture described in the copy.
 */
export function CoordinationDiagram() {
  return (
    <div className="relative w-full shrink-0 rounded-[18px] border border-border bg-card p-5 shadow-[0_0_0_1px_rgb(255_255_255/0.04),0_14px_48px_rgb(0_0_0/0.55),0_0_90px_rgb(255_176_32/0.06)] sm:p-6 lg:w-[520px]">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
          {diagram.title}
        </span>
        <span className="font-mono text-xs tracking-[0.1em] text-primary">
          {diagram.protocol}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {diagram.agents.map((agent) => (
          <div
            key={agent.key}
            className="flex flex-col gap-2 rounded-xl border border-border bg-white/[0.03] p-3"
          >
            <div className="flex items-center gap-2">
              <span className="flex size-[22px] shrink-0 items-center justify-center rounded-[7px] border border-primary/30 bg-primary/10 font-mono text-xs font-medium text-primary-soft">
                {agent.key}
              </span>
              <span className="text-[13px] font-medium">Agent {agent.key}</span>
            </div>
            <span className="text-[13px] text-muted-foreground">
              {agent.role}
            </span>
          </div>
        ))}
      </div>

      <div className="grid h-[26px] grid-cols-3" aria-hidden="true">
        {diagram.agents.map((agent) => (
          <span key={agent.key} className="flex justify-center">
            <span className="h-full w-px bg-gradient-to-b from-primary/[0.06] to-primary/50" />
          </span>
        ))}
      </div>

      <div className="flex flex-col items-center gap-1 rounded-xl border border-primary/30 bg-primary/[0.08] px-4 py-3.5 text-center">
        <span className="font-mono text-sm font-medium text-primary-soft">
          {diagram.layer}
        </span>
        <span className="text-[13px] text-muted-foreground">
          {diagram.layerCaption}
        </span>
      </div>

      <div className="mt-4.5 grid gap-2.5 sm:grid-cols-2">
        {diagram.artifacts.map((artifact, index) => {
          const Icon = artifactIcons[index];
          return (
            <div
              key={artifact}
              className="flex items-center gap-2.5 rounded-[10px] border border-border bg-white/[0.02] px-3 py-2.5"
            >
              <Icon className="size-[15px] shrink-0 text-primary" />
              <span className="text-[13px]">{artifact}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
