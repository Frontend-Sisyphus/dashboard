"use client";

import { useEffect, useState } from "react";
import type {
  ProjectMonitoringData,
  UptimePeriod,
} from "@/lib/monitoring/types";
import { priorityColorMap, statusLabelMap } from "@/lib/monitoring/types";
import { UptimeLineChart } from "./UptimeLineChart";

type ProjectInspectorModalProps = {
  project: ProjectMonitoringData | null;
  onClose: () => void;
};

export function ProjectInspectorModal({
  project,
  onClose,
}: ProjectInspectorModalProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "uptime" | "performance" | "hardware" | "team"
  >("overview");
  const [selectedUptimePeriod, setSelectedUptimePeriod] =
    useState<UptimePeriod>("30d");

  // Prevent background page scrolling when modal is open
  useEffect(() => {
    if (project) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [project]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const priorityStyle = priorityColorMap[project.priority];
  const currentPeriodUptime =
    selectedUptimePeriod === "24h"
      ? project.uptime.last24h
      : selectedUptimePeriod === "7d"
      ? project.uptime.last7d
      : selectedUptimePeriod === "90d"
      ? project.uptime.last90d
      : project.uptime.last30d;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-2 sm:p-4 backdrop-blur-sm transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inspector-title"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-4xl flex-col rounded-2xl border border-border bg-elevated text-foreground shadow-2xl overflow-hidden transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-3">
            <span
              className={`h-3.5 w-3.5 rounded-full ${
                project.status === "operational"
                  ? "bg-ok animate-pulse"
                  : project.status === "degraded"
                  ? "bg-warn animate-pulse"
                  : "bg-critical animate-pulse"
              }`}
            />
            <div>
              <h2
                id="inspector-title"
                className="text-base font-bold text-foreground sm:text-lg"
              >
                {project.name}
              </h2>
              <p className="text-xs text-fg-muted font-mono font-medium">
                ID: {project.id} · Обновлено: {project.lastUpdated}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span
              style={{
                backgroundColor: priorityStyle.bg,
                color: priorityStyle.text,
                borderColor: priorityStyle.border,
              }}
              className="rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
            >
              {project.priority}
            </span>

            <button
              type="button"
              onClick={onClose}
              className="flex items-center justify-center rounded-lg border border-border bg-muted/60 p-1.5 text-xs font-semibold text-fg-muted hover:text-foreground hover:border-primary cursor-pointer active:scale-95 transition"
              aria-label="Закрыть"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-border bg-muted/20 px-4 sm:px-6 overflow-x-auto gap-1">
          {[
            { id: "overview", label: "Обзор & Сводка" },
            { id: "uptime", label: "Доступность & Сбои" },
            { id: "performance", label: "Трафик & API" },
            { id: "hardware", label: "Сервер & Диск" },
            { id: "team", label: "Команда & Стек" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`border-b-2 px-3.5 py-2.5 text-xs font-semibold whitespace-nowrap transition cursor-pointer active:scale-95 ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-fg-muted hover:text-foreground hover:bg-muted/30"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-5">
              {/* Description */}
              <div className="rounded-xl border border-border bg-muted/30 p-4">
                <h4 className="text-xs uppercase tracking-wider text-fg-muted font-bold">
                  Описание проекта
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground">
                  {project.description}
                </p>

                {/* Quick links */}
                <div className="mt-3 flex flex-wrap gap-2 pt-2 border-t border-border/40 text-xs">
                  {project.serviceUrl ? (
                    <a
                      href={project.serviceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-primary/50 bg-primary/10 px-2.5 py-1 text-foreground font-semibold hover:bg-primary/20 cursor-pointer transition"
                    >
                      <svg
                        className="h-3.5 w-3.5 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      Открыть сервис
                    </a>
                  ) : null}
                  {project.repoUrl ? (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-border bg-muted/60 px-2.5 py-1 text-foreground font-semibold hover:border-primary cursor-pointer transition"
                    >
                      Репозиторий
                    </a>
                  ) : null}
                  {project.healthEndpoint ? (
                    <span className="rounded-lg border border-border bg-muted/40 px-2.5 py-1 font-mono text-[11px] text-fg-muted">
                      Healthcheck: {project.healthEndpoint}
                    </span>
                  ) : null}
                </div>
              </div>

              {/* 4 Essential Vital Gauges */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl border border-border bg-muted/30 p-3.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-fg-muted">
                    Uptime (30 дней)
                  </span>
                  <p className="mt-1 font-mono text-2xl font-bold text-ok">
                    {project.uptime.last30d}%
                  </p>
                  <span className="text-[11px] text-fg-muted font-medium">
                    Статус: {statusLabelMap[project.status]}
                  </span>
                </div>

                <div className="rounded-xl border border-border bg-muted/30 p-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-fg-muted">
                      Онлайн сейчас
                    </span>
                    <span className="h-2 w-2 rounded-full bg-ok animate-ping" />
                  </div>
                  <p className="mt-1 font-mono text-2xl font-bold text-ok">
                    {project.users.realtimeActiveUsers}
                  </p>
                  <span className="text-[11px] text-fg-muted font-medium">
                    {project.users.todayVisits.toLocaleString()} визитов сегодня
                  </span>
                </div>

                <div className="rounded-xl border border-border bg-muted/30 p-3.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-fg-muted">
                    Запросы в сек (RPS)
                  </span>
                  <p className="mt-1 font-mono text-2xl font-bold text-foreground">
                    {project.performance.rps}
                  </p>
                  <span className="text-[11px] text-fg-muted font-medium">
                    {project.performance.throughput}
                  </span>
                </div>

                <div className="rounded-xl border border-border bg-muted/30 p-3.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-fg-muted">
                    Задержка API (Avg)
                  </span>
                  <p className="mt-1 font-mono text-2xl font-bold text-primary">
                    {project.performance.responseTimeAvg} мс
                  </p>
                  <span className="text-[11px] text-fg-muted font-medium">
                    p95: {project.performance.responseTimeP95} мс
                  </span>
                </div>
              </div>

              {/* Team Leader & Recent Activity summary */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-muted/30 p-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-fg-muted">
                    Руководитель проекта
                  </span>
                  <div className="mt-2.5 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/50 bg-primary/20 text-foreground font-bold">
                      {project.lead.name.slice(0, 1)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">
                        {project.lead.name}
                      </p>
                      <p className="text-xs text-fg-muted font-medium">{project.lead.role}</p>
                      {project.lead.telegram && (
                        <p className="mt-0.5 text-xs text-primary font-mono font-semibold">
                          {project.lead.telegram}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-muted/30 p-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-fg-muted">
                    Проверка работоспособности
                  </span>
                  <div className="mt-2 space-y-1.5 text-xs">
                    <p className="text-foreground">
                      Последняя успешная проверка:{" "}
                      <strong className="font-mono text-ok font-bold">
                        {project.lastSuccessCheck}
                      </strong>
                    </p>
                    <p className="text-fg-muted">
                      Интервал пинга: каждые 15 сек · Таймаут шлюза: 2000 мс
                    </p>
                    <p className="text-fg-muted">
                      Сбоев за 30 дней:{" "}
                      <strong className="font-mono text-foreground font-bold">
                        {project.outages.incidentsCount30d}
                      </strong>{" "}
                      · Время простоя:{" "}
                      <strong className="font-mono text-foreground font-bold">
                        {project.outages.totalDowntimeMinutes30d} мин.
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: UPTIME & OUTAGES */}
          {activeTab === "uptime" && (
            <div className="space-y-5">
              {/* Uptime Period Switcher Box */}
              <div className="rounded-xl border border-border bg-muted/30 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-fg-muted font-bold">
                      Доступность сервиса за период
                    </h4>
                    <p className="mt-1 font-mono text-3xl font-bold text-ok">
                      {currentPeriodUptime}%
                    </p>
                  </div>

                  <div className="flex rounded-lg border border-border bg-muted/50 p-1">
                    {(["24h", "7d", "30d", "90d"] as UptimePeriod[]).map(
                      (p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setSelectedUptimePeriod(p)}
                          className={`rounded-md px-3 py-1.5 text-xs font-medium transition cursor-pointer active:scale-95 ${
                            selectedUptimePeriod === p
                              ? "bg-primary text-[#042428] font-bold shadow-xs"
                              : "text-fg-muted hover:text-foreground"
                          }`}
                        >
                          {p === "24h"
                            ? "24 часа"
                            : p === "7d"
                            ? "7 дней"
                            : p === "30d"
                            ? "30 дней"
                            : "90 дней"}
                        </button>
                      ),
                    )}
                  </div>
                </div>

                {/* Linear Chart with Dates */}
                <div className="mt-4 border-t border-border/40 pt-4">
                  <UptimeLineChart
                    historyDaily={project.uptime.historyDaily}
                    period={selectedUptimePeriod}
                    currentUptime={currentPeriodUptime}
                  />
                </div>
              </div>

              {/* Incidents & Outage Metrics */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-border bg-muted/30 p-3.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-fg-muted">
                    Количество сбоев (30д)
                  </p>
                  <p className="mt-1 font-mono text-2xl font-bold text-foreground">
                    {project.outages.incidentsCount30d}
                  </p>
                  <p className="text-[11px] text-fg-muted font-medium">
                    {project.outages.incidentsCount30d === 0
                      ? "Без инцидентов"
                      : "Зафиксировано мониторингом"}
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-muted/30 p-3.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-fg-muted">
                    Суммарный простой (30д)
                  </p>
                  <p className="mt-1 font-mono text-2xl font-bold text-foreground">
                    {project.outages.totalDowntimeMinutes30d} мин.
                  </p>
                  <p className="text-[11px] text-fg-muted font-medium">
                    Доля от периода: 0.03%
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-muted/30 p-3.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-fg-muted">
                    Среднее время восстановления (MTTR)
                  </p>
                  <p className="mt-1 font-mono text-2xl font-bold text-foreground">
                    {project.outages.mttrMinutes} мин.
                  </p>
                  <p className="text-[11px] text-ok font-semibold">Цель SRE &lt; 20 мин.</p>
                </div>
              </div>

              {/* Recent Incident Log */}
              <div className="rounded-xl border border-border bg-muted/30 p-4">
                <h4 className="text-xs uppercase tracking-wider text-fg-muted font-bold mb-3">
                  Журнал недавних инцидентов
                </h4>
                {project.outages.recentIncidents.length === 0 ? (
                  <p className="flex items-center gap-1.5 text-sm text-ok font-semibold">
                    <svg className="h-4 w-4 shrink-0 text-ok" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>За последние 30 дней сбоев и отказов не зарегистрировано.</span>
                  </p>
                ) : (
                  <div className="space-y-3">
                    {project.outages.recentIncidents.map((inc) => (
                      <div
                        key={inc.id}
                        className="rounded-lg border border-border bg-elevated/70 p-3 text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-foreground">
                            {inc.title}
                          </span>
                          <span
                            className={`rounded-md px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold ${
                              inc.status === "resolved"
                                ? "bg-ok/20 text-ok"
                                : "bg-warn/20 text-warn"
                            }`}
                          >
                            {inc.status === "resolved"
                              ? "Устранено"
                              : "Расследуется"}
                          </span>
                        </div>
                        <p className="text-fg-muted">
                          Начало: {inc.startedAt} · Длительность:{" "}
                          {inc.durationMinutes} мин.
                        </p>
                        <p className="text-foreground">
                          Причина: {inc.rootCause}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: PERFORMANCE & API */}
          {activeTab === "performance" && (
            <div className="space-y-5">
              {/* API Response Codes Breakdown */}
              <div className="rounded-xl border border-border bg-muted/30 p-4">
                <h4 className="text-xs uppercase tracking-wider text-fg-muted font-bold mb-2">
                  Распределение кодов ответов API
                </h4>
                <div className="flex h-4 w-full overflow-hidden rounded-md border border-border bg-muted/70">
                  <div
                    style={{ width: `${project.apiCodes.code2xx}%` }}
                    className="bg-ok"
                    title={`2xx Успешно: ${project.apiCodes.code2xx}%`}
                  />
                  <div
                    style={{ width: `${project.apiCodes.code3xx}%` }}
                    className="bg-blue"
                    title={`3xx Редиректы: ${project.apiCodes.code3xx}%`}
                  />
                  <div
                    style={{ width: `${project.apiCodes.code4xx}%` }}
                    className="bg-warn"
                    title={`4xx Клиентские ошибки: ${project.apiCodes.code4xx}%`}
                  />
                  <div
                    style={{ width: `${project.apiCodes.code5xx}%` }}
                    className="bg-critical"
                    title={`5xx Ошибки сервера: ${project.apiCodes.code5xx}%`}
                  />
                </div>

                {/* Legend */}
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-mono font-medium sm:grid-cols-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-ok" />
                    <span>2xx (OK): {project.apiCodes.code2xx}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-blue" />
                    <span>3xx (Redirect): {project.apiCodes.code3xx}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-warn" />
                    <span>4xx (Client): {project.apiCodes.code4xx}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-critical" />
                    <span>5xx (Server): {project.apiCodes.code5xx}%</span>
                  </div>
                </div>
              </div>

              {/* Latency Percentiles & Traffic */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-border bg-muted/30 p-3.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-fg-muted">
                    Задержка ответа (Latency)
                  </p>
                  <p className="mt-1 font-mono text-2xl font-bold text-foreground">
                    {project.performance.responseTimeAvg} мс
                  </p>
                  <div className="mt-2 text-xs font-mono text-fg-muted space-y-0.5 font-medium">
                    <div>p50: {project.performance.responseTimeAvg} мс</div>
                    <div>p95: {project.performance.responseTimeP95} мс</div>
                    <div>p99: {project.performance.responseTimeP99} мс</div>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-muted/30 p-3.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-fg-muted">
                    Интенсивность запросов (RPS)
                  </p>
                  <p className="mt-1 font-mono text-2xl font-bold text-foreground">
                    {project.performance.rps}
                  </p>
                  <div className="mt-2 text-xs font-mono text-fg-muted space-y-0.5 font-medium">
                    <div>Пропускная способность:</div>
                    <div className="font-bold text-foreground">
                      {project.performance.throughput}
                    </div>
                    <div>{project.performance.bandwidthMbps} Mbit/s</div>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-muted/30 p-3.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-fg-muted">
                    Посещаемость пользователей
                  </p>
                  <p className="mt-1 font-mono text-2xl font-bold text-ok">
                    {project.users.realtimeActiveUsers} онлайн
                  </p>
                  <div className="mt-2 text-xs font-mono text-fg-muted space-y-0.5 font-medium">
                    <div>
                      За сегодня: {project.users.todayVisits.toLocaleString()}
                    </div>
                    <div>
                      Уникальных: {project.users.todayUniqueUsers.toLocaleString()}
                    </div>
                    <div>
                      За неделю: {project.users.weeklyVisits.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: HARDWARE & SERVER */}
          {activeTab === "hardware" && (
            <div className="space-y-5">
              {/* CPU & Memory Gauges */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {/* CPU */}
                <div className="rounded-xl border border-border bg-muted/30 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-fg-muted font-bold">
                      Загрузка CPU ({project.hardware.cpuCores} ядер)
                    </span>
                    <span className="font-mono text-lg font-bold text-foreground">
                      {project.hardware.cpuUsagePercent}%
                    </span>
                  </div>
                  <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-muted/70 border border-border">
                    <div
                      style={{
                        width: `${Math.min(
                          100,
                          project.hardware.cpuUsagePercent,
                        )}%`,
                      }}
                      className={`h-full ${
                        project.hardware.cpuUsagePercent > 80
                          ? "bg-critical"
                          : project.hardware.cpuUsagePercent > 60
                          ? "bg-warn"
                          : "bg-primary"
                      }`}
                    />
                  </div>

                  {/* Sparkline preview */}
                  <div className="mt-3 flex items-end gap-1 h-8 rounded-lg bg-muted/50 p-1 border border-border">
                    {project.hardware.cpuHistory.map((val, idx) => (
                      <div
                        key={idx}
                        style={{ height: `${Math.min(100, val)}%` }}
                        className="flex-1 rounded-xs bg-primary/70"
                        title={`Точка ${idx + 1}: ${val}%`}
                      />
                    ))}
                  </div>
                </div>

                {/* Memory */}
                <div className="rounded-xl border border-border bg-muted/30 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-fg-muted font-bold">
                      Оперативная память (RAM)
                    </span>
                    <span className="font-mono text-lg font-bold text-foreground">
                      {project.hardware.memoryPercent}%
                    </span>
                  </div>
                  <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-muted/70 border border-border">
                    <div
                      style={{ width: `${project.hardware.memoryPercent}%` }}
                      className="h-full bg-blue"
                    />
                  </div>
                  <div className="mt-3 text-xs font-mono text-fg-muted font-medium flex justify-between">
                    <span>
                      Занято: {project.hardware.memoryUsedGb} GB из{" "}
                      {project.hardware.memoryTotalGb} GB
                    </span>
                    <span>
                      Свободно:{" "}
                      {(
                        project.hardware.memoryTotalGb -
                        project.hardware.memoryUsedGb
                      ).toFixed(1)}{" "}
                      GB
                    </span>
                  </div>
                </div>
              </div>

              {/* Disk & Network Telemetry */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {/* Disk */}
                <div className="rounded-xl border border-border bg-muted/30 p-4">
                  <h4 className="text-xs uppercase tracking-wider text-fg-muted font-bold mb-2">
                    Дисковая подсистема (SSD / NVMe)
                  </h4>
                  <div className="space-y-2 text-xs font-mono font-medium">
                    <div className="flex justify-between border-b border-border/40 pb-1">
                      <span className="text-fg-muted">Свободное место:</span>
                      <span className="text-foreground font-bold">
                        {project.hardware.diskFreeGb} GB /{" "}
                        {project.hardware.diskTotalGb} GB (
                        {100 - project.hardware.diskUsedPercent}%)
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-border/40 pb-1">
                      <span className="text-fg-muted">Скорость чтения:</span>
                      <span className="text-foreground">
                        {project.hardware.diskReadMbS} MB/s
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-border/40 pb-1">
                      <span className="text-fg-muted">Скорость записи:</span>
                      <span className="text-foreground">
                        {project.hardware.diskWriteMbS} MB/s
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-border/40 pb-1">
                      <span className="text-fg-muted">Операций IOPS:</span>
                      <span className="text-foreground">
                        {project.hardware.diskIops}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-fg-muted">Задержка диска:</span>
                      <span className="text-ok font-bold">
                        {project.hardware.diskLatencyMs} мс
                      </span>
                    </div>
                  </div>
                </div>

                {/* Network */}
                <div className="rounded-xl border border-border bg-muted/30 p-4">
                  <h4 className="text-xs uppercase tracking-wider text-fg-muted font-bold mb-2">
                    Сетевая нагрузка & Соединения
                  </h4>
                  <div className="space-y-2 text-xs font-mono font-medium">
                    <div className="flex justify-between border-b border-border/40 pb-1">
                      <span className="text-fg-muted">Входящий трафик (In):</span>
                      <span className="text-foreground font-bold">
                        {project.hardware.networkInMbps} Mbit/s
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-border/40 pb-1">
                      <span className="text-fg-muted">Исходящий трафик (Out):</span>
                      <span className="text-foreground font-bold">
                        {project.hardware.networkOutMbps} Mbit/s
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-border/40 pb-1">
                      <span className="text-fg-muted">Потеря пакетов:</span>
                      <span className="text-ok font-bold">
                        {project.hardware.packetLossPercent}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-fg-muted">Активные TCP сокеты:</span>
                      <span className="text-foreground">
                        {project.hardware.activeTcpConnections}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: TEAM & TECH STACK */}
          {activeTab === "team" && (
            <div className="space-y-5">
              {/* Tech stack */}
              <div className="rounded-xl border border-border bg-muted/30 p-4">
                <h4 className="text-xs uppercase tracking-wider text-fg-muted font-bold mb-2.5">
                  Технический стек и компоненты
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-primary/40 bg-primary/10 px-2.5 py-1 text-xs font-mono text-foreground font-bold"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Lead */}
              <div className="rounded-xl border border-border bg-muted/30 p-4">
                <h4 className="text-xs uppercase tracking-wider text-fg-muted font-bold mb-3">
                  Руководитель проекта
                </h4>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary bg-primary/20 text-foreground font-bold text-lg">
                    {project.lead.name.slice(0, 1)}
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-foreground">
                      {project.lead.name}
                    </h5>
                    <p className="text-xs text-fg-muted font-medium">{project.lead.role}</p>
                    {project.lead.telegram && (
                      <p className="mt-1 text-xs text-primary font-mono font-bold">
                        Telegram: {project.lead.telegram}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Team Roster */}
              <div className="rounded-xl border border-border bg-muted/30 p-4">
                <h4 className="text-xs uppercase tracking-wider text-fg-muted font-bold mb-3">
                  Команда проекта ({project.team.length} участников)
                </h4>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {project.team.map((member) => (
                    <div
                      key={member.name}
                      className="rounded-lg border border-border bg-elevated/70 p-3 text-xs"
                    >
                      <p className="font-bold text-foreground">
                        {member.name}
                      </p>
                      <p className="text-fg-muted font-medium">{member.role}</p>
                      {member.telegram && (
                        <p className="mt-1 text-primary font-mono font-bold">
                          {member.telegram}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-border bg-muted/40 px-4 py-3 sm:px-6 text-xs text-fg-muted">
          <span>
            Приоритет: <strong className="text-foreground">{project.priority}</strong>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-border bg-elevated px-4 py-1.5 text-xs font-semibold text-foreground transition hover:border-primary cursor-pointer active:scale-95"
          >
            Закрыть инспектор
          </button>
        </div>
      </div>
    </div>
  );
}
