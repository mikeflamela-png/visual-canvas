import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About — Preview / Reality" },
    { name: "description", content: "A commercial production studio built around one idea: see the work before you buy it." },
  ]}),
  component: About,
});

function About() {
  return (
    <div className="pt-40 pb-32 bg-paper">
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-8">About</div>
        <h1 className="font-display text-[clamp(3rem,6vw,6rem)] leading-[1] text-ink">
          We built the studio we wanted to hire.
        </h1>
        <div className="mt-16 space-y-8 text-lg text-ink/80 leading-relaxed max-w-2xl">
          <p>
            Commercial production is an act of faith. Brands invest \$50k, \$500k, sometimes
            more — without ever seeing what they're buying.
          </p>
          <p>
            We changed that. Every campaign starts with a preview: real locations, real
            talent, a producible concept. You see it before you buy it.
          </p>
          <p>
            Then we go make it. Not something like it. It.
          </p>
        </div>
      </div>
    </div>
  );
}
