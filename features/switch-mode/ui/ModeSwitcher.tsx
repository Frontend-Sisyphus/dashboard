"use client";

import { products } from "@/entities/brand";
import type { AppMode } from "@/shared/lib/layout";

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
      className={`hidden md:inline-flex items-center rounded-2xl border border-[var(--ui-color-border)] bg-[var(--ui-color-surface-soft)] p-1.5 shadow-[var(--ui-shadow-sm)] ${className}`}
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
            className={`rounded-xl px-4 py-2 text-sm transition-all duration-200 active:scale-[0.98] cursor-pointer ${
              active
                ? "bg-[var(--ui-color-surface)] text-[var(--ui-color-brand-strong)] font-semibold shadow-xs"
                : "text-[var(--ui-color-text-muted)] hover:text-[var(--ui-color-text)]"
            }`}
          >
            <span className="block leading-none tracking-tight font-bold">{item.label}</span>
            <span className="mt-1 block text-[0.62rem] uppercase tracking-[0.12em] opacity-80">
              {item.hint}
            </span>
          </button>
        );
      })}
    </div>
  );
}
