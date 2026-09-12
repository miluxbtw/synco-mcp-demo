"use client";

import { useAuthActions, useConvexAuth } from "@convex-dev/auth/react";
import { useConvex, useMutation, useQuery } from "convex/react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { api, CONVEX_SITE_URL } from "@/lib/convex";
import "./desk.css";
import {
  IconAgents,
  IconAlert,
  IconChart,
  IconFile,
  IconList,
  IconPlus,
  IconPulse,
  IconSwap,
  Logo,
} from "./icons";
import type { DashboardState, FeedEvent, Report, SessionState } from "./types";

type FileRow = {
  key: string;
  when: string;
  action: string;
  path: string;
  agent: string;
  note: string;
};

function formatTime(value: string): string {
  return new Date(value).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function agentName(state: DashboardState, id?: string): string {
  if (!id) return "—";
  return state.agents.find((agent) => agent.id === id)?.name ?? id;
}

function taskTitle(state: DashboardState, id?: string): string {
  if (!id) return "—";
  return state.tasks.find((task) => task.id === id)?.title ?? id;
}

function lastAction(state: DashboardState, agentId: string): string | undefined {
  return state.events.find((event) => event.agentId === agentId)?.summary;
}

function formatWhen(value: string, now: number): string {
  const diff = now - new Date(value).getTime();
  if (diff < 15_000) return "just now";
  if (diff < 60_000) return `${Math.max(1, Math.floor(diff / 1000))}s`;
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m`;
  return formatTime(value);
}

function activityByQuarter(events: FeedEvent[]): Array<{ label: string; count: number }> {
  if (events.length === 0) return [];
  const buckets = new Map<string, number>();
  for (const event of events) {
    const date = new Date(event.createdAt);
    const quarter = Math.floor(date.getMinutes() / 15);
    const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${quarter}`;
    buckets.set(key, (buckets.get(key) ?? 0) + 1);
  }
  return [...buckets.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-12)
    .map(([key, count]) => {
      const [hour, quarter] = key.split("-").slice(3);
      const minutes = String(Number(quarter) * 15).padStart(2, "0");
      return { label: `${String(Number(hour)).padStart(2, "0")}:${minutes}`, count };
    });
}

function fileRows(state: DashboardState): FileRow[] {
  const rows: FileRow[] = [];
  for (const report of state.reports) {
    for (const file of report.files) {
      rows.push({
        key: `${report.id}-${file.path}`,
        when: report.createdAt,
        action: file.action,
        path: file.path,
        agent: agentName(state, report.agentId),
        note: file.description,
      });
    }
  }
  return rows;
}

function GoldButton({
  children,
  onClick,
  type = "button",
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="rounded-full bg-[#E8B84A] px-3.5 py-1.5 text-sm font-medium text-[#070707] disabled:opacity-50"
    >
      {children}
    </button>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-[16px] border border-white/10 bg-[#111111] ${className}`}>{children}</div>
  );
}

function Panel({
  title,
  hint,
  icon,
  children,
}: {
  title: string;
  hint?: string;
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Card className="flex h-full min-h-0 flex-col p-4">
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h2 className="flex items-center gap-2 text-[15px] font-medium tracking-tight">
          {icon && <span className="text-[#E8B84A]">{icon}</span>}
          {title}
        </h2>
        {hint && <p className="text-[13px] text-[#9A9A94]">{hint}</p>}
      </div>
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    </Card>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="mt-3 block text-[13px] text-[#9A9A94]">
      {label}
      {children}
    </label>
  );
}

const inputClass =
  "mt-1.5 w-full rounded-lg border border-white/10 bg-[#070707] px-3 py-2 text-sm text-[#F5F5F2] outline-none focus:border-[#E8B84A]";

function AuthForm() {
  const { signIn } = useAuthActions();
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#070707] px-5 text-[#F5F5F2]">
      <form
        className="w-full max-w-md rounded-[16px] border border-white/10 bg-[#111111] p-6"
        onSubmit={(event: FormEvent) => {
          event.preventDefault();
          setBusy(true);
          setError(null);
          void signIn("password", { email: email.trim(), password, flow: mode })
            .catch((err) => setError(err instanceof Error ? err.message : "Could not sign in"))
            .finally(() => setBusy(false));
        }}
      >
        <p className="desk-font-data text-sm text-[#E8B84A]">synco-mcp</p>
        <h1 className="mt-2 text-xl font-medium tracking-tight">
          {mode === "signIn" ? "Sign in" : "Create account"}
        </h1>
        <p className="mt-1 text-[13px] text-[#9A9A94]">
          One Convex backend. Your projects stay on your account.
        </p>
        <Field label="Email">
          <input
            className={inputClass}
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </Field>
        <Field label="Password">
          <input
            className={inputClass}
            type="password"
            autoComplete={mode === "signIn" ? "current-password" : "new-password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={8}
            required
          />
        </Field>
        {error && <p className="mt-3 text-[13px] text-[#E8B4B4]">{error}</p>}
        <div className="mt-5">
          <GoldButton type="submit" disabled={busy || !email.trim() || password.length < 8}>
            {busy ? "Please wait…" : mode === "signIn" ? "Sign in" : "Create account"}
          </GoldButton>
        </div>
        <button
          type="button"
          className="mt-3 w-full text-[13px] text-[#9A9A94]"
          onClick={() => {
            setMode(mode === "signIn" ? "signUp" : "signIn");
            setError(null);
          }}
        >
          {mode === "signIn" ? "Need an account? Create one" : "Already have an account? Sign in"}
        </button>
      </form>
    </main>
  );
}

function ChangeReportModal({
  state,
  report,
  onClose,
}: {
  state: DashboardState;
  report: Report;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-8" onClick={onClose}>
      <div
        className="flex max-h-full w-full max-w-2xl flex-col overflow-hidden rounded-[16px] border border-white/10 bg-[#111111]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4">
          <div className="min-w-0">
            <p className="text-[12px] text-[#9A9A94]">ChangeReport</p>
            <h2 className="mt-1 text-lg font-medium tracking-tight">{report.summary}</h2>
            <p className="mt-2 text-[13px] text-[#9A9A94]">
              {agentName(state, report.agentId)}
              {report.taskId ? ` · ${taskTitle(state, report.taskId)}` : ""} · tests{" "}
              {report.tests.status.replaceAll("_", " ")}
              {report.breakingChange ? " · breaking" : ""}
            </p>
          </div>
          <button type="button" className="shrink-0 text-[13px] text-[#9A9A94]" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-auto px-5 py-4">
          {report.tests.summary && <p className="mb-3 text-sm text-[#D4D4D0]">{report.tests.summary}</p>}
          {report.affectedAreas.length > 0 && (
            <p className="mb-3 text-[13px] text-[#9A9A94]">Areas: {report.affectedAreas.join(", ")}</p>
          )}
          {report.interfacesChanged.length > 0 && (
            <div className="mb-4">
              <p className="text-[12px] text-[#9A9A94]">Interfaces</p>
              <ul className="mt-1 space-y-1">
                {report.interfacesChanged.map((item) => (
                  <li key={item.name} className="text-sm">
                    <span className="desk-font-data text-[#E8B84A]">{item.name}</span>
                    <span className="text-[#9A9A94]"> — {item.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="space-y-2">
            {report.files.map((file) => (
              <div key={`${file.action}-${file.path}`} className="rounded-lg bg-[#070707] px-3 py-2">
                <p className="desk-font-data text-[12px] text-[#E8B84A]">{file.action}</p>
                <p className="desk-font-data mt-0.5 text-[13px]">{file.path}</p>
                <p className="mt-1 text-[13px] text-[#9A9A94]">{file.description}</p>
              </div>
            ))}
          </div>
          {report.nextSteps[0] && (
            <p className="mt-4 text-[13px] text-[#D4D4D0]">Next: {report.nextSteps.join(" ")}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function KeysPanel({ onClose }: { onClose: () => void }) {
  const keys = useQuery(api.keys.listMine) ?? [];
  const createKey = useMutation(api.keys.create);
  const revokeKey = useMutation(api.keys.revoke);
  const [name, setName] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4" onClick={onClose}>
      <div
        className="w-full max-w-lg rounded-[16px] border border-white/10 bg-[#111111] p-5"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-medium tracking-tight">Agent keys</h2>
            <p className="mt-1 text-[13px] text-[#9A9A94]">
              Agents authenticate as you and write to the project selected on this desk.{" "}
              <Link href="/connect" className="text-[#E8B84A]">
                How to connect
              </Link>
            </p>
          </div>
          <button type="button" className="text-[13px] text-[#9A9A94]" onClick={onClose}>
            Close
          </button>
        </div>
        {token && (
          <div className="mt-4 rounded-lg bg-[#070707] px-3 py-2">
            <p className="text-[12px] text-[#9A9A94]">Copy now — it will not be shown again.</p>
            <p className="desk-font-data mt-1 break-all text-[13px] text-[#E8B84A]">{token}</p>
            <pre className="mt-3 overflow-auto text-[11px] text-[#D4D4D0]">{`{
  "mcpServers": {
    "synco-mcp": {
      "url": "${CONVEX_SITE_URL}/mcp",
      "headers": { "Authorization": "Bearer ${token}" }
    }
  }
}`}</pre>
          </div>
        )}
        <form
          className="mt-4 flex items-center gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            setBusy(true);
            setError(null);
            void createKey({ name: name.trim() || undefined })
              .then((created) => {
                setToken(created.token);
                setName("");
              })
              .catch((err) => setError(err instanceof Error ? err.message : "Could not create key"))
              .finally(() => setBusy(false));
          }}
        >
          <input
            className="min-w-0 flex-1 rounded-lg border border-white/10 bg-[#070707] px-3 py-2 text-sm outline-none focus:border-[#E8B84A]"
            placeholder="Cursor, Claude, OpenCode…"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <GoldButton type="submit" disabled={busy}>
            {busy ? "Creating…" : "New key"}
          </GoldButton>
        </form>
        {error && <p className="mt-2 text-[13px] text-[#E8B4B4]">{error}</p>}
        <div className="mt-4 space-y-2">
          {keys.length === 0 ? (
            <p className="text-sm text-[#9A9A94]">No keys yet.</p>
          ) : (
            keys.map((key: { id: string; name: string; prefix: string }) => (
              <div key={key.id} className="flex items-center justify-between gap-3 rounded-lg bg-[#070707] px-3 py-2">
                <div className="min-w-0">
                  <p className="text-sm">{key.name}</p>
                  <p className="desk-font-data text-[12px] text-[#9A9A94]">{key.prefix}…</p>
                </div>
                <button type="button" className="text-[12px] text-[#E8B4B4]" onClick={() => void revokeKey({ id: key.id })}>
                  Revoke
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function AddLogForm({ projectId, onClose }: { projectId: string; onClose: () => void }) {
  const addManualLog = useMutation(api.dashboard.addManualLog);
  const [author, setAuthor] = useState("");
  const [summary, setSummary] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4">
      <form
        className="w-full max-w-md rounded-[16px] border border-white/10 bg-[#111111] p-5"
        onSubmit={(event) => {
          event.preventDefault();
          setBusy(true);
          setError(null);
          void addManualLog({
            projectId,
            summary: summary.trim(),
            author: author.trim() || undefined,
          })
            .then(() => onClose())
            .catch((err) => setError(err instanceof Error ? err.message : "Could not add log"))
            .finally(() => setBusy(false));
        }}
      >
        <h2 className="text-lg font-medium tracking-tight">Add log</h2>
        <p className="mt-1 text-[13px] text-[#9A9A94]">Human note in the work log. Not a ChangeReport.</p>
        <Field label="Author">
          <input
            className={inputClass}
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            placeholder="Your name"
          />
        </Field>
        <Field label="Note">
          <textarea
            className={`${inputClass} min-h-24`}
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
            placeholder="What should the next agent see?"
            required
          />
        </Field>
        {error && <p className="mt-2 text-[13px] text-[#E8B4B4]">{error}</p>}
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/15 px-3.5 py-1.5 text-sm text-[#9A9A94]"
          >
            Cancel
          </button>
          <GoldButton type="submit" disabled={busy || !summary.trim()}>
            {busy ? "Saving…" : "Add log"}
          </GoldButton>
        </div>
      </form>
    </div>
  );
}

function Desk({ session }: { session: SessionState }) {
  const { signOut } = useAuthActions();
  const create = useMutation(api.coordination.createProject);
  const select = useMutation(api.dashboard.selectProject);
  const [keysOpen, setKeysOpen] = useState(false);
  const [logOpen, setLogOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [now, setNow] = useState(() => Date.now());
  const projectId = session.activeProjectId!;
  const state = useQuery(api.dashboard.getDesk, { projectId }) as DashboardState | null | undefined;
  const seenIds = useRef(new Set<string>());
  const [freshIds, setFreshIds] = useState<string[]>([]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 15_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!state) return;
    const nextFresh: string[] = [];
    for (const event of state.events) {
      if (!seenIds.current.has(event.id) && seenIds.current.size > 0) {
        nextFresh.push(event.id);
      }
      seenIds.current.add(event.id);
    }
    if (nextFresh.length > 0) {
      setFreshIds(nextFresh);
      const timer = window.setTimeout(() => setFreshIds([]), 1600);
      return () => window.clearTimeout(timer);
    }
  }, [state]);

  const lead = state?.reports[0];
  const activity = useMemo(() => (state ? activityByQuarter(state.events) : []), [state]);
  const files = useMemo(() => (state ? fileRows(state) : []), [state]);
  const maxActivity = activity.reduce((max, row) => Math.max(max, row.count), 1);
  const busyElsewhere = session.projects.filter(
    (project) => project.id !== projectId && (project.eventCount ?? 0) > 0,
  );

  if (!state) {
    return <main className="min-h-screen bg-[#070707] px-6 py-12 text-sm text-[#9A9A94]">Loading the desk…</main>;
  }

  return (
    <main className="min-h-screen bg-[#070707] text-[#F5F5F2]">
      {keysOpen && <KeysPanel onClose={() => setKeysOpen(false)} />}
      {logOpen && <AddLogForm projectId={projectId} onClose={() => setLogOpen(false)} />}
      {reportOpen && lead && (
        <ChangeReportModal state={state} report={lead} onClose={() => setReportOpen(false)} />
      )}

      <header className="border-b border-white/10 px-5 py-3">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-2.5">
            <Link href="/" className="flex items-center gap-2.5">
              <Logo className="h-6 w-6 shrink-0" />
              <p className="text-[15px] font-semibold tracking-tight">synco-mcp</p>
            </Link>
            <select
              className="max-w-[280px] rounded-full border border-white/15 bg-[#111111] px-3 py-1 text-[13px] text-[#F5F5F2] outline-none focus:border-[#E8B84A]"
              value={projectId}
              onChange={(event) => void select({ projectId: event.target.value })}
            >
              {session.projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name === project.id ? project.name : `${project.name} · ${project.id}`}
                  {project.eventCount ? ` · ${project.eventCount}` : ""}
                </option>
              ))}
            </select>
            {creating ? (
              <form
                className="flex items-center gap-2"
                onSubmit={(event) => {
                  event.preventDefault();
                  const name = newName.trim();
                  if (!name) return;
                  void create({ name }).then((project) => select({ projectId: project.id })).then(() => {
                    setCreating(false);
                    setNewName("");
                  });
                }}
              >
                <input
                  autoFocus
                  className="w-40 rounded-lg border border-white/10 bg-[#070707] px-2 py-1 text-[13px] outline-none focus:border-[#E8B84A]"
                  placeholder="New project"
                  value={newName}
                  onChange={(event) => setNewName(event.target.value)}
                />
                <GoldButton type="submit">Create</GoldButton>
                <button
                  type="button"
                  className="text-[12px] text-[#9A9A94]"
                  onClick={() => {
                    setCreating(false);
                    setNewName("");
                  }}
                >
                  Cancel
                </button>
              </form>
            ) : (
              <button type="button" className="text-[12px] text-[#9A9A94]" onClick={() => setCreating(true)}>
                + Project
              </button>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 text-[13px] text-[#9A9A94]">
              <span className="desk-live-dot h-1.5 w-1.5 rounded-full bg-[#E8B84A]" />
              Live
            </span>
            <span className="hidden text-[13px] text-[#9A9A94] sm:inline">{session.user.username}</span>
            <button type="button" className="text-[13px] text-[#9A9A94]" onClick={() => setKeysOpen(true)}>
              Agent keys
            </button>
            <button type="button" className="text-[13px] text-[#9A9A94]" onClick={() => void signOut()}>
              Sign out
            </button>
            <GoldButton onClick={() => setLogOpen(true)}>
              <span className="flex items-center gap-1.5">
                <IconPlus /> Add log
              </span>
            </GoldButton>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-5 py-4">
        {state.events.length === 0 && busyElsewhere.length > 0 && (
          <Card className="px-4 py-3">
            <p className="text-sm text-[#F5F5F2]">
              This desk is empty. You have activity on{" "}
              {busyElsewhere.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  className="desk-font-data text-[#E8B84A] underline-offset-2 hover:underline"
                  onClick={() => void select({ projectId: project.id })}
                >
                  {project.name} ({project.id}, {project.eventCount} events)
                </button>
              ))}
              . The picker above is the live project — switch it and MCP follows.
            </p>
          </Card>
        )}

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ["Agents", state.counts.agents],
            ["Events", state.events.length],
            ["Files", files.length],
            ["Warnings", state.counts.warnings],
          ].map(([label, value]) => (
            <Card key={String(label)} className="px-4 py-3">
              <p className="text-[12px] text-[#9A9A94]">{label}</p>
              <p className="mt-1 text-2xl font-medium tracking-tight">{value}</p>
            </Card>
          ))}
        </div>

        <div className="grid gap-3 lg:grid-cols-[1.2fr_1fr]">
          <Panel title="Latest change" hint="Agent-declared" icon={<IconPulse />}>
            {lead ? (
              <div className="flex flex-1 flex-col">
                <button type="button" className="w-full text-left" onClick={() => setReportOpen(true)}>
                  <p className="text-[17px] font-medium leading-snug tracking-tight">{lead.summary}</p>
                  <p className="mt-2 text-[13px] text-[#9A9A94]">
                    {agentName(state, lead.agentId)}
                    {lead.taskId ? ` · ${taskTitle(state, lead.taskId)}` : ""} · {lead.files.length}{" "}
                    {lead.files.length === 1 ? "file" : "files"}
                  </p>
                </button>
                <div className="mt-auto pt-4">
                  <GoldButton onClick={() => setReportOpen(true)}>Open report</GoldButton>
                </div>
              </div>
            ) : (
              <p className="text-sm text-[#9A9A94]">No ChangeReports yet. An agent must call report_change.</p>
            )}
          </Panel>

          <Panel title="Activity" hint="Events by 15 min" icon={<IconChart />}>
            {activity.length === 0 ? (
              <p className="text-sm text-[#9A9A94]">No events yet.</p>
            ) : (
              <div className="flex h-40 items-end gap-2">
                {activity.map((col) => (
                  <div key={col.label} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
                    <span className="desk-font-data text-[11px] text-[#9A9A94]">{col.count}</span>
                    <div
                      className="w-full rounded-t bg-[#E8B84A]"
                      style={{ height: `${Math.max(8, (col.count / maxActivity) * 120)}px` }}
                    />
                    <span className="desk-font-data text-[11px] text-[#9A9A94]">{col.label}</span>
                  </div>
                ))}
              </div>
            )}
          </Panel>
        </div>

        <div className="grid gap-3 lg:grid-cols-[1.4fr_280px]">
          <Panel title="Work log" icon={<IconList />}>
            {state.events.length === 0 ? (
              <p className="text-sm text-[#9A9A94]">The log is empty.</p>
            ) : (
              <div className="max-h-[420px] overflow-auto">
                {state.events.map((event) => (
                  <div
                    key={event.id}
                    className={`flex gap-3 border-b border-white/10 py-2.5 last:border-0 ${freshIds.includes(event.id) ? "desk-log-fresh" : ""}`}
                  >
                    <span className="desk-font-data w-14 shrink-0 text-[12px] text-[#9A9A94]">
                      {formatWhen(event.createdAt, now)}
                    </span>
                    <div className="min-w-0">
                      <p className="desk-font-data text-[11px] uppercase tracking-[0.12em] text-[#E8B84A]">
                        {event.type}
                      </p>
                      <p className="mt-0.5 text-sm leading-snug">{event.summary}</p>
                      <p className="mt-0.5 text-[12px] text-[#9A9A94]">
                        {agentName(state, event.agentId)}
                        {event.taskId ? ` · ${taskTitle(state, event.taskId)}` : ""}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Panel>

          <Panel title="Agents" icon={<IconAgents />}>
            {state.agents.length === 0 ? (
              <p className="text-sm text-[#9A9A94]">None registered. Point an MCP client at your key.</p>
            ) : (
              <div className="space-y-3">
                {state.agents.map((agent) => (
                  <div key={agent.id} className="border-b border-white/10 pb-3 last:border-0 last:pb-0">
                    <p className="text-sm font-medium">{agent.name}</p>
                    <p className="desk-font-data mt-0.5 text-[12px] text-[#9A9A94]">
                      {agent.platform}
                      {agent.model ? ` · ${agent.model}` : ""} · {agent.status}
                    </p>
                    <p className="mt-1 text-[13px] text-[#D4D4D0]">
                      {lastAction(state, agent.id) ??
                        (agent.currentTaskId ? `Working on ${taskTitle(state, agent.currentTaskId)}` : "Idle")}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Panel>
        </div>

        <Panel title="Files they touched" hint="From ChangeReports" icon={<IconFile />}>
          {files.length === 0 ? (
            <p className="text-sm text-[#9A9A94]">No declared file changes yet.</p>
          ) : (
            <div className="max-h-56 overflow-auto">
              <table className="w-full min-w-[560px] border-collapse text-left text-[13px]">
                <thead className="sticky top-0 bg-[#161616]">
                  <tr className="text-[12px] text-[#9A9A94]">
                    <th className="px-2 py-2 font-medium">When</th>
                    <th className="px-2 py-2 font-medium">Action</th>
                    <th className="px-2 py-2 font-medium">Path</th>
                    <th className="px-2 py-2 font-medium">By</th>
                    <th className="px-2 py-2 font-medium">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((row) => (
                    <tr key={row.key} className="border-t border-white/10">
                      <td className="desk-font-data px-2 py-2 text-[#9A9A94]">{formatTime(row.when)}</td>
                      <td className="px-2 py-2 text-[#E8B84A]">{row.action}</td>
                      <td className="desk-font-data px-2 py-2">{row.path}</td>
                      <td className="px-2 py-2 text-[#9A9A94]">{row.agent}</td>
                      <td className="px-2 py-2 text-[#D4D4D0]">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Panel>

        <div className="grid gap-3 sm:grid-cols-2">
          <Panel title="Corrections" hint="Overlap, not Git locks" icon={<IconAlert />}>
            {state.warnings.length === 0 ? (
              <p className="text-sm text-[#9A9A94]">No overlapping claims.</p>
            ) : (
              <div className="space-y-2">
                {state.warnings.map((warning) => (
                  <div key={`${warning.resourcePath}-${warning.detectedAt}`} className="rounded-lg bg-[#070707] px-3 py-2">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="desk-font-data text-[13px]">{warning.resourcePath}</p>
                      <span
                        className={`desk-font-data shrink-0 text-[11px] uppercase tracking-[0.12em] ${
                          warning.status === "resolved" ? "text-[#737373]" : "text-[#E8B84A]"
                        }`}
                      >
                        {warning.status === "resolved" ? "resolved" : "active"}
                      </span>
                    </div>
                    <p className="mt-1 text-[13px] text-[#9A9A94]">
                      {warning.agentIds.map((id) => agentName(state, id)).join(" and ")}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Panel>
          <Panel title="Handoffs" icon={<IconSwap />}>
            {state.handoffs.length === 0 ? (
              <p className="text-sm text-[#9A9A94]">No handoffs yet.</p>
            ) : (
              <div className="space-y-3">
                {state.handoffs.map((handoff) => (
                  <div key={handoff.id}>
                    <p className="desk-font-data text-[11px] uppercase tracking-[0.12em] text-[#E8B84A]">
                      {agentName(state, handoff.fromAgentId)} →{" "}
                      {handoff.toAgentId ? agentName(state, handoff.toAgentId) : "next agent"}
                    </p>
                    <p className="mt-1 text-sm">{handoff.summary}</p>
                  </div>
                ))}
              </div>
            )}
          </Panel>
        </div>
      </div>
    </main>
  );
}

export function DeskApp() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const workspace = useQuery(api.dashboard.listWorkspace, isAuthenticated ? {} : "skip") as
    | SessionState
    | null
    | undefined;
  const create = useMutation(api.coordination.createProject);
  const select = useMutation(api.dashboard.selectProject);
  const convex = useConvex();
  const [projectName, setProjectName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isAuthenticated) {
    if (isLoading) {
      return <main className="min-h-screen bg-[#070707] px-6 py-12 text-sm text-[#9A9A94]">Loading…</main>;
    }
    return <AuthForm />;
  }

  if (!workspace) {
    return <main className="min-h-screen bg-[#070707] px-6 py-12 text-sm text-[#9A9A94]">Loading…</main>;
  }

  if (workspace.projects.length === 0 || !workspace.activeProjectId) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070707] px-5 text-[#F5F5F2]">
        <form
          className="w-full max-w-md rounded-[16px] border border-white/10 bg-[#111111] p-6"
          onSubmit={(event: FormEvent) => {
            event.preventDefault();
            setBusy(true);
            setError(null);
            void create({ name: projectName.trim() })
              .then((project) => select({ projectId: project.id }))
              .then(() => convex.query(api.dashboard.listWorkspace, {}))
              .catch((err) => setError(err instanceof Error ? err.message : "Could not create project"))
              .finally(() => setBusy(false));
          }}
        >
          <p className="desk-font-data text-sm text-[#E8B84A]">synco-mcp</p>
          <h1 className="mt-2 text-xl font-medium">Create a project</h1>
          <p className="mt-1 text-[13px] text-[#9A9A94]">
            This project becomes your active desk. Agents using your key write here.
          </p>
          <Field label="Project name">
            <input
              className={inputClass}
              value={projectName}
              onChange={(event) => setProjectName(event.target.value)}
              placeholder="Website, API, mobile…"
              required
            />
          </Field>
          {error && <p className="mt-3 text-[13px] text-[#E8B4B4]">{error}</p>}
          <div className="mt-5">
            <GoldButton type="submit" disabled={busy || !projectName.trim()}>
              {busy ? "Creating…" : "Create project"}
            </GoldButton>
          </div>
        </form>
      </main>
    );
  }

  return <Desk session={workspace} />;
}
