"use client";

import { products } from "@/lib/brand/products";
import type { AppMode } from "@/lib/layout/types";

type ModeSwitcherProps = {
  mode: AppMode;
  onChange: (mode: AppMode) => void;
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
];

export function ModeSwitcher({ mode, onChange }: ModeSwitcherProps) {
  return (
    <div
      className="inline-flex border border-border bg-muted/70 p-1"
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
            className={`px-3.5 py-2 text-sm transition duration-200 active:scale-[0.98] sm:px-4 ${
              active
                ? "heimdall-action font-medium shadow-sm"
                : "text-fg-muted hover:text-foreground"
            }`}
          >
            <span className="block leading-none tracking-tight">{item.label}</span>
            <span className="mt-1 block text-[0.62rem] uppercase tracking-[0.12em] opacity-70">
              {item.hint}
            </span>
          </button>
        );
      })}
    </div>
  );
}
