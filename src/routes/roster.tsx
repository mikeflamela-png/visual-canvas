import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { roster, type RosterTalent } from "@/lib/site-data";

export const Route = createFileRoute("/roster")({
  head: () => ({
    meta: [
      { title: "Roster — Preview / Reality" },
      { name: "description", content: "A considered roster of talent for editorial and commercial campaigns." },
      { property: "og:title", content: "Roster — Preview / Reality" },
      { property: "og:description", content: "A considered roster of talent for editorial and commercial campaigns." },
    ],
  }),
  component: RosterPage,
});

const filters = ["All", "Male", "Female", "Couple & Family"] as const;
type Filter = (typeof filters)[number];

function RosterPage() {
  const [filter, setFilter] = useState<Filter>("All");

  const items = useMemo<RosterTalent[]>(
    () => (filter === "All" ? roster : roster.filter((r) => r.category === filter)),
    [filter],
  );

  return (
    <div className="pt-16 min-h-screen bg-paper">
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 pt-20 md:pt-28 pb-14">
        <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-6">
          The Roster
        </div>
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr] items-end">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-ink leading-[0.98]">
            Twenty-six faces,<br />
            <span className="italic text-muted-foreground">quietly cast.</span>
          </h1>
          <p className="text-muted-foreground max-w-md md:justify-self-end">
            A working roster of talent we return to — chosen for presence, not
            trend. Available for editorial, commercial and long-form campaigns.
          </p>
        </div>
      </section>

      <div className="sticky top-16 z-30 bg-paper/85 backdrop-blur border-y border-hairline">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-4 flex items-center justify-between gap-6 overflow-x-auto">
          <div className="flex items-center gap-2">
            {filters.map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={
                    "rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em] transition-all duration-500 whitespace-nowrap " +
                    (active
                      ? "bg-ink text-paper"
                      : "text-muted-foreground hover:text-ink")
                  }
                >
                  {f}
                </button>
              );
            })}
          </div>
          <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground whitespace-nowrap">
            {items.length} / {roster.length}
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-16 md:py-20">
        <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: (i % 8) * 0.04 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-card">
                <img
                  src={t.src}
                  alt={t.name}
                  loading="lazy"
                  width={768}
                  height={1024}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
              <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                <div>
                  <div className="font-display text-xl text-ink leading-tight">{t.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{t.location}</div>
                </div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground text-right">
                  {t.category}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      <section className="border-t border-hairline">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28 grid gap-10 md:grid-cols-[1.2fr_1fr] items-end">
          <h2 className="font-display text-4xl md:text-6xl text-ink leading-[1.02]">
            Looking for someone<br />
            <span className="italic text-muted-foreground">specific?</span>
          </h2>
          <div className="md:justify-self-end">
            <p className="text-muted-foreground max-w-md mb-6">
              Our full roster extends beyond this page. Send us the brief and
              we'll return a private shortlist within 48 hours.
            </p>
            <a
              href="/contact"
              className="inline-block rounded-full bg-ink text-paper px-8 py-3 text-sm transition-all hover:tracking-[0.15em]"
            >
              Request a shortlist →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}