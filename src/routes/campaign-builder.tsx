import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useMemo, useState, useEffect } from "react";
import {
  stories, locations, talent, seasons, moods, deliverables, loadingMessages,
} from "@/lib/site-data";

export const Route = createFileRoute("/campaign-builder")({
  head: () => ({ meta: [
    { title: "Campaign Builder — Preview / Reality" },
    { name: "description", content: "Configure your next commercial campaign in seven considered steps." },
  ]}),
  component: Builder,
});

type State = {
  brand: string;
  product: string;
  productImage?: string;
  story?: string;
  location?: string;
  talent?: string;
  season?: string;
  mood?: string;
  deliverable?: string;
  productionType?: "shared" | "dedicated";
};

const steps = ["Brand", "Story", "Location", "Talent", "Season", "Mood", "Deliverables", "Review"] as const;

function Builder() {
  const [step, setStep] = useState(0);
  const [s, setS] = useState<State>({ brand: "", product: "" });
  const [generating, setGenerating] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!generating) return;
    const t = setInterval(() => setMsgIndex((i) => i + 1), 900);
    const end = setTimeout(() => { setGenerating(false); setDone(true); }, loadingMessages.length * 900 + 400);
    return () => { clearInterval(t); clearTimeout(end); };
  }, [generating]);

  const canNext = useMemo(() => {
    switch (step) {
      case 0: return s.brand.trim().length > 0 && s.product.trim().length > 0;
      case 1: return !!s.story;
      case 2: return !!s.location;
      case 3: return !!s.talent;
      case 4: return !!s.season;
      case 5: return !!s.mood;
      case 6: return !!s.deliverable;
      case 7: return !!s.productionType;
      default: return false;
    }
  }, [step, s]);

  return (
    <div className="pt-16 min-h-screen bg-paper">
      {/* progress */}
      <div className="sticky top-16 z-30 bg-paper/85 backdrop-blur border-b border-hairline">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-5">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="uppercase tracking-[0.25em] text-muted-foreground">
              Step {Math.min(step + 1, steps.length)} / {steps.length}
            </span>
            <span className="font-display text-lg text-ink">{steps[step]}</span>
          </div>
          <div className="h-px bg-hairline overflow-hidden">
            <motion.div
              className="h-full bg-ink"
              initial={false}
              animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-16 md:py-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 0 && <StepBrand s={s} set={setS} />}
            {step === 1 && <Grid title="Choose a story" items={stories} value={s.story} onPick={(v) => setS({ ...s, story: v })} />}
            {step === 2 && <ImageGrid title="Choose a location" items={locations} value={s.location} onPick={(v) => setS({ ...s, location: v })} />}
            {step === 3 && <TalentGrid value={s.talent} onPick={(v) => setS({ ...s, talent: v })} />}
            {step === 4 && <ImageGrid title="Season" items={seasons} value={s.season} onPick={(v) => setS({ ...s, season: v })} columns={4} />}
            {step === 5 && <Grid title="Campaign mood" items={moods} value={s.mood} onPick={(v) => setS({ ...s, mood: v })} />}
            {step === 6 && <Deliverables value={s.deliverable} onPick={(v) => setS({ ...s, deliverable: v })} />}
            {step === 7 && <Review s={s} onPick={(v) => setS({ ...s, productionType: v })} onGenerate={() => setGenerating(true)} />}
          </motion.div>
        </AnimatePresence>

        {/* nav */}
        {!generating && !done && (
          <div className="mt-16 flex items-center justify-between">
            <button
              onClick={() => setStep((v) => Math.max(0, v - 1))}
              disabled={step === 0}
              className="text-sm text-muted-foreground disabled:opacity-30 hover:text-ink transition"
            >
              ← Back
            </button>
            {step < steps.length - 1 && (
              <button
                onClick={() => setStep((v) => v + 1)}
                disabled={!canNext}
                className="rounded-full bg-ink text-paper px-8 py-3 text-sm disabled:opacity-30 transition-all hover:pl-9 hover:pr-9"
              >
                Continue →
              </button>
            )}
          </div>
        )}
      </div>

      <AnimatePresence>
        {generating && <LoadingOverlay index={msgIndex} />}
        {done && <DoneOverlay />}
      </AnimatePresence>
    </div>
  );
}

function StepBrand({ s, set }: { s: State; set: (v: State) => void }) {
  return (
    <div className="max-w-2xl">
      <h2 className="font-display text-5xl md:text-6xl text-ink mb-4">Tell us about the brand.</h2>
      <p className="text-muted-foreground mb-12">The essentials. Nothing more, for now.</p>
      <div className="space-y-8">
        <Field label="Brand name">
          <input
            value={s.brand}
            onChange={(e) => set({ ...s, brand: e.target.value })}
            placeholder="e.g. Kohana"
            className="w-full bg-transparent border-b border-hairline focus:border-ink outline-none py-3 text-2xl font-display transition-colors"
          />
        </Field>
        <Field label="Product name">
          <input
            value={s.product}
            onChange={(e) => set({ ...s, product: e.target.value })}
            placeholder="e.g. Linen One-Piece"
            className="w-full bg-transparent border-b border-hairline focus:border-ink outline-none py-3 text-2xl font-display transition-colors"
          />
        </Field>
        <Field label="Product image (optional)">
          <label className="block cursor-pointer">
            <div className="border border-dashed border-hairline rounded-2xl py-10 text-center text-sm text-muted-foreground hover:border-ink transition">
              {s.productImage ? "Uploaded ✓ — replace" : "Drop or select a photo"}
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) set({ ...s, productImage: URL.createObjectURL(f) });
              }}
            />
          </label>
        </Field>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-2">{label}</div>
      {children}
    </div>
  );
}

function Grid({ title, items, value, onPick }: { title: string; items: string[]; value?: string; onPick: (v: string) => void }) {
  return (
    <div>
      <h2 className="font-display text-5xl md:text-6xl text-ink mb-12">{title}.</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => {
          const active = value === it;
          return (
            <button
              key={it}
              onClick={() => onPick(it)}
              className={
                "text-left rounded-2xl border px-6 py-6 transition-all duration-500 " +
                (active
                  ? "bg-ink text-paper border-ink"
                  : "bg-card border-hairline hover:border-ink hover:shadow-soft")
              }
            >
              <div className="font-display text-xl">{it}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ImageGrid({ title, items, value, onPick, columns = 3 }: { title: string; items: { name: string; src: string }[]; value?: string; onPick: (v: string) => void; columns?: number }) {
  return (
    <div>
      <h2 className="font-display text-5xl md:text-6xl text-ink mb-12">{title}.</h2>
      <div className={"grid gap-5 sm:grid-cols-2 " + (columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3")}>
        {items.map((it) => {
          const active = value === it.name;
          return (
            <button
              key={it.name}
              onClick={() => onPick(it.name)}
              className={
                "group relative overflow-hidden rounded-2xl aspect-[4/5] transition-all duration-500 " +
                (active ? "ring-2 ring-ink shadow-lift" : "ring-0 hover:shadow-soft")
              }
            >
              <img src={it.src} alt={it.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-paper text-left">
                <div className="font-display text-2xl">{it.name}</div>
              </div>
              {active && (
                <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-paper text-ink grid place-items-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12l5 5L20 7" /></svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TalentGrid({ value, onPick }: { value?: string; onPick: (v: string) => void }) {
  return (
    <div>
      <h2 className="font-display text-5xl md:text-6xl text-ink mb-12">Choose talent.</h2>
      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">
        {talent.map((t) => {
          const active = value === t.name;
          return (
            <motion.button
              key={t.name}
              onClick={() => onPick(t.name)}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={
                "group relative overflow-hidden rounded-2xl aspect-[3/4] transition-all duration-500 " +
                (active ? "ring-2 ring-ink shadow-lift" : "hover:shadow-soft")
              }
            >
              <img src={t.src} alt={t.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-paper text-left">
                <div className="font-display text-xl">{t.name}</div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function Deliverables({ value, onPick }: { value?: string; onPick: (v: string) => void }) {
  return (
    <div>
      <h2 className="font-display text-5xl md:text-6xl text-ink mb-12">Deliverables.</h2>
      <div className="grid gap-3 md:grid-cols-2">
        {deliverables.map((d) => {
          const active = value === d.name;
          return (
            <button
              key={d.name}
              onClick={() => onPick(d.name)}
              className={
                "text-left rounded-2xl border p-8 transition-all duration-500 " +
                (active ? "bg-ink text-paper border-ink" : "bg-card border-hairline hover:border-ink hover:shadow-soft")
              }
            >
              <div className="font-display text-2xl">{d.name}</div>
              <div className={"mt-2 text-sm " + (active ? "text-paper/70" : "text-muted-foreground")}>{d.desc}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Review({ s, onPick, onGenerate }: { s: State; onPick: (v: "shared" | "dedicated") => void; onGenerate: () => void }) {
  const rows: [string, string | undefined][] = [
    ["Brand", s.brand], ["Product", s.product], ["Story", s.story], ["Location", s.location],
    ["Talent", s.talent], ["Season", s.season], ["Mood", s.mood], ["Deliverables", s.deliverable],
    ["Estimated timeline", "6–10 weeks"],
  ];
  return (
    <div>
      <h2 className="font-display text-5xl md:text-6xl text-ink mb-12">Your campaign.</h2>
      <div className="grid gap-16 md:grid-cols-[1.1fr_1fr]">
        <div className="divide-y divide-hairline">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between py-4">
              <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{k}</span>
              <span className="font-display text-2xl text-ink text-right">{v || "—"}</span>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-2">Production</div>
          <button
            onClick={() => onPick("shared")}
            className={"w-full text-left rounded-2xl p-7 border transition-all duration-500 " + (s.productionType === "shared" ? "bg-ink text-paper border-ink" : "border-hairline hover:border-ink hover:shadow-soft")}
          >
            <div className="font-display text-2xl">Join an existing production</div>
            <div className={"mt-2 text-sm " + (s.productionType === "shared" ? "text-paper/70" : "text-muted-foreground")}>Share crew, talent and travel costs.</div>
            <div className="mt-6 text-sm">Approx. <span className="font-medium">$3,500 – 6,500</span></div>
          </button>
          <button
            onClick={() => onPick("dedicated")}
            className={"w-full text-left rounded-2xl p-7 border transition-all duration-500 " + (s.productionType === "dedicated" ? "bg-ink text-paper border-ink" : "border-hairline hover:border-ink hover:shadow-soft")}
          >
            <div className="font-display text-2xl">Dedicated production</div>
            <div className={"mt-2 text-sm " + (s.productionType === "dedicated" ? "text-paper/70" : "text-muted-foreground")}>Custom dates. Exclusive creative.</div>
            <div className="mt-6 text-sm">Starts around <span className="font-medium">$10,000</span></div>
          </button>
          <button
            onClick={onGenerate}
            disabled={!s.productionType}
            className="mt-6 w-full rounded-full bg-ink text-paper py-4 text-sm disabled:opacity-30 transition-all hover:tracking-[0.15em]"
          >
            Generate campaign →
          </button>
        </div>
      </div>
    </div>
  );
}

function LoadingOverlay({ index }: { index: number }) {
  const msg = loadingMessages[Math.min(index, loadingMessages.length - 1)];
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 grid place-items-center bg-ink text-paper"
    >
      <div className="text-center px-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="mx-auto mb-10 h-16 w-16 rounded-full border border-paper/20 border-t-paper"
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={msg}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl md:text-5xl"
          >
            {msg}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function DoneOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 grid place-items-center bg-paper text-ink px-8"
    >
      <div className="max-w-2xl text-center">
        <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-6">Received</div>
        <h2 className="font-display text-4xl md:text-6xl leading-[1.05]">
          Your campaign request has been received.
          <br />
          <span className="italic text-muted-foreground">We'll prepare your production preview shortly.</span>
        </h2>
        <a href="/" className="mt-12 inline-block text-sm underline underline-offset-4">Return home</a>
      </div>
    </motion.div>
  );
}
