"use client";

import type {
  ProjectMonitoringData,
  UptimePeriod,
} from "@/lib/monitoring/types";
import { priorityColorMap, statusLabelMap } from "@/lib/monitoring/types";

type ProjectMonitorTableProps = {
  projects: ProjectMonitoringData[];
  period: UptimePeriod;
  onSelect: (project: ProjectMonitoringData) => void;
};

export function ProjectMonitorTable({
  projects,
  period,
  onSelect,
}: ProjectMonitorTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-elevated/70 shadow-xs transition-colors">
      <table className="w-full text-left text-xs">
        <thead className="border-b border-border bg-muted/60 text-[10px] font-bold uppercase tracking-wider text-fg-muted">
          <tr>
            <th className="px-3.5 py-3">Проект / Стек</th>
            <th className="px-3 py-3">Статус</th>
            <th className="px-3 py-3">Приоритет</th>
            <th className="px-3 py-3 text-right">Uptime ({period})</th>
            <th className="px-3 py-3 text-right">Онлайн</th>
            <th className="px-3 py-3 text-right">Latency / RPS</th>
            <th className="px-3 py-3 text-right">CPU / RAM</th>
            <th className="px-3 py-3 text-right">Диск (своб/IO)</th>
            <th className="px-3 py-3 text-right">API 2xx / 5xx</th>
            <th className="px-3 py-3">Проверка</th>
            <th className="px-3.5 py-3 text-center">Инспектор</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60 font-mono">
          {projects.map((project) => {
            const uptimeVal =
              period === "24h"
                ? project.uptime.last24h
                : period === "7d"
                ? project.uptime.last7d
                : period === "90d"
                ? project.uptime.last90d
                : project.uptime.last30d;

            const priorityStyle = priorityColorMap[project.priority];

            const statusDot = {
              operational: "bg-ok",
              degraded: "bg-warn animate-pulse",
              outage: "bg-critical animate-pulse",
              maintenance: "bg-fg-muted",
            }[project.status];

            return (
              <tr
                key={project.id}
                onClick={() => onSelect(project)}
                className="cursor-pointer transition-colors hover:bg-muted/60"
              >
                {/* Project Name + Lead + Tags */}
                <td className="px-3.5 py-3 font-sans">
                  <div className="flex flex-col">
                    <span className="font-brand text-sm font-bold text-foreground hover:text-primary transition-colors">
                      {project.name}
                    </span>
                    <span className="text-[11px] text-fg-muted font-medium">
                      {project.lead.name} · {project.team.length + 1} чел.
                    </span>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {project.tags.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-border/80 bg-muted/60 px-1 py-0.2 text-[9px] font-mono font-medium text-foreground/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </td>

                {/* Status */}
                <td className="px-3 py-3 font-sans">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold">
                    <span className={`h-2 w-2 rounded-full ${statusDot}`} />
                    {statusLabelMap[project.status]}
                  </span>
                </td>

                {/* Priority */}
                <td className="px-3 py-3 font-sans">
                  <span
                    style={{
                      backgroundColor: priorityStyle.bg,
                      color: priorityStyle.text,
                      borderColor: priorityStyle.border,
                    }}
                    className="rounded-md border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                  >
                    {project.priority.split(" - ")[0]}
                  </span>
                </td>

                {/* Uptime */}
                <td className="px-3 py-3 text-right">
                  <span
                    className={`font-bold ${
                      uptimeVal >= 99.9
                        ? "text-ok"
                        : uptimeVal >= 98.5
                        ? "text-warn"
                        : "text-critical"
                    }`}
                  >
                    {uptimeVal}%
                  </span>
                </td>

                {/* Real-time users */}
                <td className="px-3 py-3 text-right">
                  <div className="inline-flex items-center gap-1.5 font-bold text-ok">
                    <span className="h-1.5 w-1.5 rounded-full bg-ok animate-ping" />
                    {project.users.realtimeActiveUsers}
                  </div>
                </td>

                {/* Latency & RPS */}
                <td className="px-3 py-3 text-right text-foreground">
                  <div className="font-semibold">{project.performance.responseTimeAvg} мс</div>
                  <div className="text-[10px] text-fg-muted font-medium">
                    {project.performance.rps} req/s
                  </div>
                </td>

                {/* CPU & RAM */}
                <td className="px-3 py-3 text-right text-foreground">
                  <div>CPU: {project.hardware.cpuUsagePercent}%</div>
                  <div className="text-[10px] text-fg-muted">
                    RAM: {project.hardware.memoryPercent}%
                  </div>
                </td>

                {/* Disk Free & IO */}
                <td className="px-3 py-3 text-right text-foreground">
                  <div>{project.hardware.diskFreeGb} GB</div>
                  <div className="text-[10px] text-fg-muted">
                    {project.hardware.diskReadMbS} MB/s
                  </div>
                </td>

                {/* API Codes */}
                <td className="px-3 py-3 text-right">
                  <div className="text-ok font-bold">2xx: {project.apiCodes.code2xx}%</div>
                  {project.apiCodes.code5xx > 0 ? (
                    <div className="text-critical font-bold">
                      5xx: {project.apiCodes.code5xx}%
                    </div>
                  ) : (
                    <div className="text-[10px] text-fg-muted">5xx: 0%</div>
                  )}
                </td>

                {/* Last check */}
                <td className="px-3 py-3 font-sans text-fg-muted text-[11px]">
                  {project.lastSuccessCheckSecondsAgo === 0
                    ? "сейчас"
                    : `${project.lastSuccessCheckSecondsAgo}с назад`}
                </td>

                {/* Action button */}
                <td className="px-3.5 py-3 text-center">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(project);
                    }}
                    className="rounded-md border border-border bg-muted/60 px-2.5 py-1 text-[11px] font-sans font-semibold text-foreground transition hover:border-primary hover:bg-primary/10 hover:text-primary cursor-pointer active:scale-95"
                  >
                    Инспектор
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
