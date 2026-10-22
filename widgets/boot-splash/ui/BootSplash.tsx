"use client";

import { useEffect, useRef, useState } from "react";
import {
  BifrostBridge,
  WatchingEye,
  productForMode,
  type ProductBrand,
} from "@/entities/brand";
import { pickBootQuote, type BootQuote } from "@/entities/quote";
import type { AppMode } from "@/shared/lib/layout";

type BootSplashProps = {
  mode: AppMode;
  /** Minimum visible time so the quote / animation can land */
  minDurationMs?: number;
  /** Called when the splash has fully left the screen */
  onFinished?: () => void;
};

export function BootSplash({
  mode,
  minDurationMs = 2200,
  onFinished,
}: BootSplashProps) {
  const product: ProductBrand = productForMode(mode);
  const isBifrost = product.id === "bifrost";
  const isGjallarhorn = product.id === "gjallarhorn";
  const [quote, setQuote] = useState<BootQuote | null>(null);
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const onFinishedRef = useRef(onFinished);
  onFinishedRef.current = onFinished;

  useEffect(() => {
    setQuote(pickBootQuote(mode));
  }, [mode]);

  useEffect(() => {
    let cancelled = false;
    const started = performance.now();
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const duration = reduceMotion ? Math.min(minDurationMs, 600) : minDurationMs;

    const finish = async () => {
      if (document.fonts?.ready) {
        try {
          await document.fonts.ready;
        } catch {
          /* ignore */
        }
      }

      const elapsed = performance.now() - started;
      const wait = Math.max(0, duration - elapsed);
      await new Promise((resolve) => window.setTimeout(resolve, wait));

      if (cancelled) return;
      setLeaving(true);
      window.setTimeout(() => {
        if (cancelled) return;
        setVisible(false);
        onFinishedRef.current?.();
      }, reduceMotion ? 120 : 480);
    };

    void finish();
    return () => {
      cancelled = true;
    };
  }, [minDurationMs]);

  if (!visible) return null;

  return (
    <div
      className={`heimdall-boot ${leaving ? "heimdall-boot--leave" : ""}`}
      data-product={product.id}
      role="status"
      aria-live="polite"
      aria-label={`Загрузка: ${product.name}`}
    >
      <div className="heimdall-boot__backdrop" aria-hidden>
        {isBifrost ? (
          <>
            <div className="bifrost-boot__sky" />
            <BifrostBridge className="bifrost-boot__bridge" />
            <p className="bifrost-boot__caption">путь между мирами</p>
            <p className="bifrost-boot__caption bifrost-boot__caption--ru">
              мост между университетом и знанием
            </p>
          </>
        ) : isGjallarhorn ? (
          <>
            <div className="gjallarhorn-boot__grid" />
            <div className="gjallarhorn-boot__sonar" />
            <p className="bifrost-boot__caption">голос рога стража</p>
            <p className="bifrost-boot__caption bifrost-boot__caption--ru">
              телеметрия и мониторинг цифровых систем
            </p>
          </>
        ) : (
          <>
            <div className="heimdall-boot__telescreen" />
            <WatchingEye className="heimdall-boot__eye" />
            <p className="heimdall-boot__orwell">он смотрит на тебя</p>
            <p className="heimdall-boot__orwell heimdall-boot__orwell--ru">
              большой брат рядом
            </p>
            <div className="heimdall-boot__corners">
              <span />
              <span />
              <span />
              <span />
            </div>
          </>
        )}
      </div>

      <div className="heimdall-boot__inner">
        <p className="heimdall-boot__observe">
          {isBifrost
            ? "мост открывается"
            : isGjallarhorn
            ? "сканирование узлов"
            : "наблюдение ведётся"}
        </p>
        <p
          className="heimdall-wordmark mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl"
          data-text={product.name}
        >
          {product.name}
        </p>
        <p className="heimdall-tag mt-2">{product.loadingLine}</p>
        {quote ? (
          <blockquote className="heimdall-boot__quote">
            <p>«{quote.text}»</p>
            <footer>— {quote.source}</footer>
          </blockquote>
        ) : (
          <div className="heimdall-boot__quote" aria-hidden />
        )}
      </div>
    </div>
  );
}
