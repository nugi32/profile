# Content sources — what changed

Two sources, split by responsibility:

- **Notion** owns the **journal**, and only the journal.
- **The CMS** in `../cms` owns everything else.

Nothing was run or deployed; this is source only. Verified with `tsc --noEmit`
and `next build` (both clean).

## 1. The bug that stopped anything from loading

The CMS returns `{ "data": [...] }`. The frontend was reading `{ "docs": [...] }`
and treating a shape mismatch as "no data", which is why every section silently
fell back to local dummy content. The new data layer accepts both envelopes.

## 2. One data layer: `lib/cms.ts`

A single module that knows the CMS schema and normalizes it into the app's
types. Each normalizer carries a `SCHEMA MAP` comment naming the exact
collection and fields it reads, so a schema edit has one obvious place to
follow.

Collections wired up (15, all of the non-journal ones the site uses):

`profile`, `projects`, `timeline`, `knowledge-nodes`, `knowledge-edges`,
`skills`, `current-focus`, `weird-thoughts`, `metrics`, `monthly-deep-work`,
`quarterly-reading`, `learning-items`, `books`, `papers`, `social-links`.

The CMS `journal` collection is deliberately NOT read — journal content lives
in Notion. (`posts` and `categories` also exist in the CMS but nothing on this
site renders them, so they are not fetched either.)

Schema details the normalizers handle:

- **List fields are textareas in the CMS.** `technologies`, `achievements`,
  `tags`, and timeline `items` are parsed one entry per line; a single
  comma-separated line also works.
- **Skills** parse as `Skill name: 85` per line (`Name | 85` and a bare `Name`
  also accepted; a missing number defaults to 70).
- **Image fields** are Vercel Blob URL strings — `photo` on profile, `image` on
  projects.
- **Dates** arrive as ISO strings from Mongo; blank dates no longer render
  "Invalid Date".
- **Knowledge edges** pointing at a node id that does not exist are skipped
  instead of crashing the graph.
- **Reading time** falls back to a word-count estimate when left blank.

## 3. The journal stays on Notion

`lib/notion.ts` is unchanged apart from one thing: its local dummy fallback is
gone, so an empty Notion database renders an honest empty state instead of
placeholder posts. The Notion block renderer (`app/notion/`) is back, so entry
pages render the real block tree, with the Markdown path kept as a fallback for
entries that arrive without block data.

`NOTION_TOKEN` and `NOTION_DATABASE_ID` must be set on the server. The token
never reaches the browser: the client reads the journal through this site's own
`/api/journal-entries` route (`lib/journal.ts`), which proxies Notion
server-side. `/feed.xml` reads Notion directly.

## 4. The whole page waits for both sources

`components/providers/cms-provider.tsx` loads the 15 CMS collections and the
Notion journal in one `Promise.all` at the root of the app. Until every one
resolves, nothing else renders — the full-viewport loading screen stays up. If
any source fails, the site shows an error screen with a Try again button rather
than a half-populated page.

This replaced roughly a dozen independent per-section fetches, each with its own
skeleton, each able to quietly serve stale local data. Sections now just read
their slice with `useCms()` — no props to thread, no loading states.

**One thing to configure:** this loads in the browser, so the frontend's origin
must be in the CMS CORS whitelist (CMS admin → CORS). Without it every request
is blocked and you will land on the error screen.

## 5. Dummy data commented out

Disabled — file kept, contents commented out as a field-shape reference, nothing
imports them:

`data/journal.ts` (Notion owns the journal now), `data/projects.ts`, `data/skills.ts`, `data/timeline.ts`,
`data/knowledge-graph.ts`, `data/current-focus.ts`, `data/weird-thoughts.ts`,
`data/metrics.ts`, `data/learning.ts`, `data/books.ts`, `data/papers.ts`

Kept active, as fallbacks only:

- **`data/profile.ts`** — full legal name, display name, initials, role,
  location, email, education, achievements. Two reasons: these change about
  never, and the `<title>` tag, the OG metadata, and the loading screen itself
  all need a name *before* any network request finishes. Where the CMS
  `profile` collection has a value (name, bio, photo) the CMS wins at runtime.
- **`data/social.ts`** — used only if the `social-links` collection is empty.
  An empty footer looks broken in a way a stale handle does not.

## 6. Old fetch plumbing removed

Deleted: `hooks/useCmsData.ts`, `hooks/useRouteData.ts`, `lib/fetcher.ts` — the
per-section fetch-with-fallback hooks that the single load gate replaces.

## 7. Search

The command palette indexes the payload already in memory — projects,
knowledge nodes, skills, books and papers from the CMS, journal entries from
Notion — instead of local snapshots. No second fetch.

## Files added

```
lib/cms.ts                                  CMS data layer (everything but the journal)
lib/journal.ts                              Notion journal fetch (via /api/journal-entries)
components/providers/cms-provider.tsx       global load gate + context (CMS + Notion)
components/providers/loading-screen.tsx     full-viewport loader
components/sections/formal-identity.tsx     /about identity block (client)
```
