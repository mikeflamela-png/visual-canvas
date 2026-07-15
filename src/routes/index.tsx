import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { heroSlides, campaigns, productions } from "@/lib/site-data";
import { BeforeAfter } from "@/components/site/BeforeAfter";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % heroSlides.length), 5200);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink">
        <AnimatePresence mode="sync">
          <motion.img
            key={i}
            src={heroSlides[i].src}
            alt={heroSlides[i].label}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/20 to-ink/70" />
        <div className="absolute inset-0 flex flex-col justify-end pb-24 md:pb-32">
          <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10 text-paper">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-[11px] uppercase tracking-[0.3em] text-paper/70 mb-6">
                {heroSlides[i].label}
              </div>
              <h1 className="font-display text-[clamp(3rem,7vw,7.5rem)] leading-[0.95] max-w-5xl">
                Design your next campaign
                <br />
                <span className="italic text-paper/80">before</span> you produce it.
              </h1>
              <p className="mt-8 max-w-xl text-paper/80 text-lg leading-relaxed">
                Visualize your next commercial campaign using real locations, real talent,
                and producible concepts \u2014 before committing to production.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  to="/campaign-builder"
                  className="group inline-flex items-center gap-3 rounded-full bg-paper text-ink px-7 py-3.5 text-sm font-medium transition-all hover:pl-8 hover:pr-8"
                >
                  Build my campaign
                  <span className="inline-block transition-transform group-hover:translate-x-1">\u2192</span>
                </Link>
                <Link
                  to="/case-studies"
                  className="inline-flex items-center gap-2 text-paper/90 text-sm border-b border-paper/40 pb-1 hover:border-paper"
                >
                  View case studies
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
        {/* slide indicator */}
        <div className="absolute bottom-8 right-8 flex gap-1.5">
          {heroSlides.map((_, k) => (
            <span
              key={k}
              className={
                "h-px transition-all duration-700 " +
                (k === i ? "w-10 bg-paper" : "w-6 bg-paper/30")
              }
            />
          ))}
        </div>
      </section>

      {/* STATEMENT */}
      <section className="bg-paper py-32 md:py-48">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(2rem,4.5vw,4.5rem)] leading-[1.1] text-ink"
          >
            Traditional production companies ask you to imagine the outcome.
            <br />
            <span className="text-muted-foreground">We show you exactly what you're buying.</span>
          </motion.h2>
        </div>
      </section>

      {/* PREVIEW REALITY */}
      <section className="bg-cream py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="flex items-end justify-between mb-16 gap-6">
            <div>
              <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
                Preview \u2192 Reality
              </div>
              <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] leading-[1] text-ink max-w-3xl">
                See the campaign, then produce it.
              </h2>
            </div>
            <Link
              to="/preview-reality"
              className="hidden md:inline-flex items-center gap-2 text-sm text-ink/70 hover:text-ink border-b border-ink/30 pb-1"
            >
              All campaigns \u2192
            </Link>
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            {campaigns.slice(0, 4).map((c, k) => (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.9, delay: k * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <BeforeAfter before={c.preview} after={c.final} />
                <div className="mt-5 flex items-baseline justify-between">
                  <Link to="/case-studies/$slug" params={{ slug: c.slug }} className="font-display text-3xl text-ink hover:italic">
                    {c.brand}
                  </Link>
                  <span className="text-xs text-muted-foreground uppercase tracking-[0.2em]">{c.location}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{c.tagline}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-16 text-center md:hidden">
            <Link to="/preview-reality" className="text-sm underline underline-offset-4">
              View all campaigns
            </Link>
          </div>
        </div>
      </section>

      {/* CAMPAIGN BUILDER TEASER */}
      <section className="bg-ink text-paper py-32 md:py-48">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid gap-16 md:grid-cols-[1fr_1fr] items-center">
          <div>
            <div className="text-[11px] uppercase tracking-[0.3em] text-paper/50 mb-6">
              The Campaign Builder
            </div>
            <h2 className="font-display text-[clamp(2.5rem,5vw,5.5rem)] leading-[1]">
              Configure your campaign like a Porsche.
            </h2>
            <p className="mt-6 text-paper/70 max-w-md leading-relaxed">
              Seven steps. Brand, story, location, talent, season, mood, deliverables.
              Beautifully considered, quietly powerful.
            </p>
            <Link
              to="/campaign-builder"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-paper text-ink px-7 py-3.5 text-sm font-medium"
            >
              Start building \u2192
            </Link>
          </div>
          <div className="space-y-3">
            {["Brand", "Story", "Location", "Talent", "Season", "Mood", "Deliverables"].map((s, k) => (
              <motion.div
                key={s}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: k * 0.06 }}
                className="flex items-center justify-between rounded-2xl border border-white/10 px-6 py-4"
              >
                <span className="text-sm text-paper/80">Step {k + 1}</span>
                <span className="font-display text-2xl">{s}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTIONS */}
      <section className="bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="flex items-end justify-between mb-14">
            <div>
              <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Upcoming</div>
              <h2 className="font-display text-[clamp(2rem,4.5vw,4.5rem)] leading-[1] text-ink">
                Productions you can join.
              </h2>
            </div>
            <Link to="/productions" className="hidden md:inline text-sm border-b border-ink/30 pb-1">All productions \u2192</Link>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-6 -mx-6 md:-mx-10 px-6 md:px-10 snap-x">
            {productions.map((p) => (
              <div key={p.location} className="min-w-[300px] md:min-w-[360px] snap-start">
                <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-cream">
                  <img src={p.src} alt={p.location} className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105" loading="lazy" />
                </div>
                <div className="mt-5">
                  <div className="flex items-baseline justify-between">
                    <div className="font-display text-2xl text-ink">{p.location}</div>
                    <div className="text-xs text-muted-foreground">{p.spots} spots</div>
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {p.month} \u00b7 {p.season}
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground/80">{p.brands}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
