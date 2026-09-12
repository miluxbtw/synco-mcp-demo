/**
 * All landing page copy lives here so the visual layer can be rebuilt
 * without rewriting the text. Source: docs/project-context.md.
 */

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

export const problems = {
  eyebrow: "Problems it solves",
  title: "Seven failure modes of running agents side by side",
  description:
    "Each of these shows up the moment more than one agent touches the same repository.",
  items: [
    {
      title: "No shared context between agents",
      problem:
        "Agents work in their own sessions and do not know what another agent already did. One changes the API structure while another keeps using the old request format.",
      solutions: [
        "Shared project state",
        "History of important changes",
        "Current technical context on demand",
        "Completed tasks and decisions made",
      ],
    },
    {
      title: "Duplicated work",
      problem:
        "Several agents run the same task at the same time because they do not know about each other. Two agents independently implement the same authentication flow.",
      solutions: [
        "One shared task list",
        "Agents reserve the task they take",
        "Clear ownership for each piece of work",
        "Live execution status",
      ],
    },
    {
      title: "No signal on work in progress",
      problem:
        "An agent starts editing a file another agent is already changing. Git catches the conflict later — after the time is already lost.",
      solutions: [
        "Agents announce which files they intend to change",
        "Active resource claims are registered",
        "Anyone can check which resources are taken",
        "Overlapping claims raise a warning",
      ],
    },
    {
      title: "Vague, unusable change reports",
      problem:
        "“Updated the backend” or “fixed authentication” tells the next agent nothing: not which files changed, not what was actually done, not which parts of the project are affected.",
      solutions: [
        "Structured ChangeReports with a short summary",
        "List of changed files and concrete per-file actions",
        "Affected components and areas of the project",
        "Interface and API changes, plus potential breaking changes",
        "Test status and next steps",
      ],
    },
    {
      title: "Context lost at handoff",
      problem:
        "When one agent finishes its part, the next one has to work out on its own what was done, which problems were found, and what is still open.",
      solutions: [
        "Handoff carries the completed work",
        "Important files that changed",
        "Technical decisions taken",
        "Known issues and unfinished tasks",
        "Recommended next steps",
      ],
    },
    {
      title: "No transparency for the developer",
      problem:
        "You cannot always tell what each agent is busy with, which tasks are already finished, and where things went wrong.",
      solutions: [
        "Active agents, current tasks and statuses",
        "An event feed and ChangeReports",
        "Claimed resources and potential conflicts",
        "Context handoffs between agents",
      ],
    },
    {
      title: "Lock-in to a single AI platform",
      problem:
        "Agents live in different development environments and run on different models. Without a common interface, integrating them takes separate adapters and non-standard data exchange.",
      solutions: [
        "One MCP interface to the coordination layer",
        "Any compatible client can use the available tools",
        "The same project data regardless of model or platform",
      ],
    },
  ],
} as const;

export const values = {
  eyebrow: "Value",
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
  eyebrow: "Who it's for",
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
  disclaimer:
    "synco-mcp does not replace Git and does not guarantee conflict-free work; it surfaces potential problems earlier. Actual MCP and realtime support depends on the capabilities of each client.",
} as const;
