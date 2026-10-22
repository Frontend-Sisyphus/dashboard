"use client";

import { useState } from "react";
import { gjallarhornQuotes } from "@/entities/quote";

type ClusterKpiBarProps = {
  kpis: {
    total: number;
    totalUsers: number;
    totalRps: number;
    avgLatency: number;
    avgUptime: number;
    degradedCount: number;
    operationalCount: number;
  };
  isLiveEnabled: boolean;
  onToggleLive: () => void;
  onManualRefresh: () => void;
};

export function ClusterKpiBar({
  kpis,
  isLiveEnabled,
  onToggleLive,
  onManualRefresh,
}: ClusterKpiBarProps) {
  const hasIssues = kpis.degradedCount > 0;
  const [quoteIndex, setQuoteIndex] = useState(0);
  const currentQuote = gjallarhornQuotes[quoteIndex % gjallarhornQuotes.length]!;

  const nextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % gjallarhornQuotes.length);
  };

  return (
    <div className="rounded-xl border border-border bg-elevated/80 p-4 shadow-sm backdrop-blur-md transition-colors duration-200 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Left: Overall Health Badge & Status */}
        <div className="flex items-center gap-3">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border transition-colors ${
              hasIssues
                ? "border-warn/40 bg-warn/15 text-warn"
                : "border-ok/40 bg-ok/15 text-ok"
            }`}
          >
            <span
              className={`h-3.5 w-3.5 rounded-full ${
                hasIssues ? "bg-warn animate-pulse" : "bg-ok animate-pulse"
              }`}
            />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base font-bold tracking-tight text-foreground sm:text-lg">
                {hasIssues
                  ? "Обнаружены проблемы"
                  : "Все сервисы ИТС работают штатно"}
              </h2>
              <span
                className={`rounded-md px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                  hasIssues
                    ? "bg-warn/20 text-warn border border-warn/30"
                    : "bg-ok/20 text-ok border border-ok/30"
                }`}
              >
                {hasIssues ? `${kpis.degradedCount} инцидент` : "100% готовность"}
              </span>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-fg-muted">
              <span className="hidden sm:inline font-medium">SRE принцип:</span>
              <button
                type="button"
                onClick={nextQuote}
                title="Нажмите, чтобы сменить цитату SRE"
                className="group inline-flex items-center gap-1.5 text-left text-[11px] text-foreground/80 hover:text-foreground transition cursor-pointer"
              >
                <span className="font-mono text-primary/80 group-hover:text-primary transition">
                  «{currentQuote.text}»
                </span>
                <span className="text-[10px] text-fg-muted group-hover:text-foreground/70 transition">
                  — {currentQuote.source}
                </span>
                <span className="text-[10px] opacity-40 group-hover:opacity-100 transition">↻</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Controls (Live ticker & manual refresh) */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={onToggleLive}
            title={
              isLiveEnabled
                ? "Приостановить поток телеметрии"
                : "Возобновить поток телеметрии"
            }
            className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition cursor-pointer active:scale-98 ${
              isLiveEnabled
                ? "border-primary/50 bg-primary/15 text-foreground font-semibold shadow-xs"
                : "border-border bg-muted/70 text-fg-muted hover:text-foreground hover:border-border-strong"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                isLiveEnabled ? "bg-primary animate-ping" : "bg-fg-muted/60"
              }`}
            />
            <span>{isLiveEnabled ? "Телеметрия live (3.8с)" : "Пауза"}</span>
          </button>

          <button
            type="button"
            onClick={onManualRefresh}
            title="Запросить срез метрик сейчас"
            className="rounded-lg border border-border bg-muted/60 px-3 py-1.5 text-xs font-medium text-foreground transition hover:border-primary hover:bg-primary/10 cursor-pointer active:scale-95"
          >
            ↻ Обновить
          </button>
        </div>
      </div>

      {/* KPI Metrics Row */}
      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border/60 pt-4 sm:grid-cols-3 md:grid-cols-5">
        {/* Metric 1: Total Projects */}
        <div className="rounded-lg border border-border bg-muted/40 p-3 transition-colors">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-fg-muted">
            Проектов ИТС
          </p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-mono text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              {kpis.total}
            </span>
            <span className="text-[11px] font-medium text-ok">
              {kpis.operationalCount} активны
            </span>
          </div>
        </div>

        {/* Metric 2: Realtime Active Users */}
        <div className="rounded-lg border border-border bg-muted/40 p-3 transition-colors">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-fg-muted">
              Пользователей сейчас
            </p>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
            </span>
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-mono text-xl font-bold tracking-tight text-ok sm:text-2xl">
              {kpis.totalUsers.toLocaleString("ru-RU")}
            </span>
            <span className="text-[11px] text-fg-muted">онлайн</span>
          </div>
        </div>

        {/* Metric 3: Cluster Average Uptime */}
        <div className="rounded-lg border border-border bg-muted/40 p-3 transition-colors">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-fg-muted">
            Доступность (30 дн.)
          </p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-mono text-xl font-bold tracking-tight text-primary sm:text-2xl">
              {kpis.avgUptime}%
            </span>
            <span className="text-[11px] text-fg-muted">SLA 99.8%</span>
          </div>
        </div>

        {/* Metric 4: Global RPS */}
        <div className="rounded-lg border border-border bg-muted/40 p-3 transition-colors">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-fg-muted">
            Нагрузка (RPS)
          </p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-mono text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              {kpis.totalRps}
            </span>
            <span className="text-[11px] text-fg-muted">req/sec</span>
          </div>
        </div>

        {/* Metric 5: Average Latency */}
        <div className="col-span-2 rounded-lg border border-border bg-muted/40 p-3 transition-colors sm:col-span-1">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-fg-muted">
            Задержка API (p50)
          </p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-mono text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              {kpis.avgLatency}
            </span>
            <span className="text-[11px] text-fg-muted">мс</span>
          </div>
        </div>
      </div>
    </div>
  );
}
