"use client";

import { products } from "@/lib/brand/products";
import type { AppMode } from "@/lib/layout/types";

type ModeSwitcherProps = {
  mode: AppMode;
  onChange: (mode: AppMode) => void;
  className?: string;
};

const modes: { id: AppMode; label: string; hint: string }[] = [
  {
    id: "kiosk",
    label: products.bifrost.name,
    hint: products.bifrost.gloss,
  },
  {
    id: "stats",
    label: products.heimdall.name,
    hint: products.heimdall.gloss,
  },
  {
    id: "monitoring",
    label: products.gjallarhorn.name,
    hint: products.gjallarhorn.gloss,
  },
];

export function ModeSwitcher({
  mode,
  onChange,
  className = "",
}: ModeSwitcherProps) {
  return (
    <div
      className={`hidden md:inline-flex rounded-xl border border-border bg-muted/70 p-1 shadow-xs ${className}`}
      role="tablist"
      aria-label="Раздел"
    >
      {modes.map((item) => {
        const active = item.id === mode;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active}
            title={item.hint}
            onClick={() => onChange(item.id)}
            className={`rounded-lg px-3.5 py-2 text-sm transition duration-200 active:scale-[0.98] sm:px-4 ${
              active
                ? "heimdall-action font-medium shadow-sm"
                : "text-fg-muted hover:text-foreground"
            }`}
          >
            <span className="font-brand block leading-none tracking-tight font-bold">{item.label}</span>
            <span className="mt-1 block text-[0.62rem] uppercase tracking-[0.12em] opacity-70">
              {item.hint}
            </span>
          </button>
        );
      })}
    </div>
  );
}
