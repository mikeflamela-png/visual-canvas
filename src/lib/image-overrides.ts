import { useSyncExternalStore } from "react";

const KEY = "ebbflow.image-overrides.v1";

type Overrides = Record<string, string>;

function read(): Overrides {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Overrides) : {};
  } catch {
    return {};
  }
}

let cache: Overrides = read();
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function persist() {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(cache));
  } catch {
    /* quota — swallow, UI warns separately */
  }
}

export function getOverrides(): Overrides {
  return cache;
}

export function setOverride(id: string, url: string) {
  cache = { ...cache, [id]: url };
  persist();
  emit();
}

export function clearOverride(id: string) {
  if (!(id in cache)) return;
  const next = { ...cache };
  delete next[id];
  cache = next;
  persist();
  emit();
}

export function clearAllOverrides() {
  cache = {};
  persist();
  emit();
}

export function replaceOverrides(next: Overrides) {
  cache = { ...next };
  persist();
  emit();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function getSnapshot() {
  return cache;
}

function getServerSnapshot(): Overrides {
  return {};
}

export function useImageOverrides(): Overrides {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function resolveImage(id: string | undefined, fallback: string): string {
  if (!id) return fallback;
  const o = cache[id];
  return o && o.length > 0 ? o : fallback;
}

/** Hook variant that also subscribes so the component re-renders on change. */
export function useResolvedImage(id: string | undefined, fallback: string): string {
  const o = useImageOverrides();
  if (!id) return fallback;
  return o[id] && o[id].length > 0 ? o[id] : fallback;
}