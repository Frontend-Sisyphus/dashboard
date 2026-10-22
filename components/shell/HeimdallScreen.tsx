"use client";

import { useEffect, useState, useTransition } from "react";
import { ProductLogo } from "@/components/brand/ProductLogo";
import { ModularGrid } from "@/components/layout/ModularGrid";
import { ProjectsMonitoringScreen } from "@/components/monitoring/ProjectsMonitoringScreen";
import { BootSplash } from "@/components/shell/BootSplash";
import { MobileMenu } from "@/components/shell/MobileMenu";
import { ModeSwitcher } from "@/components/shell/ModeSwitcher";
import { ThemeSwitcher } from "@/components/shell/ThemeSwitcher";
import { productForMode } from "@/lib/brand/products";
import { getModeLayout } from "@/lib/layout/resolve";
import type { AppMode } from "@/lib/layout/types";

function detectDefaultMode(): AppMode {
  if (typeof window === "undefined") return "kiosk";
  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get("mode");
  if (fromQuery === "kiosk" || fromQuery === "stats" || fromQuery === "monitoring") {
    return fromQuery;
  }
  if (fromQuery === "bifrost") return "kiosk";
  if (fromQuery === "heimdall") return "stats";
  if (fromQuery === "gjallarhorn" || fromQuery === "monitor") return "monitoring";

  const portrait =
    window.matchMedia("(orientation: portrait)").matches &&
    window.innerHeight >= 1400;
  return portrait ? "kiosk" : "stats";
}

export function HeimdallScreen() {
  const [mode, setMode] = useState<AppMode | null>(null);
  const [bootKey, setBootKey] = useState(0);
  const [booting, setBooting] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      setMode(detectDefaultMode());
      setBooting(true);
      setBootKey(0);
    });
  }, []);

  useEffect(() => {
    if (!mode) return;
    const url = new URL(window.location.href);
    url.searchParams.set("mode", mode);
    url.searchParams.delete("category");
    window.history.replaceState({}, "", url);
  }, [mode]);

  const switchMode = (next: AppMode) => {
    if (!mode || next === mode || booting) return;
    startTransition(() => {
      setMode(next);
      setBootKey((key) => key + 1);
      setBooting(true);
    });
  };

  if (!mode) {
    return <div className="heimdall-shell" aria-busy="true" />;
  }

  const layout = getModeLayout(mode);
  const product = productForMode(mode);

  return (
    <>
      {booting ? (
        <BootSplash
          key={bootKey}
          mode={mode}
          minDurationMs={bootKey === 0 ? 2400 : 2000}
          onFinished={() => setBooting(false)}
        />
      ) : null}

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        currentMode={mode}
        onSelectMode={switchMode}
      />

      <div
        className="heimdall-shell"
        data-product={product.id}
        data-mode={mode}
        aria-busy={booting}
      >
        <header className="relative z-[2] flex flex-wrap items-center justify-between gap-3 px-3 py-3 sm:px-4 sm:py-4 lg:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <ProductLogo
              product={product.id}
              className="h-10 w-10 shrink-0 sm:h-12 sm:w-12"
            />
            <div className="min-w-0">
              <p
                className="heimdall-wordmark text-base font-medium tracking-tight sm:text-lg"
                data-text={product.name}
              >
                {product.name}
              </p>
              <p className="heimdall-tag mt-0.5">{product.tagline}</p>
            </div>
          </div>
          <div className="flex items-stretch gap-2 sm:gap-2.5">
            {/* Desktop Mode Switcher (Gjallarhorn / Heimdall / Bifrost) */}
            <div className="hidden md:flex items-stretch">
              <ModeSwitcher mode={mode} onChange={switchMode} className="h-full" />
            </div>

            {/* Theme Switcher placed in the top-right corner */}
            <ThemeSwitcher />

            {/* Mobile: Hamburger Menu Button in the top-right corner */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="flex md:hidden self-stretch px-3 items-center justify-center rounded-xl border border-border bg-muted/80 text-foreground shadow-xs active:scale-95 transition cursor-pointer hover:border-primary/50 hover:bg-muted"
              aria-label="Открыть меню навигации"
              title="Меню"
            >
              <div className="flex flex-col gap-1.2 w-4.5">
                <span className="block h-0.5 w-full bg-foreground rounded-full" />
                <span className="block h-0.5 w-full bg-primary rounded-full" />
                <span className="block h-0.5 w-full bg-foreground rounded-full" />
              </div>
            </button>
          </div>
        </header>

        <main
          className={`relative z-[2] mx-auto flex w-full flex-1 flex-col px-3 pb-[calc(0.85rem+var(--heimdall-safe-bottom))] sm:px-4 lg:px-6 ${
            mode === "kiosk" ? "max-w-[1080px]" : "max-w-[1920px]"
          }`}
        >
          {mode === "monitoring" ? (
            <ProjectsMonitoringScreen key="monitoring" />
          ) : (
            <ModularGrid key={mode} layout={layout} />
          )}
        </main>
      </div>
    </>
  );
}
