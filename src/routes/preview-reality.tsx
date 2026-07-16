import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { campaigns, campaignSlotId } from "@/lib/site-data";
import { resolveImage, useImageOverrides } from "@/lib/image-overrides";
import { BeforeAfter } from "@/components/site/BeforeAfter";

export const Route = createFileRoute("/preview-reality")({
  head: () => ({ meta: [
    { title: "Preview → Reality — Campaigns" },
    { name: "description", content: "Drag between our previewed campaigns and the final produced photography." },
  ]}),
  component: PageC,
});

function PageC() {
  useImageOverrides();
  return (
    <div className="pt-32 bg-paper">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 pb-24">
        <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-6">Preview → Reality</div>
        <h1 className="font-display text-[clamp(3rem,7vw,7rem)] leading-[0.95] text-ink max-w-5xl">
          What we previewed. What we produced.
        </h1>
        <p className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
          Every campaign begins with a preview — real locations, real talent, real
          concepts. Drag to see how each one became reality.
        </p>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 md:px-10 pb-32">
        <div className="grid gap-16 md:gap-24">
          {campaigns.map((c, i) => (
            <motion.article
              key={c.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className={"grid gap-10 md:gap-16 items-center md:grid-cols-2 " + (i % 2 === 1 ? "md:[&>*:first-child]:order-2" : "")}
            >
              <BeforeAfter
                before={resolveImage(campaignSlotId(c.slug, "preview"), c.preview)}
                after={resolveImage(campaignSlotId(c.slug, "final"), c.final)}
              />
              <div>
                <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-4">{c.location}</div>
                <h2 className="font-display text-5xl md:text-7xl text-ink leading-[1]">{c.brand}</h2>
                <p className="mt-4 text-xl italic text-muted-foreground">{c.tagline}</p>
                <p className="mt-8 max-w-md text-ink/80 leading-relaxed">{c.story}</p>
                <Link
                  to="/case-studies/$slug"
                  params={{ slug: c.slug }}
                  className="mt-10 inline-flex items-center gap-3 rounded-full bg-ink text-paper px-7 py-3 text-sm hover:pl-8 hover:pr-8 transition-all"
                >
                  Open case study →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
