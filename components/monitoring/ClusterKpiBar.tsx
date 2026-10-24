"use client";

import { useState } from "react";
import { gjallarhornQuotes } from "@/lib/boot/quotes";

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
    <div className="rounded-2xl border border-[var(--ui-color-border)] bg-[var(--ui-color-surface)] p-4 sm:p-5 shadow-[var(--ui-shadow-sm)] backdrop-blur-md transition-colors duration-200">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Left: Overall Health Badge & Status */}
        <div className="flex items-center gap-3">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors ${
              hasIssues
                ? "border-[var(--ui-color-status-warning-border)] bg-[var(--ui-color-status-warning-bg)] text-[var(--ui-color-status-warning-text)]"
                : "border-[var(--ui-color-status-success-border)] bg-[var(--ui-color-status-success-bg)] text-[var(--ui-color-status-success-text)]"
            }`}
          >
            <span
              className={`h-3.5 w-3.5 rounded-full ${
                hasIssues ? "bg-[#f59e0b] animate-pulse" : "bg-[#16a34a] animate-pulse"
              }`}
            />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base font-bold tracking-tight text-[var(--ui-color-text)] sm:text-lg">
                {hasIssues
                  ? "Обнаружены проблемы"
                  : "Все сервисы ИТС работают штатно"}
              </h2>
              <span
                className={`au-badge ${
                  hasIssues ? "au-badge--warning" : "au-badge--success"
                }`}
              >
                {hasIssues ? `${kpis.degradedCount} инцидент` : "100% готовность"}
              </span>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-[var(--ui-color-text-muted)]">
              <span className="hidden sm:inline font-medium">SRE принцип:</span>
              <button
                type="button"
                onClick={nextQuote}
                title="Нажмите, чтобы сменить цитату SRE"
                className="group inline-flex items-center gap-1.5 text-left text-[11px] text-[var(--ui-color-text)] hover:text-[var(--ui-color-text-accent)] transition cursor-pointer"
              >
                <span className="font-mono text-[var(--ui-color-brand-strong)] group-hover:underline transition">
                  «{currentQuote.text}»
                </span>
                <span className="text-[10px] text-[var(--ui-color-text-muted)] group-hover:text-[var(--ui-color-text)] transition">
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
            className={`flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-semibold transition cursor-pointer active:scale-95 ${
              isLiveEnabled
                ? "border-[var(--ui-color-brand-border)] bg-[var(--ui-color-brand-soft)] text-[var(--ui-color-brand-strong)] shadow-xs"
                : "border-[var(--ui-color-border)] bg-[var(--ui-color-surface-soft)] text-[var(--ui-color-text-muted)] hover:text-[var(--ui-color-text)]"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                isLiveEnabled ? "bg-[var(--ui-color-brand-strong)] animate-ping" : "bg-[var(--ui-color-text-muted)]"
              }`}
            />
            <span>{isLiveEnabled ? "Телеметрия live (3.8с)" : "Пауза"}</span>
          </button>

          <button
            type="button"
            onClick={onManualRefresh}
            title="Запросить срез метрик сейчас"
            className="rounded-xl border border-[var(--ui-color-border)] bg-[var(--ui-color-surface-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--ui-color-text)] transition hover:border-[var(--ui-color-brand-border)] hover:bg-[var(--ui-color-surface-subtle)] cursor-pointer active:scale-95"
          >
            ↻ Обновить
          </button>
        </div>
      </div>

      {/* KPI Metrics Row */}
      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[var(--ui-color-border)] pt-4 sm:grid-cols-3 md:grid-cols-5">
        {/* Metric 1: Total Projects */}
        <div className="rounded-xl border border-[var(--ui-color-border)] bg-[var(--ui-color-surface-soft)] p-3 transition-colors">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--ui-color-text-muted)]">
            Проектов ИТС
          </p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-mono text-xl font-bold tracking-tight text-[var(--ui-color-text)] sm:text-2xl">
              {kpis.total}
            </span>
            <span className="text-[11px] font-semibold text-[var(--ui-color-status-success-text)]">
              {kpis.operationalCount} активны
            </span>
          </div>
        </div>

        {/* Metric 2: Realtime Active Users */}
        <div className="rounded-xl border border-[var(--ui-color-border)] bg-[var(--ui-color-surface-soft)] p-3 transition-colors">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--ui-color-text-muted)]">
              Пользователей онлайн
            </p>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#16a34a] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#16a34a]" />
            </span>
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-mono text-xl font-bold tracking-tight text-[var(--ui-color-status-success-text)] sm:text-2xl">
              {kpis.totalUsers.toLocaleString("ru-RU")}
            </span>
            <span className="text-[11px] text-[var(--ui-color-text-muted)]">сессий</span>
          </div>
        </div>

        {/* Metric 3: Cluster Average Uptime */}
        <div className="rounded-xl border border-[var(--ui-color-border)] bg-[var(--ui-color-surface-soft)] p-3 transition-colors">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--ui-color-text-muted)]">
            Доступность (30 дн.)
          </p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-mono text-xl font-bold tracking-tight text-[var(--ui-color-brand-strong)] sm:text-2xl">
              {kpis.avgUptime}%
            </span>
            <span className="text-[11px] text-[var(--ui-color-text-muted)]">SLA 99.8%</span>
          </div>
        </div>

        {/* Metric 4: Global RPS */}
        <div className="rounded-xl border border-[var(--ui-color-border)] bg-[var(--ui-color-surface-soft)] p-3 transition-colors">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--ui-color-text-muted)]">
            Нагрузка (RPS)
          </p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-mono text-xl font-bold tracking-tight text-[var(--ui-color-text)] sm:text-2xl">
              {kpis.totalRps}
            </span>
            <span className="text-[11px] text-[var(--ui-color-text-muted)]">req/sec</span>
          </div>
        </div>

        {/* Metric 5: Average Latency */}
        <div className="col-span-2 rounded-xl border border-[var(--ui-color-border)] bg-[var(--ui-color-surface-soft)] p-3 transition-colors sm:col-span-1">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--ui-color-text-muted)]">
            Задержка API (p50)
          </p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-mono text-xl font-bold tracking-tight text-[var(--ui-color-text)] sm:text-2xl">
              {kpis.avgLatency}
            </span>
            <span className="text-[11px] text-[var(--ui-color-text-muted)]">мс</span>
          </div>
        </div>
      </div>
    </div>
  );
}
