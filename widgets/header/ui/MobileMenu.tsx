"use client";

import { useEffect } from "react";
import { ProductLogo, products, type ProductId } from "@/entities/brand";
import { ThemeSwitcher } from "@/features/switch-theme";
import type { AppMode } from "@/shared/lib/layout";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  currentMode: AppMode;
  onSelectMode: (mode: AppMode) => void;
};

const productList: {
  id: ProductId;
  mode: AppMode;
  name: string;
  gloss: string;
  tagline: string;
  statusPill: string;
}[] = [
  {
    id: "bifrost",
    mode: "kiosk",
    name: products.bifrost.name,
    gloss: products.bifrost.gloss,
    tagline: products.bifrost.tagline,
    statusPill: products.bifrost.statusPill,
  },
  {
    id: "heimdall",
    mode: "stats",
    name: products.heimdall.name,
    gloss: products.heimdall.gloss,
    tagline: products.heimdall.tagline,
    statusPill: products.heimdall.statusPill,
  },
  {
    id: "gjallarhorn",
    mode: "monitoring",
    name: products.gjallarhorn.name,
    gloss: products.gjallarhorn.gloss,
    tagline: products.gjallarhorn.tagline,
    statusPill: products.gjallarhorn.statusPill,
  },
];

export function MobileMenu({
  isOpen,
  onClose,
  currentMode,
  onSelectMode,
}: MobileMenuProps) {
  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      const orig = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = orig;
      };
    }
  }, [isOpen]);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-md transition-opacity md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Мобильное меню навигации"
      onClick={onClose}
    >
      <div
        className="relative max-h-[88vh] w-full overflow-y-auto rounded-t-3xl border-t border-border bg-elevated/95 p-5 shadow-2xl backdrop-blur-xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Grab Handle */}
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-border" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <div>
            <h3 className="font-brand text-lg font-bold tracking-tight text-foreground">
              Экосистема ИТС
            </h3>
            <p className="text-xs text-fg-muted">
              Выберите рабочий режим платформы
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-muted/60 text-fg-muted hover:text-foreground active:scale-95 transition cursor-pointer"
            aria-label="Закрыть меню"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Product Mode Cards */}
        <div className="mt-4 flex flex-col gap-3" role="list">
          {productList.map((item) => {
            const isActive = item.mode === currentMode;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelectMode(item.mode);
                  onClose();
                }}
                className={`flex w-full items-center gap-3.5 rounded-xl border p-3.5 text-left transition-all active:scale-[0.99] cursor-pointer ${
                  isActive
                    ? "border-primary bg-primary/10 shadow-sm"
                    : "border-border bg-muted/40 hover:border-primary/40 hover:bg-muted/70"
                }`}
              >
                <ProductLogo
                  product={item.id}
                  className="h-11 w-11 shrink-0 rounded-lg"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-brand text-base font-bold text-foreground">
                      {item.name}
                    </span>
                    <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-fg-muted">
                      {item.gloss}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-fg-muted">
                    {item.tagline}
                  </p>
                </div>

                {isActive ? (
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[#042428] text-xs font-bold shadow-xs">
                    <svg className="h-3.5 w-3.5 stroke-[3]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                ) : (
                  <svg className="h-4 w-4 text-fg-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>

        {/* Mobile Theme Control */}
        <div className="mt-5 flex items-center justify-between rounded-xl border border-border/80 bg-muted/40 p-3">
          <div>
            <p className="text-xs font-bold text-foreground">Тема оформления</p>
            <p className="text-[10px] text-fg-muted">Светлый или тёмный интерфейс</p>
          </div>
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
}
