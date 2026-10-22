"use client";

import { useId, useState } from "react";

interface DayData {
  day: string;
  date: string;
  commits: number;
  prs: number;
  peakHour: string;
}

const weeklyData: DayData[] = [
  { day: "Пн", date: "16 окт", commits: 42, prs: 7, peakHour: "15:00" },
  { day: "Вт", date: "17 окт", commits: 68, prs: 12, peakHour: "18:30" },
  { day: "Ср", date: "18 окт", commits: 84, prs: 15, peakHour: "20:00" },
  { day: "Чт", date: "19 окт", commits: 76, prs: 11, peakHour: "19:15" },
  { day: "Пт", date: "20 окт", commits: 95, prs: 18, peakHour: "17:45" },
  { day: "Сб", date: "21 окт", commits: 52, prs: 8, peakHour: "14:20" },
  { day: "Вс", date: "22 окт", commits: 38, prs: 5, peakHour: "21:10" },
];

export function WeeklyCommitsBarChart({ embedded = false }: { embedded?: boolean } = {}) {
  const [hoveredDay, setHoveredDay] = useState<DayData | null>(null);
  const uid = useId().replace(/:/g, "");

  const totalCommits = weeklyData.reduce((acc, d) => acc + d.commits, 0);
  const totalPrs = weeklyData.reduce((acc, d) => acc + d.prs, 0);
  const maxCommits = Math.max(...weeklyData.map((d) => d.commits));

  const width = 720;
  const height = 320;
  const padding = { top: 30, right: 40, bottom: 48, left: 40 };
  const innerH = height - padding.top - padding.bottom;
  const innerW = width - padding.left - padding.right;

  return (
    <div
      className={`flex h-full flex-col justify-between ${
        embedded
          ? ""
          : "rounded-xl border border-border bg-elevated/80 p-4 shadow-xs backdrop-blur-md transition-colors sm:p-5"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 pb-2.5">
        <div>
          <span className="text-[11px] font-mono text-fg-muted">Распределение нагрузки:</span>
        </div>
        <div className="rounded-lg border border-border bg-muted/50 px-2.5 py-1 text-right font-mono text-xs">
          <span className="font-bold text-ok">{totalCommits}</span>{" "}
          <span className="text-fg-muted">коммитов ·</span>{" "}
          <span className="font-bold text-primary">{totalPrs}</span>{" "}
          <span className="text-fg-muted">PRs</span>
        </div>
      </div>

      {/* Centered SVG Bar Chart Visualization */}
      <div className="relative my-auto w-full flex-1 flex flex-col items-center justify-center min-h-[280px] sm:min-h-[320px] py-2">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-full w-full max-h-[340px] max-w-[720px] mx-auto overflow-visible"
        >
          <defs>
            <linearGradient id={`bar-grad-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00cbd9" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#00cbd9" stopOpacity="0.25" />
            </linearGradient>
            <linearGradient id={`bar-hover-grad-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="1" />
              <stop offset="100%" stopColor="#00cbd9" stopOpacity="0.5" />
            </linearGradient>
          </defs>

          {/* Guide baseline */}
          <line
            x1={padding.left}
            y1={padding.top + innerH}
            x2={width - padding.right}
            y2={padding.top + innerH}
            stroke="currentColor"
            className="text-border/70"
            strokeWidth="1"
          />

          {weeklyData.map((item, idx) => {
            const barWidth = 44;
            const gap = (innerW - barWidth * weeklyData.length) / (weeklyData.length + 1);
            const x = padding.left + gap + idx * (barWidth + gap);
            const barH = (item.commits / maxCommits) * (innerH - 24);
            const y = padding.top + innerH - barH;
            const isHovered = hoveredDay?.day === item.day;

            return (
              <g
                key={item.day}
                onMouseEnter={() => setHoveredDay(item)}
                onMouseLeave={() => setHoveredDay(null)}
                className="cursor-pointer"
              >
                {/* Touch / Hover Area */}
                <rect
                  x={x - 6}
                  y={padding.top}
                  width={barWidth + 12}
                  height={innerH + 30}
                  fill="transparent"
                />

                {/* Bar */}
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barH}
                  rx="6"
                  fill={isHovered ? `url(#bar-hover-grad-${uid})` : `url(#bar-grad-${uid})`}
                  className="transition-all duration-200"
                  style={{
                    filter: isHovered ? "drop-shadow(0 0 8px rgba(16, 185, 129, 0.45))" : undefined,
                  }}
                />

                {/* Commit Count above bar */}
                <text
                  x={x + barWidth / 2}
                  y={y - 8}
                  textAnchor="middle"
                  className={`font-mono text-[11px] font-bold transition-colors ${
                    isHovered ? "fill-ok" : "fill-fg-muted"
                  }`}
                >
                  {item.commits}
                </text>

                {/* Day label below baseline */}
                <text
                  x={x + barWidth / 2}
                  y={padding.top + innerH + 20}
                  textAnchor="middle"
                  className={`font-mono text-[12px] transition-colors ${
                    isHovered ? "fill-primary font-bold" : "fill-fg-muted"
                  }`}
                >
                  {item.day}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Details */}
        {hoveredDay && (
          <div className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 rounded-xl border border-primary/50 bg-elevated/95 px-3.5 py-2 shadow-2xl backdrop-blur-md font-mono text-center">
            <p className="text-[11px] text-fg-muted">
              {hoveredDay.day}, {hoveredDay.date}
            </p>
            <p className="text-xs font-bold text-foreground">
              {hoveredDay.commits} коммитов · {hoveredDay.prs} PR
            </p>
            <p className="text-[10px] text-primary">
              Пик активности: {hoveredDay.peakHour}
            </p>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-2 flex items-center justify-between border-t border-border/60 pt-2.5 text-[11px] font-mono text-fg-muted">
        <span>Самый активный день: <strong className="text-ok">Пятница (95 коммитов)</strong></span>
        <span>Среднее: 65 коммитов/день</span>
      </div>
    </div>
  );
}
