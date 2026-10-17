"use client";

import { useEffect, useState, useTransition } from "react";
import { ProductLogo } from "@/components/brand/ProductLogo";
import { ModularGrid } from "@/components/layout/ModularGrid";
import { BootSplash } from "@/components/shell/BootSplash";
import { ModeSwitcher } from "@/components/shell/ModeSwitcher";
import { productForMode } from "@/lib/brand/products";
import { getModeLayout } from "@/lib/layout/resolve";
import type { AppMode } from "@/lib/layout/types";

function detectDefaultMode(): AppMode {
  if (typeof window === "undefined") return "kiosk";
  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get("mode");
  if (fromQuery === "kiosk" || fromQuery === "stats") return fromQuery;
  if (fromQuery === "bifrost") return "kiosk";
  if (fromQuery === "heimdall") return "stats";

  const portrait =
    window.matchMedia("(orientation: portrait)").matches &&
    window.innerHeight >= 1400;
  return portrait ? "kiosk" : "stats";
}

export function HeimdallScreen() {
  const [mode, setMode] = useState<AppMode | null>(null);
  const [bootKey, setBootKey] = useState(0);
  const [booting, setBooting] = useState(true);
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
              className="h-11 w-11 shrink-0 sm:h-12 sm:w-12"
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
          <ModeSwitcher mode={mode} onChange={switchMode} />
        </header>

        <main
          className={`relative z-[2] mx-auto flex w-full flex-1 flex-col px-3 pb-[calc(0.85rem+var(--heimdall-safe-bottom))] sm:px-4 lg:px-6 ${
            mode === "kiosk" ? "max-w-[1080px]" : "max-w-[1920px]"
          }`}
        >
          <ModularGrid key={mode} layout={layout} />
        </main>
      </div>
    </>
  );
}
