import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";
import { motion } from "motion/react";
import { campaigns } from "@/lib/site-data";

export const Route = createFileRoute("/case-studies")({
  head: () => ({ meta: [
    { title: "Case Studies — Preview / Reality" },
    { name: "description", content: "Editorial case studies of every campaign we've produced." },
  ]}),
  component: CaseIndex,
});

function CaseIndex() {
  const matches = useMatches();
  const onChild = matches.some((m) => m.routeId === "/case-studies/$slug");
  if (onChild) return <Outlet />;

  return (
    <div className="pt-32 bg-paper">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 pb-20">
        <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-6">Case Studies</div>
        <h1 className="font-display text-[clamp(3rem,7vw,7rem)] leading-[0.95] text-ink max-w-5xl">
          Campaigns we made real.
        </h1>
      </div>
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 pb-32">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((c, k) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: k * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link to="/case-studies/$slug" params={{ slug: c.slug }} className="group block">
                <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-cream">
                  <img src={c.final} alt={c.brand} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="mt-5 flex items-baseline justify-between">
                  <div className="font-display text-3xl text-ink group-hover:italic transition">{c.brand}</div>
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{c.location}</div>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">{c.tagline}</div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
