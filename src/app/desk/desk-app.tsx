"use client";

import { useAuthActions, useConvexAuth } from "@convex-dev/auth/react";
import { useConvex, useMutation, useQuery } from "convex/react";
import Link from "next/link";
import { useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { api, CONVEX_SITE_URL } from "@/lib/convex";

type Session = {
  user: { id: string; username: string };
  projects: Array<{ id: string; name: string; eventCount?: number }>;
  activeProjectId: string | null;
};

type DeskState = {
  project: { id: string; name: string };
  agents: Array<{ id: string; name: string; platform: string; status: string; lastSeenAt: string }>;
  tasks: Array<{ id: string; title: string; status: string }>;
  events: Array<{ id: string; summary: string; createdAt: string; type: string }>;
  reports: Array<{ id: string; summary: string; agentId: string; createdAt: string }>;
  counts: { agents: number; tasks: number; claims: number; warnings: number };
};

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="mt-3 block text-sm text-muted-foreground">
      {label}
      {children}
    </label>
  );
}

const inputClass =
  "mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:border-primary";

function AuthForm() {
  const { signIn } = useAuthActions();
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <main className="flex min-h-screen items-center justify-center px-5">
      <form
        className="w-full max-w-md rounded-2xl border border-border bg-card p-6"
        onSubmit={(event: FormEvent) => {
          event.preventDefault();
          setBusy(true);
          setError(null);
          void signIn("password", { email: email.trim(), password, flow: mode })
            .catch((err) => setError(err instanceof Error ? err.message : "Could not sign in"))
            .finally(() => setBusy(false));
        }}
      >
        <p className="font-mono text-sm text-primary">synco-mcp</p>
        <h1 className="mt-2 text-xl font-semibold tracking-tight">
          {mode === "signIn" ? "Sign in" : "Create account"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
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
        {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
        <Button type="submit" disabled={busy || !email.trim() || password.length < 8} className="mt-5 h-10 w-full">
          {busy ? "Please wait…" : mode === "signIn" ? "Sign in" : "Create account"}
        </Button>
        <button
          type="button"
          className="mt-3 w-full text-sm text-muted-foreground"
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

function KeysPanel({ onClose }: { onClose: () => void }) {
  const keys = useQuery(api.keys.listMine) ?? [];
  const createKey = useMutation(api.keys.create);
  const revokeKey = useMutation(api.keys.revoke);
  const [name, setName] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4" onClick={onClose}>
      <div
        className="w-full max-w-lg rounded-2xl border border-border bg-card p-5"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">Agent keys</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Agents authenticate as you and write to the project selected on this desk.{" "}
              <Link href="/connect" className="text-primary">
                How to connect
              </Link>
            </p>
          </div>
          <button type="button" className="text-sm text-muted-foreground" onClick={onClose}>
            Close
          </button>
        </div>
        {token && (
          <div className="mt-4 rounded-lg bg-background px-3 py-2">
            <p className="text-xs text-muted-foreground">Copy now — it will not be shown again.</p>
            <p className="mt-1 break-all font-mono text-sm text-primary">{token}</p>
            <pre className="mt-3 overflow-auto text-[11px] text-muted-foreground">{`{
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
            void createKey({ name: name.trim() || undefined })
              .then((created) => {
                setToken(created.token);
                setName("");
              })
              .finally(() => setBusy(false));
          }}
        >
          <input
            className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:border-primary"
            placeholder="Cursor, Claude, OpenCode…"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <Button type="submit" disabled={busy} className="h-9">
            {busy ? "Creating…" : "New key"}
          </Button>
        </form>
        <div className="mt-4 space-y-2">
          {keys.length === 0 ? (
            <p className="text-sm text-muted-foreground">No keys yet.</p>
          ) : (
            keys.map((key: { id: string; name: string; prefix: string }) => (
              <div key={key.id} className="flex items-center justify-between gap-3 rounded-lg bg-background px-3 py-2">
                <div>
                  <p className="text-sm">{key.name}</p>
                  <p className="font-mono text-xs text-muted-foreground">{key.prefix}…</p>
                </div>
                <button type="button" className="text-xs text-destructive" onClick={() => void revokeKey({ id: key.id })}>
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

function Desk({ session }: { session: Session }) {
  const { signOut } = useAuthActions();
  const create = useMutation(api.coordination.createProject);
  const select = useMutation(api.dashboard.selectProject);
  const [keysOpen, setKeysOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const projectId = session.activeProjectId!;
  const state = useQuery(api.dashboard.getDesk, { projectId }) as DeskState | null | undefined;

  return (
    <main className="min-h-screen">
      {keysOpen && <KeysPanel onClose={() => setKeysOpen(false)} />}
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-5 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <Link href="/" className="font-mono text-sm text-primary">
              synco-mcp
            </Link>
            <select
              className="max-w-[260px] rounded-full border border-border bg-card px-3 py-1 text-sm outline-none focus-visible:border-primary"
              value={projectId}
              onChange={(event) => void select({ projectId: event.target.value })}
            >
              {session.projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
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
                  className="w-36 rounded-lg border border-border bg-background px-2 py-1 text-sm outline-none focus-visible:border-primary"
                  placeholder="New project"
                  value={newName}
                  onChange={(event) => setNewName(event.target.value)}
                />
                <Button type="submit" className="h-8">
                  Create
                </Button>
              </form>
            ) : (
              <button type="button" className="text-xs text-muted-foreground" onClick={() => setCreating(true)}>
                + Project
              </button>
            )}
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="hidden sm:inline">{session.user.username}</span>
            <button type="button" onClick={() => setKeysOpen(true)}>
              Agent keys
            </button>
            <button type="button" onClick={() => void signOut()}>
              Sign out
            </button>
          </div>
        </div>
      </header>

      {!state ? (
        <p className="px-6 py-12 text-sm text-muted-foreground">Loading the desk…</p>
      ) : (
        <div className="mx-auto grid max-w-[1280px] gap-3 px-5 py-4 md:grid-cols-3">
          <section className="rounded-2xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">Agents</p>
            <p className="mt-1 text-2xl font-semibold">{state.counts.agents}</p>
            {state.agents.length === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">None registered. Point an MCP client at your key.</p>
            ) : (
              <ul className="mt-3 space-y-2 text-sm">
                {state.agents.map((agent) => (
                  <li key={agent.id}>
                    {agent.name} · {agent.platform} · {agent.status}
                  </li>
                ))}
              </ul>
            )}
          </section>
          <section className="rounded-2xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">Open tasks</p>
            <p className="mt-1 text-2xl font-semibold">{state.counts.tasks}</p>
            {state.tasks.length === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">No open tasks.</p>
            ) : (
              <ul className="mt-3 space-y-2 text-sm">
                {state.tasks.map((task) => (
                  <li key={task.id}>
                    {task.title} · {task.status}
                  </li>
                ))}
              </ul>
            )}
          </section>
          <section className="rounded-2xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">Latest change</p>
            {state.reports[0] ? (
              <p className="mt-2 text-sm">{state.reports[0].summary}</p>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">No ChangeReports yet.</p>
            )}
          </section>
          <section className="rounded-2xl border border-border bg-card p-4 md:col-span-3">
            <p className="text-xs text-muted-foreground">Work log</p>
            {state.events.length === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">The log is empty.</p>
            ) : (
              <ul className="mt-3 space-y-2 text-sm">
                {state.events.slice(0, 12).map((event) => (
                  <li key={event.id} className="text-muted-foreground">
                    <span className="text-foreground">{event.summary}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </main>
  );
}

export function DeskApp() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const workspace = useQuery(api.dashboard.listWorkspace, isAuthenticated ? {} : "skip") as
    | Session
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
      return <main className="px-6 py-12 text-sm text-muted-foreground">Loading…</main>;
    }
    return <AuthForm />;
  }

  if (!workspace) {
    return <main className="px-6 py-12 text-sm text-muted-foreground">Loading…</main>;
  }

  if (workspace.projects.length === 0 || !workspace.activeProjectId) {
    return (
      <main className="flex min-h-screen items-center justify-center px-5">
        <form
          className="w-full max-w-md rounded-2xl border border-border bg-card p-6"
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
          <p className="font-mono text-sm text-primary">synco-mcp</p>
          <h1 className="mt-2 text-xl font-semibold">Create a project</h1>
          <p className="mt-1 text-sm text-muted-foreground">
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
          {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={busy || !projectName.trim()} className="mt-5 h-10 w-full">
            {busy ? "Creating…" : "Create project"}
          </Button>
        </form>
      </main>
    );
  }

  return <Desk session={workspace} />;
}
