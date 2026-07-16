import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { slotRegistry, type ImageSlot } from "@/lib/site-data";
import {
  clearAllOverrides,
  clearOverride,
  getOverrides,
  replaceOverrides,
  setOverride,
  useImageOverrides,
} from "@/lib/image-overrides";

export const Route = createFileRoute("/image-manager")({
  head: () => ({
    meta: [
      { title: "Image Manager — Ebb & Flow Media" },
      { name: "description", content: "Upload or link images and map them to slots across the site." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ImageManagerPage,
});

const MAX_UPLOAD_BYTES = 2 * 1024 * 1024; // 2MB soft cap for data-URL storage

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = () => reject(r.error);
    r.readAsDataURL(file);
  });
}

function groupSlots(slots: ImageSlot[]) {
  const map = new Map<string, ImageSlot[]>();
  for (const s of slots) {
    if (!map.has(s.group)) map.set(s.group, []);
    map.get(s.group)!.push(s);
  }
  return Array.from(map.entries());
}

function ImageManagerPage() {
  const overrides = useImageOverrides();
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const importRef = useRef<HTMLInputElement | null>(null);

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? slotRegistry.filter(
          (s) =>
            s.label.toLowerCase().includes(q) ||
            s.id.toLowerCase().includes(q) ||
            s.group.toLowerCase().includes(q),
        )
      : slotRegistry;
    return groupSlots(filtered);
  }, [query]);

  const totalOverridden = Object.keys(overrides).length;

  async function handleFile(id: string, file: File) {
    if (file.size > MAX_UPLOAD_BYTES) {
      setNotice(
        `"${file.name}" is ${(file.size / 1024 / 1024).toFixed(1)}MB — over the 2MB cap for uploaded files. Paste a URL instead (any CDN, Unsplash, etc.).`,
      );
      return;
    }
    try {
      const dataUrl = await fileToDataUrl(file);
      setOverride(id, dataUrl);
      setNotice(null);
    } catch {
      setNotice("Couldn't read that file. Try a different image.");
    }
  }

  function handleUrl(id: string, url: string) {
    const v = url.trim();
    if (!v) return;
    setOverride(id, v);
    setNotice(null);
  }

  function handleExport() {
    const blob = new Blob([JSON.stringify(getOverrides(), null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "image-overrides.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleImport(file: File) {
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        replaceOverrides(parsed as Record<string, string>);
        setNotice("Imported overrides.");
      } else {
        setNotice("Invalid JSON — expected an object of { slotId: url }.");
      }
    } catch {
      setNotice("Couldn't parse that JSON file.");
    }
  }

  return (
    <div className="pt-24 min-h-screen bg-paper">
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 pt-10 pb-6">
        <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
          Admin · Not linked from public nav
        </div>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h1 className="font-display text-4xl md:text-6xl text-ink leading-[0.98]">
            Image manager
          </h1>
          <div className="text-sm text-muted-foreground">
            {totalOverridden} / {slotRegistry.length} slots overridden
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Upload files or paste URLs to override any image slot on the site.
          Changes apply live and persist in your browser. Uploaded files are
          stored as data URLs (2MB cap) — for anything larger, host on a CDN
          and paste the URL.
        </p>
      </section>

      <section className="sticky top-16 z-30 bg-paper/90 backdrop-blur border-y border-hairline">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-4 flex flex-wrap items-center gap-3">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter slots…"
            className="flex-1 min-w-[220px] rounded-full border border-hairline bg-transparent px-4 py-2 text-sm outline-none focus:border-ink"
          />
          <button
            onClick={handleExport}
            className="rounded-full border border-hairline px-4 py-2 text-xs uppercase tracking-[0.2em] hover:border-ink"
          >
            Export JSON
          </button>
          <button
            onClick={() => importRef.current?.click()}
            className="rounded-full border border-hairline px-4 py-2 text-xs uppercase tracking-[0.2em] hover:border-ink"
          >
            Import JSON
          </button>
          <input
            ref={importRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleImport(f);
              e.currentTarget.value = "";
            }}
          />
          <button
            onClick={() => {
              if (confirm("Clear all image overrides? Originals will return.")) {
                clearAllOverrides();
                setNotice("All overrides cleared.");
              }
            }}
            className="rounded-full bg-ink text-paper px-4 py-2 text-xs uppercase tracking-[0.2em]"
          >
            Reset all
          </button>
        </div>
        {notice && (
          <div className="mx-auto max-w-[1400px] px-6 md:px-10 pb-3 text-xs text-muted-foreground">
            {notice}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-12 space-y-16">
        {groups.map(([group, slots]) => (
          <div key={group}>
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="font-display text-2xl md:text-3xl text-ink">{group}</h2>
              <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                {slots.length} slot{slots.length === 1 ? "" : "s"}
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {slots.map((slot) => {
                const current = overrides[slot.id] ?? slot.fallback;
                const isOverridden = Boolean(overrides[slot.id]);
                return (
                  <SlotCard
                    key={slot.id}
                    slot={slot}
                    currentSrc={current}
                    isOverridden={isOverridden}
                    onFile={(f) => handleFile(slot.id, f)}
                    onUrl={(u) => handleUrl(slot.id, u)}
                    onReset={() => clearOverride(slot.id)}
                  />
                );
              })}
            </div>
          </div>
        ))}
        {groups.length === 0 && (
          <div className="text-center text-muted-foreground py-24">
            No slots match "{query}".
          </div>
        )}
      </section>
    </div>
  );
}

function SlotCard({
  slot,
  currentSrc,
  isOverridden,
  onFile,
  onUrl,
  onReset,
}: {
  slot: ImageSlot;
  currentSrc: string;
  isOverridden: boolean;
  onFile: (f: File) => void;
  onUrl: (u: string) => void;
  onReset: () => void;
}) {
  const [url, setUrl] = useState("");
  const fileRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="rounded-2xl border border-hairline bg-card p-4 flex flex-col gap-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-cream">
        <img
          src={currentSrc}
          alt={slot.label}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        {isOverridden && (
          <div className="absolute top-2 left-2 rounded-full bg-ink text-paper px-2 py-0.5 text-[10px] uppercase tracking-[0.2em]">
            Overridden
          </div>
        )}
      </div>

      <div>
        <div className="font-display text-lg text-ink leading-tight">{slot.label}</div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1 break-all">
          {slot.id}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <button
            onClick={() => fileRef.current?.click()}
            className="flex-1 rounded-full border border-hairline px-3 py-2 text-xs uppercase tracking-[0.2em] hover:border-ink"
          >
            Upload
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onFile(f);
              e.currentTarget.value = "";
            }}
          />
          <button
            onClick={onReset}
            disabled={!isOverridden}
            className="rounded-full border border-hairline px-3 py-2 text-xs uppercase tracking-[0.2em] disabled:opacity-40 hover:border-ink"
          >
            Reset
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onUrl(url);
            setUrl("");
          }}
          className="flex gap-2"
        >
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste image URL…"
            className="flex-1 min-w-0 rounded-full border border-hairline bg-transparent px-3 py-2 text-xs outline-none focus:border-ink"
          />
          <button
            type="submit"
            className="rounded-full bg-ink text-paper px-3 py-2 text-xs uppercase tracking-[0.2em]"
          >
            Set
          </button>
        </form>
      </div>
    </div>
  );
}