import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { campaigns } from "@/lib/site-data";
import { BeforeAfter } from "@/components/site/BeforeAfter";

export const Route = createFileRoute("/case-studies/$slug")({
  head: ({ params }) => {
    const c = campaigns.find((x) => x.slug === params.slug);
    return { meta: [
      { title: c ? `${c.brand} \u2014 Case Study` : "Case Study" },
      { name: "description", content: c?.story ?? "" },
    ]};
  },
  component: CaseDetail,
  notFoundComponent: () => (
    <div className="pt-40 text-center px-6"><div className="font-display text-5xl">Campaign not found.</div><Link to="/case-studies" className="mt-6 inline-block underline">All case studies</Link></div>
  ),
});

function CaseDetail() {
  const { slug } = Route.useParams();
  const c = campaigns.find((x) => x.slug === slug);
  if (!c) throw notFound();

  return (
    <article className="bg-paper">
      <div className="relative h-[80svh] min-h-[520px] w-full overflow-hidden bg-ink">
        <img src={c.final} alt={c.brand} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/60" />
        <div className="absolute inset-0 flex flex-col justify-end pb-16 md:pb-24">
          <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10 text-paper">
            <div className="text-[11px] uppercase tracking-[0.3em] text-paper/70 mb-4">{c.location}</div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(3.5rem,10vw,10rem)] leading-[0.9]"
            >
              {c.brand}
            </motion.h1>
            <p className="mt-4 italic text-xl md:text-2xl text-paper/85 max-w-xl">{c.tagline}</p>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-4xl px-6 md:px-10 py-24 md:py-32">
        <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-6">Campaign story</div>
        <p className="font-display text-3xl md:text-5xl leading-[1.15] text-ink">{c.story}</p>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 md:px-10 pb-24">
        <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-8">AI Preview \u2192 Final</div>
        <BeforeAfter before={c.preview} after={c.final} />
      </section>

      <section className="mx-auto max-w-[1400px] px-6 md:px-10 pb-24 grid gap-6 md:grid-cols-2">
        <img src={c.final} className="rounded-2xl w-full aspect-[4/5] object-cover" alt="" loading="lazy" />
        <img src={c.preview} className="rounded-2xl w-full aspect-[4/5] object-cover" alt="" loading="lazy" />
      </section>

      <section className="bg-cream py-24">
        <div className="mx-auto max-w-4xl px-6 md:px-10 grid gap-16 md:grid-cols-2 text-sm">
          <div>
            <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Shot list</div>
            <ul className="space-y-2 text-ink/80">
              <li>Hero still \u00b7 location wide</li>
              <li>Product-forward detail set</li>
              <li>Talent portrait sequence</li>
              <li>Golden-hour lifestyle motion</li>
              <li>Behind-the-scenes documentary</li>
            </ul>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Deliverables</div>
            <ul className="space-y-2 text-ink/80">
              <li>28 finished stills</li>
              <li>3 short films (15/30/60s)</li>
              <li>Full social package, platform native</li>
              <li>Extended broadcast license</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 md:px-10 py-24 text-center">
        <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-6">Client</div>
        <p className="font-display text-3xl md:text-5xl leading-[1.2] text-ink italic">
          "They showed us the campaign before they made it. We knew, before signing anything, that it was right."
        </p>
        <div className="mt-6 text-sm text-muted-foreground">\u2014 {c.brand} creative team</div>
      </section>

      <div className="text-center pb-32">
        <Link to="/case-studies" className="text-sm underline underline-offset-4">All case studies</Link>
      </div>
    </article>
  );
}
