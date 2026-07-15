import { useCallback, useRef, useState } from "react";

export function BeforeAfter({
  before,
  after,
  beforeLabel = "Preview",
  afterLabel = "Reality",
}: {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-ink/5 select-none touch-none"
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target as Element).setPointerCapture?.(e.pointerId);
        update(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && update(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <img
        src={after}
        alt={afterLabel}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${pos}%` }}
      >
        <img
          src={before}
          alt={beforeLabel}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ width: `${(100 / pos) * 100}%`, maxWidth: "none" }}
          loading="lazy"
        />
      </div>
      <div className="pointer-events-none absolute top-4 left-4 text-[10px] tracking-[0.2em] uppercase bg-paper/85 text-ink px-2.5 py-1 rounded-full">
        {beforeLabel}
      </div>
      <div className="pointer-events-none absolute top-4 right-4 text-[10px] tracking-[0.2em] uppercase bg-ink/85 text-paper px-2.5 py-1 rounded-full">
        {afterLabel}
      </div>
      <div
        className="absolute inset-y-0 w-px bg-paper/90 shadow-[0_0_20px_rgba(0,0,0,0.35)]"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-paper text-ink grid place-items-center shadow-soft">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
          </svg>
        </div>
      </div>
    </div>
  );
}
