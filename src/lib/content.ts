/**
 * All landing page copy lives here so the visual layer can be rebuilt
 * without rewriting the text. Source: docs/project-context.md.
 */

export const nav = [
  { href: "#what-it-is", label: "What it is" },
  { href: "#problems", label: "Problems" },
  { href: "#solution", label: "Solution" },
  { href: "#values", label: "Value" },
  { href: "#audience", label: "Audience" },
] as const;

export const hero = {
  badge: "Open source · self-hosted · MCP-native",
  title: "The shared coordination layer for AI coding agents",
  subtitle:
    "Several AI coding agents from different platforms and models work on one project as a team: they see each other’s changes, split up tasks, prevent potential conflicts, and pass technical context through a single MCP interface.",
  primaryCta: "Start Now",
  primaryCtaHint: "Coming soon",
  secondaryCta: "Self-host on GitHub",
  secondaryCtaHint: "Run it on your own infrastructure",
} as const;

/** Labels for the hero architecture panel. */
export const diagram = {
  title: "One project space",
  protocol: "MCP",
  layer: "synco-mcp coordination layer",
  layerCaption: "Model Context Protocol",
  agents: [
    { key: "A", role: "backend" },
    { key: "B", role: "frontend" },
    { key: "C", role: "tests" },
  ],
  artifacts: [
    "Shared project state",
    "Task and resource claims",
    "ChangeReports",
    "Context handoffs",
  ],
} as const;

export const whatItIs = {
  eyebrow: "What it is",
  title: "A coordination server for multi-agent development",
  paragraphs: [
    "synco-mcp is a coordination server that lets several AI coding agents, running on different platforms and using different models, collaborate effectively on one software project.",
    "The system gives agents a shared coordination layer over the Model Context Protocol (MCP). Agents can see which tasks their colleagues are working on, learn about changes in the codebase, prevent potential conflicts, and pass technical context to each other.",
    "One agent can build the backend, another the frontend, a third the tests. synco-mcp helps them understand what is happening in the project without relying only on the history of individual chats.",
  ],
  highlights: [
    {
      title: "One project space",
      description:
        "Tasks, agents, changes and interactions are stored as shared state instead of scattered chat logs.",
    },
    {
      title: "A single MCP interface",
      description:
        "Any MCP-compatible client uses the same tools and the same project data, whatever model runs behind it.",
    },
    {
      title: "A live dashboard",
      description:
        "A web dashboard for watching the team of agents work on the project in real time.",
    },
  ],
} as const;

/**
 * The seven problems state the pain only. The answer to all of them is
 * written once, in `solution` below.
 */
export const problems = {
  eyebrow: "Problems it solves",
  title: "Seven failure modes of running agents side by side",
  description:
    "Each of these shows up the moment more than one agent touches the same repository.",
  items: [
    {
      index: "01",
      title: "No shared context between agents",
      problem:
        "Agents work in their own sessions and do not know what another agent already did. One changes the API structure while another keeps using the old request format.",
    },
    {
      index: "02",
      title: "Duplicated work",
      problem:
        "Several agents run the same task at the same time because they do not know about each other. Two agents independently implement the same authentication flow.",
    },
    {
      index: "03",
      title: "No signal on work in progress",
      problem:
        "An agent starts editing a file another agent is already changing. Git catches the conflict later — after the time is already lost.",
    },
    {
      index: "04",
      title: "Vague, unusable change reports",
      problem:
        "“Updated the backend” or “fixed authentication” tells the next agent nothing: not which files changed, not what was actually done, not which parts of the project are affected.",
    },
    {
      index: "05",
      title: "Context lost at handoff",
      problem:
        "When one agent finishes its part, the next one has to work out on its own what was done, which problems were found, and what is still open.",
    },
    {
      index: "06",
      title: "No transparency for the developer",
      problem:
        "You cannot always tell what each agent is busy with, which tasks are already finished, and where things went wrong.",
    },
    {
      index: "07",
      title: "Lock-in to a single AI platform",
      problem:
        "Agents live in different development environments and run on different models. Without a common interface, integrating them takes separate adapters and non-standard data exchange.",
    },
  ],
} as const;

/** The answer to all seven problems, stated once. */
export const solution = {
  title: "How synco-mcp solves it",
  lead: "One coordination layer answers all seven: agents share state, split up work, and pass technical context through a single MCP interface.",
  caveat:
    "synco-mcp does not replace Git and does not guarantee conflict-free work; it surfaces potential problems earlier.",
  capabilities: [
    {
      label: "Shared project state",
      description:
        "Tasks, agents, changes and interactions live in one project space, with a history of important changes and current technical context on demand.",
    },
    {
      label: "One task list",
      description:
        "Agents see one shared task list, reserve the task they take, and expose clear ownership and live execution status.",
    },
    {
      label: "Resource claims",
      description:
        "Agents announce which files they intend to change. Active claims are registered, and overlapping claims raise a warning.",
    },
    {
      label: "Structured ChangeReports",
      description:
        "A short summary, changed files and per-file actions, affected components, interface and API changes, potential breaking changes, test status and next steps.",
    },
    {
      label: "Context handoffs",
      description:
        "A handoff carries the completed work, the important files that changed, technical decisions taken, known issues and recommended next steps.",
    },
    {
      label: "Live dashboard",
      description:
        "Active agents, current tasks and statuses, an event feed, ChangeReports, claimed resources and potential conflicts in one view.",
    },
    {
      label: "A single MCP interface",
      description:
        "Any MCP-compatible client uses the same tools and the same project data, regardless of model or platform.",
    },
  ],
} as const;

export const values = {
  title: "Three things a shared coordination layer buys you",
  description:
    "Instead of several isolated AI tools, you get a more coherent system for working on one codebase.",
  items: [
    {
      title: "Visibility",
      description: "Every agent understands what is happening in the project.",
    },
    {
      title: "Coordination",
      description:
        "Agents can distribute work between themselves and warn about conflicts.",
    },
    {
      title: "Knowledge sharing",
      description:
        "Technical changes and context are passed between agents in a structured form.",
    },
  ],
} as const;

export const audience = {
  eyebrow: "Who it’s for",
  title: "Built for people already running more than one agent",
  items: [
    "Developers using several AI coding agents",
    "Teams experimenting with multi-agent development",
    "Users of Claude Code, Grok Bot, Cursor, Codex and other MCP-compatible tools",
    "Open-source projects where different agents can own separate tasks",
    "Developers of AI infrastructure and automation tooling",
  ],
} as const;

export const footer = {
  description:
    "A shared coordination layer for AI coding agents. Turn several independent agents into one coordinated development team.",
  pageLinksLabel: "On this page",
  sourceLabel: "Source",
  startNowStatus: "Start Now — coming soon",
  disclaimer:
    "Actual MCP and realtime support depends on the capabilities of each client.",
} as const;
