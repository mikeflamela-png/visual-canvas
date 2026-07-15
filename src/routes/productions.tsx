import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { productions } from "@/lib/site-data";

export const Route = createFileRoute("/productions")({
  head: () => ({ meta: [
    { title: "Upcoming Productions \u2014 Preview / Reality" },
    { name: "description", content: "Join an upcoming production. Shared crew, shared travel, exclusive creative." },
  ]}),
  component: PageP,
});

function PageP() {
  return (
    <div className="pt-32 bg-paper">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 pb-20">
        <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-6">Upcoming</div>
        <h1 className="font-display text-[clamp(3rem,7vw,7rem)] leading-[0.95] text-ink max-w-5xl">
          Productions you can join.
        </h1>
        <p className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
          Share crew, talent, and travel across brands that fit together.
        </p>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 md:px-10 pb-32">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {productions.map((p, k) => (
            <motion.article
              key={p.location}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: k * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-cream">
                <img src={p.src} alt={p.location} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="mt-6 flex items-baseline justify-between">
                <div className="font-display text-3xl text-ink">{p.location}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{p.spots} spots</div>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{p.month} \u00b7 {p.season}</div>
              <div className="mt-4 text-xs text-muted-foreground/80 border-t border-hairline pt-4">
                Best for: {p.brands}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
