import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-ink text-paper mt-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr] items-start">
          <div>
            <div className="font-display text-3xl md:text-4xl">Preview / Reality</div>
            <p className="mt-4 max-w-sm text-paper/60 text-sm leading-relaxed">
              A commercial production studio for brands that want to see their next
              campaign before they commit to producing it.
            </p>
          </div>
          <div className="text-sm space-y-3">
            <div className="text-paper/40 uppercase tracking-[0.15em] text-xs mb-4">Studio</div>
            <Link to="/campaign-builder" className="block text-paper/80 hover:text-paper">Campaign Builder</Link>
            <Link to="/preview-reality" className="block text-paper/80 hover:text-paper">Preview \u2192 Reality</Link>
            <Link to="/productions" className="block text-paper/80 hover:text-paper">Upcoming Productions</Link>
            <Link to="/case-studies" className="block text-paper/80 hover:text-paper">Case Studies</Link>
          </div>
          <div className="text-sm space-y-3">
            <div className="text-paper/40 uppercase tracking-[0.15em] text-xs mb-4">Studio</div>
            <Link to="/about" className="block text-paper/80 hover:text-paper">About</Link>
            <Link to="/contact" className="block text-paper/80 hover:text-paper">Contact</Link>
            <a href="mailto:hello@preview-reality.co" className="block text-paper/80 hover:text-paper">hello@preview-reality.co</a>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap gap-4 justify-between text-xs text-paper/40">
          <span>© {new Date().getFullYear()} Preview / Reality Studio</span>
          <span>Designed in California.</span>
        </div>
      </div>
    </footer>
  );
}
