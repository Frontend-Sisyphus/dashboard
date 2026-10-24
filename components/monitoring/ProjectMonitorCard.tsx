"use client";

import type {
  ProjectMonitoringData,
  UptimePeriod,
} from "@/lib/monitoring/types";
import { priorityColorMap, statusLabelMap } from "@/lib/monitoring/types";

type ProjectMonitorCardProps = {
  project: ProjectMonitoringData;
  period: UptimePeriod;
  onSelect: (project: ProjectMonitoringData) => void;
};

export function ProjectMonitorCard({
  project,
  period,
  onSelect,
}: ProjectMonitorCardProps) {
  const uptimeVal =
    period === "24h"
      ? project.uptime.last24h
      : period === "7d"
        ? project.uptime.last7d
        : period === "90d"
          ? project.uptime.last90d
          : project.uptime.last30d;

  const priorityStyle = priorityColorMap[project.priority];

  const statusBadge = {
    operational: {
      bg: "bg-ok/15",
      text: "text-ok",
      border: "border-ok/30",
      dot: "bg-ok",
    },
    degraded: {
      bg: "bg-warn/15",
      text: "text-warn",
      border: "border-warn/30",
      dot: "bg-warn",
    },
    outage: {
      bg: "bg-critical/15",
      text: "text-critical",
      border: "border-critical/30",
      dot: "bg-critical",
    },
    maintenance: {
      bg: "bg-muted",
      text: "text-fg-muted",
      border: "border-border",
      dot: "bg-fg-muted",
    },
  }[project.status];

  return (
    <div
      onClick={() => onSelect(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(project);
        }
      }}
      className="group relative flex cursor-pointer flex-col justify-between rounded-2xl border border-[var(--ui-color-border)] bg-[var(--ui-color-surface)] p-4 shadow-[var(--ui-shadow-sm)] transition-all duration-200 hover:border-[var(--ui-color-brand-strong)] hover:bg-[var(--ui-color-surface-soft)] hover:shadow-[var(--ui-shadow-md)] sm:p-5 active:scale-[0.99]"
    >
      {/* Top Header: Name + Status Badge + Priority Tag */}
      <div>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base font-bold text-[var(--ui-color-text)] transition group-hover:text-[var(--ui-color-text-accent)] sm:text-lg">
              {project.name}
            </h3>
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[var(--ui-color-text-muted)]">
              {project.description}
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-1.5">
            <span
              className={`flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${statusBadge.bg} ${statusBadge.text} ${statusBadge.border}`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${statusBadge.dot} ${project.status === "operational" ? "animate-pulse" : ""
                  }`}
              />
              {statusLabelMap[project.status]}
            </span>

            <span
              style={{
                backgroundColor: priorityStyle.bg,
                color: priorityStyle.text,
                borderColor: priorityStyle.border,
              }}
              className="rounded-md border px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider"
            >
              {project.priority.split(" - ")[0]}
            </span>
          </div>
        </div>

        {/* Lead & Team line */}
        <div className="mt-3 flex items-center justify-between border-t border-[var(--ui-color-border)] pt-2.5 text-xs text-[var(--ui-color-text-muted)]">
          <div className="flex items-center gap-1.5 truncate">
            <span className="text-[10px] font-semibold uppercase tracking-wider opacity-80">
              Руководитель:
            </span>
            <span className="truncate font-semibold text-[var(--ui-color-text)]">
              {project.lead.name}
            </span>
          </div>
          <span className="shrink-0 text-[10px] text-[var(--ui-color-text-muted)] font-medium">
            +{project.team.length} в команде
          </span>
        </div>

        {/* Tech Stack Tags */}
        <div className="mt-2.5 flex flex-wrap gap-1">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border/80 bg-muted/60 px-1.5 py-0.5 text-[10px] font-mono font-medium text-foreground/80"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 ? (
            <span className="px-1 text-[10px] font-mono text-fg-muted">
              +{project.tags.length - 4}
            </span>
          ) : null}
        </div>
      </div>

      {/* Real-time Telemetry Grid */}
      <div className="mt-4 border-t border-border/60 pt-3">
        {/* Metric tiles */}
        <div className="grid grid-cols-3 gap-2">
          {/* Uptime */}
          <div className="rounded-lg border border-border bg-muted/30 p-2">
            <p className="text-[9px] font-bold uppercase tracking-wider text-fg-muted">
              Uptime ({period})
            </p>
            <p className="mt-0.5 font-mono text-sm font-bold text-foreground">
              {uptimeVal}%
            </p>
          </div>

          {/* Real-time Active Users */}
          <div className="rounded-lg border border-border bg-muted/30 p-2">
            <div className="flex items-center justify-between">
              <p className="text-[9px] font-bold uppercase tracking-wider text-fg-muted">
                Онлайн
              </p>
              <span className="h-1.5 w-1.5 rounded-full bg-ok animate-ping" />
            </div>
            <p className="mt-0.5 font-mono text-sm font-bold text-ok">
              {project.users.realtimeActiveUsers}
            </p>
          </div>

          {/* Latency & RPS */}
          <div className="rounded-lg border border-border bg-muted/30 p-2">
            <p className="text-[9px] font-bold uppercase tracking-wider text-fg-muted">
              Latency / RPS
            </p>
            <p className="mt-0.5 font-mono text-xs font-bold text-foreground truncate">
              {project.performance.responseTimeAvg}мс · {project.performance.rps}
            </p>
          </div>
        </div>

        {/* Hardware & API Codes summary bar */}
        <div className="mt-2.5 flex items-center justify-between text-[11px] text-fg-muted">
          <div className="flex items-center gap-2 font-mono">
            <span>
              CPU:{" "}
              <strong className="text-foreground">
                {project.hardware.cpuUsagePercent}%
              </strong>
            </span>
            <span>
              RAM:{" "}
              <strong className="text-foreground">
                {project.hardware.memoryPercent}%
              </strong>
            </span>
          </div>

          {/* API Codes Mini Bar */}
          <div className="flex items-center gap-1 font-mono text-[10px]">
            <span className="text-ok font-bold">2xx: {project.apiCodes.code2xx}%</span>
            {project.apiCodes.code5xx > 0 ? (
              <span className="text-critical font-bold">
                5xx: {project.apiCodes.code5xx}%
              </span>
            ) : null}
          </div>
        </div>

        {/* Footer: Last check & Click cue */}
        <div className="mt-2.5 flex items-center justify-between border-t border-border/40 pt-2 text-[10px] text-fg-muted">
          <span>
            Последняя проверка:{" "}
            {project.lastSuccessCheckSecondsAgo === 0
              ? "только что"
              : `${project.lastSuccessCheckSecondsAgo}с назад`}
          </span>
          <span className="text-primary font-bold transition-transform group-hover:translate-x-0.5">
            Открыть детали →
          </span>
        </div>
      </div>
    </div>
  );
}
