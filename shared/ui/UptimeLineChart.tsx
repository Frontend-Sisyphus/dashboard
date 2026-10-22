"use client";

import { useId, useMemo, useState } from "react";
import type { DailyUptimePoint, UptimePeriod } from "@/lib/monitoring/types";

type UptimeLineChartProps = {
  historyDaily: DailyUptimePoint[];
  period: UptimePeriod;
  currentUptime: number;
};

interface ChartPoint {
  index: number;
  label: string;
  fullDate: string;
  uptime: number;
  status: "up" | "degraded" | "down";
  x: number;
  y: number;
}

function formatDateLabel(isoDate: string): string {
  try {
    const parts = isoDate.split("-");
    if (parts.length === 3) {
      return `${parts[2]}.${parts[1]}`;
    }
    const d = new Date(isoDate);
    return `${d.getDate().toString().padStart(2, "0")}.${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
  } catch {
    return isoDate;
  }
}

function formatFullDate(isoDate: string): string {
  try {
    const d = new Date(isoDate);
    const months = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  } catch {
    return isoDate;
  }
}

export function UptimeLineChart({
  historyDaily,
  period,
  currentUptime,
}: UptimeLineChartProps) {
  const gradientId = useId();
  const [hoveredPoint, setHoveredPoint] = useState<ChartPoint | null>(null);

  // Filter or generate points according to the period
  const rawPoints = useMemo(() => {
    if (period === "24h") {
      // 24 hourly points
      const points: {
        label: string;
        fullDate: string;
        uptime: number;
        status: "up" | "degraded" | "down";
      }[] = [];
      const now = new Date();
      for (let i = 23; i >= 0; i--) {
        const h = new Date(now.getTime() - i * 3600 * 1000);
        const hourStr = `${h.getHours().toString().padStart(2, "0")}:00`;
        const isDegraded = i === 4 && currentUptime < 99.5;
        const uptime = isDegraded ? 97.2 : 100;
        points.push({
          label: hourStr,
          fullDate: `${hourStr}, ${formatFullDate(h.toISOString())}`,
          uptime,
          status: isDegraded ? "degraded" : "up",
        });
      }
      return points;
    }

    const count = period === "7d" ? 7 : period === "30d" ? 30 : 90;
    const slice = historyDaily.slice(-count);

    return slice.map((item) => ({
      label: formatDateLabel(item.date),
      fullDate: formatFullDate(item.date),
      uptime: item.uptime,
      status: item.status,
    }));
  }, [historyDaily, period, currentUptime]);

  // Dimensions & bounds
  const width = 760;
  const height = 230;
  const paddingLeft = 52;
  const paddingRight = 24;
  const paddingTop = 26;
  const paddingBottom = 42;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  // Compute min uptime to scale Y-axis reasonably
  const minValRaw = Math.min(...rawPoints.map((p) => p.uptime));
  // Keep base at at least 95% or lower if there was a serious dip, ceiling at 100%
  const minY = Math.max(90, Math.floor(Math.min(minValRaw - 0.5, 98)));
  const maxY = 100;
  const yRange = maxY - minY || 1;

  // Build plotted points
  const points: ChartPoint[] = useMemo(() => {
    return rawPoints.map((pt, idx) => {
      const x =
        paddingLeft +
        (rawPoints.length > 1
          ? (idx / (rawPoints.length - 1)) * chartWidth
          : chartWidth / 2);
      const clampedUptime = Math.min(maxY, Math.max(minY, pt.uptime));
      const y =
        paddingTop +
        chartHeight -
        ((clampedUptime - minY) / yRange) * chartHeight;

      return {
        index: idx,
        label: pt.label,
        fullDate: pt.fullDate,
        uptime: pt.uptime,
        status: pt.status,
        x,
        y,
      };
    });
  }, [rawPoints, chartWidth, chartHeight, paddingLeft, paddingTop, minY, maxY, yRange]);

  // Construct SVG path data
  const linePath = useMemo(() => {
    if (points.length === 0) return "";
    return points.reduce((acc, curr, idx) => {
      if (idx === 0) return `M ${curr.x.toFixed(1)} ${curr.y.toFixed(1)}`;
      return `${acc} L ${curr.x.toFixed(1)} ${curr.y.toFixed(1)}`;
    }, "");
  }, [points]);

  const areaPath = useMemo(() => {
    if (points.length === 0) return "";
    const bottomY = (paddingTop + chartHeight).toFixed(1);
    const firstX = points[0]!.x.toFixed(1);
    const lastX = points[points.length - 1]!.x.toFixed(1);
    return `${linePath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  }, [linePath, points, paddingTop, chartHeight]);

  // SLA line Y coordinate (99.9%)
  const slaUptime = 99.9;
  const slaY =
    slaUptime >= minY && slaUptime <= maxY
      ? paddingTop + chartHeight - ((slaUptime - minY) / yRange) * chartHeight
      : null;

  // Ticks for Y axis
  const yTicks = useMemo(() => {
    const ticks: number[] = [100];
    if (minY <= 99.5) ticks.push(99.5);
    if (minY <= 99.0) ticks.push(99.0);
    if (minY <= 98.0) ticks.push(98.0);
    if (minY <= 95.0) ticks.push(95.0);
    if (!ticks.includes(minY)) ticks.push(minY);
    return Array.from(new Set(ticks)).sort((a, b) => b - a);
  }, [minY]);

  // Ticks for X axis dates
  const xTickIndices = useMemo(() => {
    const total = points.length;
    if (total <= 7) return points.map((_, i) => i);
    const step = Math.ceil(total / 6);
    const indices: number[] = [];
    for (let i = 0; i < total; i += step) {
      indices.push(i);
    }
    if (indices[indices.length - 1] !== total - 1) {
      indices.push(total - 1);
    }
    return indices;
  }, [points]);

  // Summary statistics
  const avgPeriodUptime = useMemo(() => {
    if (rawPoints.length === 0) return 100;
    const sum = rawPoints.reduce((acc, p) => acc + p.uptime, 0);
    return +(sum / rawPoints.length).toFixed(2);
  }, [rawPoints]);

  const fullyOperationalDays = useMemo(() => {
    return rawPoints.filter((p) => p.uptime >= 99.9).length;
  }, [rawPoints]);

  return (
    <div className="space-y-3">
      {/* KPI mini-header over the chart */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">
            Динамика доступности ({rawPoints.length}{" "}
            {period === "24h" ? "часов" : "дней"})
          </span>
          <span className="rounded-md border border-border bg-muted/50 px-2 py-0.5 text-[11px] font-mono text-fg-muted">
            SLA порог: 99.9%
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 font-mono text-[11px]">
          <span className="text-fg-muted">
            Средняя:{" "}
            <strong className="text-ok font-bold">{avgPeriodUptime}%</strong>
          </span>
          <span className="text-fg-muted">
            Минимум:{" "}
            <strong
              className={`font-bold ${
                minValRaw >= 99.5
                  ? "text-ok"
                  : minValRaw >= 98
                  ? "text-warn"
                  : "text-critical"
              }`}
            >
              {minValRaw.toFixed(2)}%
            </strong>
          </span>
          <span className="text-fg-muted">
            100% дни:{" "}
            <strong className="text-foreground font-bold">
              {fullyOperationalDays}/{rawPoints.length}
            </strong>
          </span>
        </div>
      </div>

      {/* SVG Linear Chart Container */}
      <div className="relative rounded-xl border border-border bg-muted/40 p-2 sm:p-4 shadow-inner overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible select-none"
          onMouseLeave={() => setHoveredPoint(null)}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary, #00cbd9)" stopOpacity="0.32" />
              <stop offset="60%" stopColor="var(--color-primary, #00cbd9)" stopOpacity="0.08" />
              <stop offset="100%" stopColor="var(--color-primary, #00cbd9)" stopOpacity="0.00" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid lines and Y labels */}
          {yTicks.map((val) => {
            const y =
              paddingTop +
              chartHeight -
              ((val - minY) / yRange) * chartHeight;
            return (
              <g key={val} className="text-[10px] font-mono">
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="var(--color-border, rgba(255,255,255,0.08))"
                  strokeDasharray={val === 100 ? undefined : "3 3"}
                  strokeWidth="1"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 3.5}
                  textAnchor="end"
                  fill="var(--color-fg-muted, #71717a)"
                  className="text-[10px] font-mono select-none"
                >
                  {val}%
                </text>
              </g>
            );
          })}

          {/* SLA Target reference line (99.9%) */}
          {slaY !== null && (
            <g className="text-[9px] font-mono">
              <line
                x1={paddingLeft}
                y1={slaY}
                x2={width - paddingRight}
                y2={slaY}
                stroke="#17786c"
                strokeDasharray="4 4"
                strokeWidth="1.2"
                opacity="0.85"
              />
              <text
                x={width - paddingRight - 4}
                y={slaY - 4}
                textAnchor="end"
                fill="#17786c"
                fontWeight="bold"
                className="select-none"
              >
                SLA 99.9%
              </text>
            </g>
          )}

          {/* Area under the line */}
          <path d={areaPath} fill={`url(#${gradientId})`} />

          {/* Polyline */}
          <path
            d={linePath}
            fill="none"
            stroke="var(--color-primary, #00cbd9)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Individual Data Points */}
          {points.map((pt) => {
            const isHovered = hoveredPoint?.index === pt.index;
            const isIssue = pt.uptime < 99.0;
            const dotColor = isIssue ? "#dc2626" : "var(--color-primary, #00cbd9)";

            return (
              <g
                key={pt.index}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredPoint(pt)}
              >
                {/* Invisible large hit target for easy mouse hover */}
                <circle cx={pt.x} cy={pt.y} r="9" fill="transparent" />

                {/* Visible dot */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 5.5 : isIssue ? 4 : points.length > 40 ? 2 : 3}
                  fill={isHovered ? "#ffffff" : dotColor}
                  stroke={dotColor}
                  strokeWidth={isHovered ? 2.5 : 1.5}
                  className="transition-all duration-150"
                />
              </g>
            );
          })}

          {/* Active Hover Crosshair */}
          {hoveredPoint && (
            <g pointerEvents="none">
              <line
                x1={hoveredPoint.x}
                y1={paddingTop}
                x2={hoveredPoint.x}
                y2={paddingTop + chartHeight}
                stroke="var(--color-primary, #00cbd9)"
                strokeDasharray="3 3"
                strokeWidth="1.5"
                opacity="0.75"
              />
              <circle
                cx={hoveredPoint.x}
                cy={hoveredPoint.y}
                r="6.5"
                fill="var(--color-primary, #00cbd9)"
                stroke="#ffffff"
                strokeWidth="2"
              />
            </g>
          )}

          {/* X Axis Date Labels */}
          {xTickIndices.map((idx) => {
            const pt = points[idx];
            if (!pt) return null;
            return (
              <text
                key={idx}
                x={pt.x}
                y={height - paddingBottom + 18}
                textAnchor="middle"
                fill="var(--color-fg-muted, #71717a)"
                className="text-[10px] font-mono select-none"
              >
                {pt.label}
              </text>
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredPoint && (
          <div
            className="pointer-events-none absolute z-20 flex flex-col gap-0.5 rounded-lg border border-border bg-elevated/95 px-3 py-2 text-xs shadow-xl backdrop-blur-md transition-all duration-75"
            style={{
              left: `${(hoveredPoint.x / width) * 100}%`,
              top: `${Math.max(10, (hoveredPoint.y / height) * 100 - 32)}%`,
              transform:
                hoveredPoint.x > width * 0.75
                  ? "translate(-105%, -50%)"
                  : hoveredPoint.x < width * 0.25
                  ? "translate(15%, -50%)"
                  : "translate(-50%, -100%)",
            }}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-semibold text-foreground">
                {hoveredPoint.fullDate}
              </span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider ${
                  hoveredPoint.status === "up"
                    ? "bg-ok/20 text-ok"
                    : hoveredPoint.status === "degraded"
                    ? "bg-warn/20 text-warn"
                    : "bg-critical/20 text-critical"
                }`}
              >
                {hoveredPoint.status === "up"
                  ? "В строю"
                  : hoveredPoint.status === "degraded"
                  ? "Деградация"
                  : "Сбой"}
              </span>
            </div>
            <div className="flex items-baseline gap-1.5 font-mono">
              <span className="text-fg-muted text-[11px]">Доступность:</span>
              <strong
                className={`text-sm font-bold ${
                  hoveredPoint.uptime >= 99.9
                    ? "text-ok"
                    : hoveredPoint.uptime >= 98.0
                    ? "text-warn"
                    : "text-critical"
                }`}
              >
                {hoveredPoint.uptime}%
              </strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
