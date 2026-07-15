import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/campaign-builder", label: "Campaign Builder" },
  { to: "/preview-reality", label: "Preview → Reality" },
  { to: "/productions", label: "Productions" },
  { to: "/roster", label: "Roster" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 bg-ink " +
        (scrolled ? "border-b border-white/5 shadow-soft" : "")
      }
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 md:px-10">
        <Link to="/" className="font-display text-xl text-paper tracking-tight">
          Preview<span className="text-paper/50"> / </span>Reality
        </Link>
        <nav className="hidden lg:flex items-center gap-8">
          {links.slice(1).map((l) => {
            const active = pathname === l.to || (l.to !== "/" && pathname.startsWith(l.to));
            return (
              <Link
                key={l.to}
                to={l.to}
                className={
                  "text-[13px] tracking-wide transition-colors " +
                  (active ? "text-paper" : "text-paper/60 hover:text-paper")
                }
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden text-paper/80 text-sm"
          aria-label="Menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-white/5 bg-ink/95 backdrop-blur-xl">
          <div className="flex flex-col px-6 py-4">
            {links.slice(1).map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="py-3 text-paper/80 text-base border-b border-white/5 last:border-0"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
