"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

type Props = { toDark: string; toLight: string };

function subscribe(cb: () => void) {
  const obs = new MutationObserver(cb);
  obs.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => obs.disconnect();
}

export function ThemeToggle({ toDark, toLight }: Props) {
  const dark = useSyncExternalStore(
    subscribe,
    () => document.documentElement.classList.contains("dark"),
    () => false,
  );

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  return (
    <button
      id="theme-toggle"
      type="button"
      onClick={toggle}
      aria-label={dark ? toLight : toDark}
      className="grid size-11 place-items-center rounded-full border border-line bg-surface text-fg transition hover:border-accent hover:text-accent"
    >
      {dark ? <Sun size={20} aria-hidden /> : <Moon size={20} aria-hidden />}
    </button>
  );
}
