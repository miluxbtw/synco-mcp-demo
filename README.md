# synco-mcp — web app

Web front end for **synco-mcp**, a self-hosted coordination server that lets several AI coding
agents — running on different platforms and different models — work on one software project as a
team over the Model Context Protocol (MCP).

This repository currently contains the **landing page** only. The realtime dashboard and the MCP
server itself are not implemented yet.

## Stack

- [Next.js 16](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS v4
- [shadcn/ui](https://ui.shadcn.com) (radix / nova preset) with Geist fonts

## Run locally

Requires Node.js 20+ (developed on Node 22).

```bash
npm install
npm run dev
```

The dev server listens on <http://127.0.0.1:43127>.

## Scripts

| Script              | What it does                          |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Dev server on port 43127              |
| `npm run build`     | Production build                      |
| `npm run start`     | Serve the production build (port 43127) |
| `npm run lint`      | ESLint                                |
| `npm run typecheck` | `tsc --noEmit`                        |

## Project layout

```
src/app/page.tsx        landing page composition
src/app/layout.tsx      root layout, metadata, dark theme, fonts
src/app/globals.css     Tailwind + theme tokens
src/components/         page sections (hero, header, footer, section shell)
src/components/ui/      shadcn/ui primitives
src/lib/content.ts      all landing copy, kept separate from the layout
src/lib/site.ts         site name, tagline, GitHub URL
```

All page text lives in `src/lib/content.ts`, so the visual layer can be reworked without touching
the copy.

## Configuration to fill in

`src/lib/site.ts` points `githubUrl` at `https://github.com/` as a placeholder. Replace it with the
real repository URL once the project is published — it is used by the "Self-host on GitHub" links in
the header, hero, and footer.

The "Start Now" button is intentionally rendered as disabled with a "coming soon" hint until the
hosted dashboard exists.
