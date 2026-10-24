"use client";

import { useId, useState } from "react";

interface DataPoint {
  sprint: string;
  tasks: number;
  commits: number;
  storyPoints: number;
}

const sprintHistory: DataPoint[] = [
  { sprint: "Спринт 7", tasks: 410, commits: 310, storyPoints: 290 },
  { sprint: "Спринт 8", tasks: 480, commits: 360, storyPoints: 340 },
  { sprint: "Спринт 9", tasks: 540, commits: 395, storyPoints: 385 },
  { sprint: "Спринт 10", tasks: 610, commits: 430, storyPoints: 430 },
  { sprint: "Спринт 11", tasks: 670, commits: 510, storyPoints: 480 },
  { sprint: "Спринт 12", tasks: 745, commits: 550, storyPoints: 520 },
  { sprint: "Спринт 13", tasks: 810, commits: 620, storyPoints: 580 },
  { sprint: "Спринт 14", tasks: 894, commits: 685, storyPoints: 640 },
];

export function SprintVelocityChart({ embedded = false }: { embedded?: boolean } = {}) {
  const [activeMetric, setActiveMetric] = useState<"tasks" | "commits" | "both">("both");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const uid = useId().replace(/:/g, "");

  // Responsive viewBox coordinates (calibrated to perfectly match combined right column)
  const width = 840;
  const height = 370;
  const padding = { top: 30, right: 30, bottom: 44, left: 54 };

  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;

  const maxVal = 1000;
  const minVal = 200;

  const getX = (idx: number) => padding.left + (idx / (sprintHistory.length - 1)) * innerW;
  const getY = (val: number) =>
    padding.top + innerH - ((val - minVal) / (maxVal - minVal)) * innerH;

  // Build bezier curves
  const makeBezier = (values: number[]) => {
    const pts = values.map((v, i) => ({ x: getX(i), y: getY(v) }));
    let d = `M ${pts[0]!.x} ${pts[0]!.y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i]!;
      const p1 = pts[i + 1]!;
      const cx = (p0.x + p1.x) / 2;
      d += ` C ${cx} ${p0.y}, ${cx} ${p1.y}, ${p1.x} ${p1.y}`;
    }
    return { pathD: d, pts };
  };

  const tasksData = makeBezier(sprintHistory.map((d) => d.tasks));
  const commitsData = makeBezier(sprintHistory.map((d) => d.commits));

  const tasksAreaD = `${tasksData.pathD} L ${tasksData.pts[tasksData.pts.length - 1]!.x} ${
    padding.top + innerH
  } L ${tasksData.pts[0]!.x} ${padding.top + innerH} Z`;

  const commitsAreaD = `${commitsData.pathD} L ${commitsData.pts[commitsData.pts.length - 1]!.x} ${
    padding.top + innerH
  } L ${commitsData.pts[0]!.x} ${padding.top + innerH} Z`;

  const hoveredItem = hoveredIdx !== null ? sprintHistory[hoveredIdx] : null;
  const hoveredX = hoveredIdx !== null ? getX(hoveredIdx) : null;

  return (
    <div
      className={`flex h-full flex-col justify-between ${
        embedded
          ? ""
          : "rounded-xl border border-border bg-elevated/80 p-4 shadow-xs backdrop-blur-md transition-colors sm:p-5"
      }`}
    >
      {/* Sub Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-fg-muted">Показатели:</span>
          <span className="rounded bg-ok/15 px-1.5 py-0.5 font-mono text-[10px] font-bold text-ok">
            +24% темп
          </span>
        </div>

        {/* Metric Toggles */}
        <div className="inline-flex rounded-lg border border-border bg-muted/60 p-0.5 text-xs">
          <button
            type="button"
            onClick={() => setActiveMetric("both")}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition cursor-pointer ${
              activeMetric === "both"
                ? "bg-primary text-[#042428] font-bold shadow-xs"
                : "text-fg-muted hover:text-foreground"
            }`}
          >
            Все метрики
          </button>
          <button
            type="button"
            onClick={() => setActiveMetric("tasks")}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition cursor-pointer ${
              activeMetric === "tasks"
                ? "bg-primary text-[#042428] font-bold shadow-xs"
                : "text-fg-muted hover:text-foreground"
            }`}
          >
            Задачи
          </button>
          <button
            type="button"
            onClick={() => setActiveMetric("commits")}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition cursor-pointer ${
              activeMetric === "commits"
                ? "bg-primary text-[#042428] font-bold shadow-xs"
                : "text-fg-muted hover:text-foreground"
            }`}
          >
            Коммиты
          </button>
        </div>
      </div>

      {/* SVG Chart Container */}
      <div className="relative mt-2 w-full flex-1 flex flex-col justify-center min-h-[300px] sm:min-h-[340px]">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full flex-1 overflow-visible h-[300px] sm:h-[340px] lg:h-[360px]"
        >
          <defs>
            {/* Primary Tasks Gradient */}
            <linearGradient id={`tasks-grad-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#33b3b2" stopOpacity="0.32" />
              <stop offset="95%" stopColor="#33b3b2" stopOpacity="0.0" />
            </linearGradient>

            {/* Commits Gradient */}
            <linearGradient id={`commits-grad-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#16a34a" stopOpacity="0.25" />
              <stop offset="95%" stopColor="#16a34a" stopOpacity="0.0" />
            </linearGradient>

            {/* Glow Filter */}
            <filter id={`chart-glow-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Grid lines and Y-axis values */}
          {[0, 0.2, 0.4, 0.6, 0.8, 1].map((pct) => {
            const y = padding.top + pct * innerH;
            const val = Math.round(maxVal - pct * (maxVal - minVal));
            return (
              <g key={pct}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="currentColor"
                  className="text-border/60"
                  strokeDasharray="4 4"
                />
                <text
                  x={padding.left - 10}
                  y={y + 3.5}
                  textAnchor="end"
                  className="fill-fg-muted font-mono text-[10px]"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Commits Area & Line (Green / Status Success) */}
          {(activeMetric === "both" || activeMetric === "commits") && (
            <>
              <path d={commitsAreaD} fill={`url(#commits-grad-${uid})`} />
              <path
                d={commitsData.pathD}
                fill="none"
                stroke="#16a34a"
                strokeWidth="2.5"
                strokeLinecap="round"
                filter={`url(#chart-glow-${uid})`}
              />
            </>
          )}

          {/* Tasks Area & Line (Teal / Primary) */}
          {(activeMetric === "both" || activeMetric === "tasks") && (
            <>
              <path d={tasksAreaD} fill={`url(#tasks-grad-${uid})`} />
              <path
                d={tasksData.pathD}
                fill="none"
                stroke="#33b3b2"
                strokeWidth="3"
                strokeLinecap="round"
                filter={`url(#chart-glow-${uid})`}
              />
            </>
          )}

          {/* Vertical Hover Guideline */}
          {hoveredX !== null && (
            <line
              x1={hoveredX}
              y1={padding.top - 6}
              x2={hoveredX}
              y2={padding.top + innerH}
              stroke="currentColor"
              className="text-primary/70"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
          )}

          {/* Interactive Sprint Data Columns & Markers */}
          {sprintHistory.map((item, i) => {
            const x = getX(i);
            const taskPt = tasksData.pts[i]!;
            const commitPt = commitsData.pts[i]!;
            const isHovered = hoveredIdx === i;

            return (
              <g
                key={item.sprint}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="cursor-pointer"
              >
                {/* Generous touch target */}
                <rect
                  x={x - 28}
                  y={padding.top}
                  width={56}
                  height={innerH + 30}
                  fill="transparent"
                />

                {/* Commits Point Marker */}
                {(activeMetric === "both" || activeMetric === "commits") && (
                  <circle
                    cx={commitPt.x}
                    cy={commitPt.y}
                    r={isHovered ? 5.5 : 4}
                    fill="#10b981"
                    stroke="#042428"
                    strokeWidth="2"
                    className="transition-all duration-150"
                  />
                )}

                {/* Tasks Point Marker */}
                {(activeMetric === "both" || activeMetric === "tasks") && (
                  <circle
                    cx={taskPt.x}
                    cy={taskPt.y}
                    r={isHovered ? 7 : 5}
                    fill="#00cbd9"
                    stroke="#042428"
                    strokeWidth="2.5"
                    className="transition-all duration-150"
                  />
                )}

                {/* X-Axis Sprint Label */}
                <text
                  x={x}
                  y={height - 12}
                  textAnchor="middle"
                  className={`font-mono text-[11px] transition-colors ${
                    isHovered ? "fill-primary font-bold text-[12px]" : "fill-fg-muted"
                  }`}
                >
                  {item.sprint}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating Tooltip with Full Breakdown */}
        {hoveredItem && hoveredX !== null && (
          <div
            className="pointer-events-none absolute -top-4 rounded-xl border border-primary/50 bg-elevated/95 p-3 shadow-2xl backdrop-blur-md transition-all font-mono"
            style={{
              left: `${(hoveredX / width) * 100}%`,
              transform: "translate(-50%, -100%)",
            }}
          >
            <p className="border-b border-border/70 pb-1 text-xs font-bold text-foreground">
              {hoveredItem.sprint}
            </p>
            <div className="mt-1.5 space-y-1 text-xs">
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-1.5 text-primary font-medium">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  Задачи:
                </span>
                <span className="font-bold text-foreground">{hoveredItem.tasks} шт.</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-1.5 text-ok font-medium">
                  <span className="h-2 w-2 rounded-full bg-ok" />
                  Коммиты:
                </span>
                <span className="font-bold text-foreground">{hoveredItem.commits}</span>
              </div>
              <div className="flex items-center justify-between gap-4 pt-1 border-t border-border/50 text-[10px] text-fg-muted">
                <span>Story Points:</span>
                <span className="font-bold text-foreground">{hoveredItem.storyPoints} pts</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Chart Legend */}
      <div className="mt-2 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-3 text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            <span className="text-fg-muted">Закрытые задачи</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-ok" />
            <span className="text-fg-muted">Git-коммиты</span>
          </div>
        </div>

        <span className="font-mono text-[11px] text-fg-muted">
          Текущий темп: <strong className="text-foreground">894 таски</strong> в спринт
        </span>
      </div>
    </div>
  );
}
