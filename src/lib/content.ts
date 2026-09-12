/**
 * All landing page copy lives here so the visual layer can be rebuilt
 * without rewriting the text. Source: docs/project-context.md.
 *
 * Copy is deliberately terse: the page has to be skimmable in under a
 * minute, so bodies stay at one or two short sentences.
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
    "Agents on different platforms and models work one project as a team: shared state, split tasks, and technical context passed over a single MCP interface.",
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
    "synco-mcp lets several AI coding agents — on different platforms, running different models — collaborate on one software project over the Model Context Protocol.",
    "One builds the backend, another the frontend, a third the tests. They see each other’s tasks and changes instead of guessing from their own chat history.",
  ],
  highlights: [
    {
      title: "One project space",
      description: "Tasks, agents and changes kept as shared state.",
    },
    {
      title: "A single MCP interface",
      description: "The same tools and data for any MCP client.",
    },
    {
      title: "A live dashboard",
      description: "Watch the team of agents work in real time.",
    },
  ],
} as const;

/**
 * Six problems, pain only. The answer to all of them is written once,
 * in `solution` below.
 */
export const problems = {
  eyebrow: "Problems it solves",
  title: "Six failure modes of agents working side by side",
  description: "Each one shows up as soon as two agents touch the same repo.",
  items: [
    {
      index: "01",
      title: "No shared context",
      problem:
        "Agents work in separate sessions. One changes the API shape while another still calls the old one.",
    },
    {
      index: "02",
      title: "Duplicated work",
      problem:
        "Two agents implement the same thing at the same time, because neither knows about the other.",
    },
    {
      index: "03",
      title: "No signal on work in progress",
      problem:
        "An agent edits a file another is already changing. Git catches the clash only later.",
    },
    {
      index: "04",
      title: "Unusable change reports",
      problem:
        "“Fixed authentication” says nothing about which files changed or what it affects.",
    },
    {
      index: "05",
      title: "Context lost at handoff",
      problem:
        "The next agent has to work out on its own what was done and what is still open.",
    },
    {
      index: "06",
      title: "No transparency for you",
      problem:
        "You cannot tell what each agent is busy with, or where things went wrong.",
    },
  ],
} as const;

/** The answer to all six problems, stated once. */
export const solution = {
  eyebrow: "The answer",
  title: "One coordination layer, not six fixes",
  lead: "Agents share state, claim their work, and pass context in a fixed shape — through one MCP interface that any client or model can speak.",
  caveat:
    "synco-mcp does not replace Git and does not guarantee conflict-free work; it surfaces potential problems earlier.",
  capabilities: [
    {
      label: "Shared project state",
      description:
        "Tasks, changes and current technical context in one space, not scattered chat logs.",
    },
    {
      label: "Claims before edits",
      description:
        "Agents reserve the task they take and flag the files they will touch. Overlaps raise a warning.",
    },
    {
      label: "Reports and handoffs",
      description:
        "ChangeReports and handoffs carry changed files, decisions taken and next steps.",
    },
    {
      label: "Live dashboard",
      description:
        "Active agents, current tasks and potential conflicts in one view.",
    },
  ],
} as const;

export const values = {
  title: "Three things a shared layer buys you",
  items: [
    {
      title: "Visibility",
      description: "Every agent knows what is happening in the project.",
    },
    {
      title: "Coordination",
      description: "Agents split the work and warn about conflicts.",
    },
    {
      title: "Knowledge sharing",
      description: "Changes and context move in a structured form.",
    },
  ],
} as const;

export const audience = {
  eyebrow: "Who it’s for",
  title: "Built for people already running more than one agent",
  items: [
    "Developers running several AI coding agents",
    "Teams experimenting with multi-agent development",
    "Users of Claude Code, Cursor, Codex and other MCP clients",
    "Builders of AI infrastructure and automation tooling",
  ],
} as const;

export const footer = {
  description: "A shared coordination layer for AI coding agents.",
  pageLinksLabel: "On this page",
  sourceLabel: "Source",
  startNowStatus: "Start Now — coming soon",
  disclaimer:
    "Actual MCP and realtime support depends on the capabilities of each client.",
} as const;
