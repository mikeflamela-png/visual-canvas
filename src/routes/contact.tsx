import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact \u2014 Preview / Reality" },
    { name: "description", content: "Talk to the studio. We reply within a business day." },
  ]}),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="pt-40 pb-32 bg-paper min-h-screen">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-8">Contact</div>
        <h1 className="font-display text-[clamp(3rem,6vw,6rem)] leading-[1] text-ink">Talk to the studio.</h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-xl">
          Tell us about your brand. We reply within a business day.
        </p>

        {sent ? (
          <div className="mt-16 rounded-2xl border border-hairline p-10 text-center">
            <div className="font-display text-3xl text-ink">Thank you.</div>
            <p className="mt-3 text-muted-foreground">We'll be in touch shortly.</p>
          </div>
        ) : (
          <form
            className="mt-16 space-y-10"
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          >
            {[
              { name: "name", label: "Your name", type: "text" },
              { name: "brand", label: "Brand", type: "text" },
              { name: "email", label: "Email", type: "email" },
            ].map((f) => (
              <label key={f.name} className="block">
                <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-2">{f.label}</div>
                <input required type={f.type} name={f.name} className="w-full bg-transparent border-b border-hairline focus:border-ink outline-none py-3 text-xl transition-colors" />
              </label>
            ))}
            <label className="block">
              <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-2">Message</div>
              <textarea rows={4} className="w-full bg-transparent border-b border-hairline focus:border-ink outline-none py-3 text-xl transition-colors resize-none" />
            </label>
            <button className="rounded-full bg-ink text-paper px-8 py-3.5 text-sm hover:pl-9 hover:pr-9 transition-all">
              Send message \u2192
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
