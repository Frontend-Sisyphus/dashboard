"use client";

import { useId, useState } from "react";
import { mockEcosystemProjects } from "@/entities/project";

interface PhaseSlice {
  phase: "production" | "beta" | "development" | "mvp";
  label: string;
  count: number;
  percent: number;
  color: string;
  glowColor: string;
  description: string;
}

interface ProjectLifecycleDonutProps {
  activePhase?: string;
  onSelectPhase?: (phase: "all" | "production" | "beta" | "development" | "mvp") => void;
}

export function ProjectLifecycleDonut({
  activePhase = "all",
  onSelectPhase,
}: ProjectLifecycleDonutProps) {
  const [hoveredPhase, setHoveredPhase] = useState<string | null>(null);
  const uid = useId().replace(/:/g, "");

  const total = mockEcosystemProjects.length;

  const slices: PhaseSlice[] = [
    {
      phase: "production",
      label: "Production",
      count: mockEcosystemProjects.filter((p) => p.phase === "production").length,
      percent: Math.round((mockEcosystemProjects.filter((p) => p.phase === "production").length / total) * 100),
      color: "#10b981", // Emerald green
      glowColor: "rgba(16, 185, 129, 0.4)",
      description: "Работающие проекты",
    },
    {
      phase: "beta",
      label: "Beta Testing",
      count: mockEcosystemProjects.filter((p) => p.phase === "beta").length,
      percent: Math.round((mockEcosystemProjects.filter((p) => p.phase === "beta").length / total) * 100),
      color: "#00cbd9", // Cyan/Primary
      glowColor: "rgba(0, 203, 217, 0.4)",
      description: "Открытое и закрытое тестирование",
    },
    {
      phase: "development",
      label: "Development",
      count: mockEcosystemProjects.filter((p) => p.phase === "development").length,
      percent: Math.round((mockEcosystemProjects.filter((p) => p.phase === "development").length / total) * 100),
      color: "#3b82f6", // Royal blue
      glowColor: "rgba(59, 130, 246, 0.4)",
      description: "Активная разработка",
    },
    {
      phase: "mvp",
      label: "MVP / Proto",
      count: mockEcosystemProjects.filter((p) => p.phase === "mvp").length,
      percent: Math.round((mockEcosystemProjects.filter((p) => p.phase === "mvp").length / total) * 100),
      color: "#f59e0b", // Amber warn
      glowColor: "rgba(245, 158, 11, 0.4)",
      description: "Проверка гипотез и прототипы",
    },
  ];

  // SVG Geometry
  const size = 180;
  const strokeWidth = 26;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  let accumulatedPercent = 0;

  const activeOrHovered = hoveredPhase
    ? slices.find((s) => s.phase === hoveredPhase)
    : activePhase !== "all"
      ? slices.find((s) => s.phase === activePhase)
      : null;

  return (
    <div className="flex flex-col justify-between rounded-xl border border-border bg-elevated/70 p-4 shadow-xs backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-border/60 pb-2.5">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-fg-muted">
            Жизненный цикл сервисов
          </h3>
          <p className="mt-0.5 text-xs text-foreground/80">
            Распределение 18 проектов по статусу
          </p>
        </div>
        <span className="font-mono text-xs font-bold text-primary">
          {total} репозиториев
        </span>
      </div>

      <div className="mt-3 flex flex-col items-center gap-4 sm:flex-row sm:justify-around">
        {/* SVG Donut */}
        <div className="relative shrink-0">
          <svg width={size} height={size} className="transform -rotate-90">
            <defs>
              <filter id={`donut-glow-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Base Background Track */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              className="text-muted/40"
              fill="none"
            />

            {/* Segments */}
            {slices.map((slice) => {
              const strokeDasharray = `${(slice.percent / 100) * circumference} ${circumference}`;
              const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
              accumulatedPercent += slice.percent;

              const isHighlighted = hoveredPhase === slice.phase || activePhase === slice.phase;

              return (
                <circle
                  key={slice.phase}
                  cx={center}
                  cy={center}
                  r={radius}
                  stroke={slice.color}
                  strokeWidth={isHighlighted ? strokeWidth + 4 : strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  fill="none"
                  className="transition-all duration-300 cursor-pointer"
                  style={{
                    filter: isHighlighted ? `drop-shadow(0 0 6px ${slice.glowColor})` : undefined,
                  }}
                  onMouseEnter={() => setHoveredPhase(slice.phase)}
                  onMouseLeave={() => setHoveredPhase(null)}
                  onClick={() => {
                    if (onSelectPhase) {
                      onSelectPhase(activePhase === slice.phase ? "all" : slice.phase);
                    }
                  }}
                />
              );
            })}
          </svg>

          {/* Central Summary */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="font-mono text-2xl font-black tracking-tight text-foreground">
              {activeOrHovered ? activeOrHovered.count : total}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-fg-muted">
              {activeOrHovered ? activeOrHovered.label : "Всего"}
            </span>
            {activeOrHovered && (
              <span className="font-mono text-[10px] text-primary font-semibold">
                {activeOrHovered.percent}% экосистемы
              </span>
            )}
          </div>
        </div>

        {/* Legend / Interactive Selector */}
        <div className="flex w-full flex-col gap-2 sm:max-w-[210px]">
          {slices.map((slice) => {
            const isSelected = activePhase === slice.phase;
            const isHovered = hoveredPhase === slice.phase;

            return (
              <button
                key={slice.phase}
                type="button"
                onClick={() => {
                  if (onSelectPhase) {
                    onSelectPhase(isSelected ? "all" : slice.phase);
                  }
                }}
                onMouseEnter={() => setHoveredPhase(slice.phase)}
                onMouseLeave={() => setHoveredPhase(null)}
                className={`group flex items-center justify-between rounded-lg border px-2.5 py-1.5 text-left transition cursor-pointer ${isSelected
                  ? "border-primary bg-primary/15 shadow-xs"
                  : isHovered
                    ? "border-border-strong bg-muted/60"
                    : "border-border/60 bg-muted/30 hover:border-border-strong"
                  }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-sm shrink-0 transition-transform group-hover:scale-125"
                    style={{ backgroundColor: slice.color }}
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-foreground truncate">
                      {slice.label}
                    </p>
                    <p className="text-[10px] text-fg-muted font-mono">
                      {slice.description}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0 pl-2">
                  <span className="font-mono text-xs font-bold text-foreground">
                    {slice.count}
                  </span>
                  <span className="block font-mono text-[9px] text-fg-muted">
                    {slice.percent}%
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
