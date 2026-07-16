## Goal

A single admin-style screen at `/image-manager` where you can upload files or paste URLs and map them to every image slot across the site (hero slides, campaigns, roster, locations, seasons, productions). Overrides apply immediately in the live preview and persist across reloads. Non-destructive — original bundled assets stay as fallbacks.

## How it works

- Every image slot gets a stable ID (e.g. `hero.tahoe`, `campaign.taos.preview`, `roster.micah`, `location.napa`, `season.spring`, `production.ibiza`).
- A tiny store (`src/lib/image-overrides.ts`) reads/writes `{ [slotId]: url }` in `localStorage` and exposes a `useImageOverride(slotId, fallback)` hook + `resolveImage(slotId, fallback)` helper.
- `src/lib/site-data.ts` gets a parallel export listing each slot with `{ id, label, group, fallback }`, so the manager can render without hardcoding.
- Consumer components (hero carousel, case studies grid, roster, locations, seasons, productions) swap `item.src` → `resolveImage(item.id, item.src)`.

## The manager screen (`/image-manager`)

- Grouped sections: Hero, Case Studies (preview/final pairs), Roster, Locations, Seasons, Productions.
- Each slot row: current thumbnail (override or fallback), label, and two inputs:
  1. **Upload** — file picker; file is read as a data URL and stored (with a per-file size cap ~2MB to stay within localStorage limits; larger files prompt to use a URL instead).
  2. **Paste URL** — any https link (Unsplash, Cloudinary, your CDN, etc.).
- Per-row **Reset** button clears the override.
- Global toolbar: **Export JSON**, **Import JSON**, **Reset all**. Export/import lets you move mappings between browsers.
- Live preview: changes reflect instantly across the site because components read through `resolveImage` on render (store uses a subscription so React re-renders).

## Storage strategy

- localStorage keyed as `ebbflow.image-overrides.v1`.
- Data-URL uploads kept under a soft cap; over the cap the UI nudges toward a URL. This keeps everything client-side with zero backend for now.
- Structured so a future swap to Lovable Cloud storage is a one-file change (replace the store's read/write with server calls; slot IDs stay stable).

## Files

- new `src/lib/image-overrides.ts` — store, hook, `resolveImage`, JSON import/export.
- edit `src/lib/site-data.ts` — add `id` to each item and a `slotRegistry` export.
- new `src/routes/image-manager.tsx` — the screen (grouped list, upload/URL inputs, reset, import/export, unlisted from public nav).
- edit consumer routes/components to use `resolveImage(id, fallback)`:
  - `src/routes/index.tsx` (hero carousel)
  - `src/routes/case-studies.tsx` + `case-studies.$slug.tsx`
  - `src/routes/roster.tsx`
  - `src/routes/preview-reality.tsx` (if it renders campaigns)
  - `src/routes/productions.tsx`
  - anywhere `locations` / `seasons` render
- no nav link added by default; reachable via `/image-manager` (can add a link later if you want).

## Out of scope

- No auth/gating (single-user local tool). Can add a passcode gate later.
- No server-side persistence — overrides live in your browser until you export/import or we wire Lovable Cloud storage.
