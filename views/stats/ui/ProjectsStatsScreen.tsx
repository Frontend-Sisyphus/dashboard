"use client";

import { useMemo, useState } from "react";
import {
  mockEcosystemProjects,
  mockEcosystemStatsKpis,
  mockEngineeringEvents,
  mockTechStackDistribution,
  type ProjectStatistic,
} from "@/entities/project";
import { SprintVelocityChart } from "./SprintVelocityChart";
import { ProjectLifecycleDonut } from "./ProjectLifecycleDonut";
import { WeeklyCommitsBarChart } from "./WeeklyCommitsBarChart";

// Minimal SVG Icons (no emojis)
function SearchIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function CloseIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function UsersIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function TargetIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function TrendUpIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

function GridIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}

function TableIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3h18v18H3z" />
      <path d="M3 9h18" />
      <path d="M3 15h18" />
      <path d="M9 3v18" />
    </svg>
  );
}

export function ProjectsStatsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [phaseFilter, setPhaseFilter] = useState<
    "all" | "production" | "beta" | "development" | "mvp"
  >("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"progress" | "tasks" | "commits" | "team">("progress");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [analyticsTab, setAnalyticsTab] = useState<"velocity" | "weekly" | "events">("velocity");
  const [selectedProject, setSelectedProject] = useState<ProjectStatistic | null>(null);

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    return mockEcosystemProjects
      .filter((p) => {
        if (phaseFilter !== "all" && p.phase !== phaseFilter) return false;
        if (categoryFilter !== "all" && p.category !== categoryFilter) return false;

        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase().trim();
        const matchName = p.name.toLowerCase().includes(q);
        const matchSummary = p.summary.toLowerCase().includes(q);
        const matchLead = p.lead.name.toLowerCase().includes(q);
        const matchStack = p.stack.some((s) => s.toLowerCase().includes(q));
        const matchCategory = p.category.toLowerCase().includes(q);

        return matchName || matchSummary || matchLead || matchStack || matchCategory;
      })
      .sort((a, b) => {
        if (sortBy === "progress") return b.roadmapProgress - a.roadmapProgress;
        if (sortBy === "tasks") return b.sprintTasks.completed - a.sprintTasks.completed;
        if (sortBy === "commits") return b.metrics.commitsMonthly - a.metrics.commitsMonthly;
        if (sortBy === "team") return b.teamSize - a.teamSize;
        return 0;
      });
  }, [searchQuery, phaseFilter, categoryFilter, sortBy]);

  const categories = useMemo(() => {
    const list = Array.from(new Set(mockEcosystemProjects.map((p) => p.category)));
    return ["all", ...list];
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-5 sm:gap-6">
      {/* 1. Executive Summary & Observability Header */}
      <div className="rounded-xl border border-border bg-elevated/80 p-4 shadow-sm backdrop-blur-md transition-colors sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="text-base font-bold tracking-tight text-foreground sm:text-lg">
                Статистика и аналитика экосистемы проектов ИТС
              </h2>
              <span className="rounded-md border border-primary/30 bg-primary/15 px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-primary">
                {mockEcosystemStatsKpis.totalProjects} активных сервисов
              </span>
            </div>
            <p className="mt-1 text-xs text-fg-muted">
              Оперативная сводка инженерных метрик, динамика спринтов и состояние жизненного цикла проектов
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start text-xs sm:self-auto font-mono">
            <span className="flex items-center gap-1.5 rounded-lg border border-border bg-muted/60 px-3 py-1.5 text-foreground">
              <span className="h-2 w-2 rounded-full bg-ok animate-pulse" />
              <span>{mockEcosystemStatsKpis.onlineNow} разработчиков онлайн</span>
            </span>
            <span className="rounded-lg border border-border bg-muted/60 px-3 py-1.5 text-fg-muted">
              Релизов в 2026: <strong className="text-foreground">{mockEcosystemStatsKpis.releasesThisYear}</strong>
            </span>
          </div>
        </div>

        {/* 5 KPI Metric Cards */}
        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border/60 pt-4 sm:grid-cols-3 md:grid-cols-5">
          <div className="rounded-lg border border-border bg-muted/40 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-fg-muted">
              Запущено проектов
            </p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-mono text-xl font-bold tracking-tight text-ok sm:text-2xl">
                {mockEcosystemStatsKpis.productionCount}
              </span>
              <span className="text-[11px] text-fg-muted">боевых сервисов</span>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-muted/40 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-fg-muted">
              Бета & Разработка
            </p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-mono text-xl font-bold tracking-tight text-primary sm:text-2xl">
                {mockEcosystemStatsKpis.betaCount + mockEcosystemStatsKpis.developmentCount}
              </span>
              <span className="text-[11px] text-fg-muted">в работе</span>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-muted/40 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-fg-muted">
              Контрибьюторы
            </p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-mono text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                {mockEcosystemStatsKpis.totalContributors}
              </span>
              <span className="text-[11px] text-ok">участников</span>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-muted/40 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-fg-muted">
              Задач закрыто за месяц
            </p>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="font-mono text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                {mockEcosystemStatsKpis.tasksCompletedMonth}
              </span>
              <span className="inline-flex items-center gap-0.5 text-[11px] text-ok font-mono font-semibold">
                <TrendUpIcon className="w-3 h-3 text-ok" /> +24%
              </span>
            </div>
          </div>

          <div className="col-span-2 rounded-lg border border-border bg-muted/40 p-3 sm:col-span-1">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-fg-muted">
              Готовность согласно планам
            </p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-mono text-xl font-bold tracking-tight text-primary sm:text-2xl">
                {mockEcosystemStatsKpis.averageRoadmapProgress}%
              </span>
              <span className="text-[11px] text-fg-muted">средняя</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Balanced Observability Hub (8 cols primary charts + 4 cols lifecycle & stack) */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 items-stretch">
        {/* Left Column (8 cols): Single Unified Analytics Card */}
        <div className="flex flex-col justify-between rounded-xl border border-border bg-elevated/80 p-4 shadow-xs backdrop-blur-md transition-colors sm:p-5 lg:col-span-8">
          {/* Card Top Header with Tabs */}
          <div className="flex flex-col gap-3 border-b border-border/60 pb-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-fg-muted">
                  {analyticsTab === "velocity" && "Динамика разработки по спринтам"}
                  {analyticsTab === "weekly" && "Недельная Git-активность"}
                  {analyticsTab === "events" && "Оперативная лента событий"}
                </h3>
              </div>
              <p className="mt-0.5 text-xs text-foreground/80">
                {analyticsTab === "velocity" && "Выполненные задачи, активность коммитов и Story Points за 8 спринтов"}
                {analyticsTab === "weekly" && "Интенсивность коммитов и закрытых PR по дням недели"}
                {analyticsTab === "events" && "Релизы, пуши и изменения в реальном времени"}
              </p>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex w-full sm:w-auto items-center overflow-x-auto no-scrollbar">
              <div className="inline-flex w-full sm:w-auto justify-between rounded-lg border border-border bg-muted/60 p-0.5 text-xs">
                <button
                  type="button"
                  onClick={() => setAnalyticsTab("velocity")}
                  className={`flex-1 sm:flex-initial text-center rounded-md px-3 py-1 font-medium transition cursor-pointer active:scale-95 ${analyticsTab === "velocity"
                    ? "bg-primary text-[#042428] font-bold shadow-xs"
                    : "text-fg-muted hover:text-foreground"
                    }`}
                >
                  Спринты
                </button>
                <button
                  type="button"
                  onClick={() => setAnalyticsTab("weekly")}
                  className={`flex-1 sm:flex-initial text-center rounded-md px-3 py-1 font-medium transition cursor-pointer active:scale-95 ${analyticsTab === "weekly"
                    ? "bg-primary text-[#042428] font-bold shadow-xs"
                    : "text-fg-muted hover:text-foreground"
                    }`}
                >
                  Неделя
                </button>
                <button
                  type="button"
                  onClick={() => setAnalyticsTab("events")}
                  className={`flex-1 sm:flex-initial text-center rounded-md px-3 py-1 font-medium transition cursor-pointer active:scale-95 ${analyticsTab === "events"
                    ? "bg-primary text-[#042428] font-bold shadow-xs"
                    : "text-fg-muted hover:text-foreground"
                    }`}
                >
                  События ({mockEngineeringEvents.length})
                </button>
              </div>
            </div>
          </div>

          {/* Active View (filling remaining height) */}
          <div className="flex-1 flex flex-col justify-between pt-2">
            {analyticsTab === "velocity" && <SprintVelocityChart embedded />}

            {analyticsTab === "weekly" && <WeeklyCommitsBarChart embedded />}

            {analyticsTab === "events" && (
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 flex-1 pt-2">
                {mockEngineeringEvents.map((event) => (
                  <div
                    key={event.id}
                    className="rounded-lg border border-border/60 bg-muted/40 p-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1.5">
                        <span className="font-brand font-bold text-xs text-foreground">
                          {event.project}
                        </span>
                        <span
                          className={`rounded border px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider ${event.badgeTone}`}
                        >
                          {event.badge}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-foreground/80 leading-snug">
                        {event.text}
                      </p>
                    </div>
                    <div className="mt-2.5 flex items-center justify-between text-[10px] text-fg-muted font-mono border-t border-border/40 pt-1.5">
                      <span>Автор: {event.author}</span>
                      <span>{event.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column (4 cols): Project Lifecycle Donut + Stack Landscape */}
        <div className="flex flex-col gap-4 lg:col-span-4">
          {/* Project Lifecycle Donut with interactive phase filter */}
          <ProjectLifecycleDonut
            activePhase={phaseFilter}
            onSelectPhase={(p) => setPhaseFilter(p)}
          />

          {/* Tech Stack Distribution */}
          <div className="rounded-xl border border-border bg-elevated/80 p-4 shadow-xs backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-border/60 pb-2.5">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-fg-muted">
                  Технологический стек
                </h3>
                <p className="mt-0.5 text-xs text-foreground/80">
                  Доля технологий в экосистеме
                </p>
              </div>
              <span className="text-[11px] font-mono text-fg-muted">18 репозиториев</span>
            </div>

            <div className="mt-3.5 space-y-2.5">
              {mockTechStackDistribution.map((tech) => (
                <div key={tech.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-foreground">{tech.name}</span>
                    <span className="font-mono text-fg-muted text-[11px]">
                      {tech.projectsCount} проектов ({tech.sharePercent}%)
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full ${tech.tone}`}
                      style={{ width: `${tech.sharePercent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Interactive Filters, Search & View Switcher */}
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-elevated/70 p-3.5 shadow-xs backdrop-blur-md sm:p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Search Input with SVG Search Icon */}
          <div className="relative w-full min-w-0 sm:max-w-md sm:flex-1">
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted">
              <SearchIcon className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по названию, стеку, техлиду…"
              className="w-full rounded-lg border border-border bg-muted/60 pl-9 pr-8 py-2 text-sm text-foreground placeholder:text-fg-muted focus:border-primary focus:bg-elevated focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-fg-muted hover:text-foreground cursor-pointer"
                title="Очистить поиск"
              >
                <CloseIcon className="w-3.5 h-3.5" />
              </button>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Toggle: Grid vs Table */}
            <div className="inline-flex rounded-lg border border-border bg-muted/50 p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition cursor-pointer ${viewMode === "grid"
                  ? "bg-primary text-[#042428] font-bold shadow-xs"
                  : "text-fg-muted hover:text-foreground"
                  }`}
                title="Сетка карточек"
              >
                <GridIcon className="w-3.5 h-3.5" />
                <span>Карточки</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition cursor-pointer ${viewMode === "table"
                  ? "bg-primary text-[#042428] font-bold shadow-xs"
                  : "text-fg-muted hover:text-foreground"
                  }`}
                title="Табличный вид"
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>Таблица</span>
              </button>
            </div>

            {/* Sort Control */}
            <div className="inline-flex rounded-lg border border-border bg-muted/50 p-0.5 text-xs">
              {[
                { id: "progress", label: "Прогресс" },
                { id: "tasks", label: "Задачи" },
                { id: "commits", label: "Коммиты" },
                { id: "team", label: "Команда" },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSortBy(s.id as any)}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition cursor-pointer active:scale-95 ${sortBy === s.id
                    ? "bg-primary text-[#042428] font-bold shadow-xs"
                    : "text-fg-muted hover:text-foreground"
                    }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Phase Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 border-t border-border/60 pt-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-fg-muted mr-1">
            Фаза:
          </span>
          {[
            { id: "all", label: "Все" },
            { id: "production", label: "Production" },
            { id: "beta", label: "Beta" },
            { id: "development", label: "Development" },
            { id: "mvp", label: "MVP" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setPhaseFilter(item.id as any)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition cursor-pointer active:scale-95 ${phaseFilter === item.id
                ? "border border-primary bg-primary/20 text-foreground font-semibold shadow-xs"
                : "border border-border bg-muted/40 text-fg-muted hover:text-foreground hover:border-border-strong"
                }`}
            >
              {item.label}
            </button>
          ))}

          {/* Categories */}
          <span className="hidden sm:inline text-border">|</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-fg-muted mr-1">
            Категория:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition cursor-pointer active:scale-95 ${categoryFilter === cat
                ? "border border-primary bg-primary/20 text-foreground font-semibold shadow-xs"
                : "border border-border bg-muted/40 text-fg-muted hover:text-foreground hover:border-border-strong"
                }`}
            >
              {cat === "all" ? "Все категории" : cat}
            </button>
          ))}

          <span className="ml-auto font-mono text-xs text-fg-muted">
            Найдено: <strong className="text-foreground">{filteredProjects.length}</strong>
          </span>
        </div>
      </div>

      {/* 5. Projects Listing: Grid or Table Matrix */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => {
            const taskPercent = Math.round(
              (project.sprintTasks.completed / (project.sprintTasks.total || 1)) * 100,
            );

            const phaseColor =
              project.phase === "production"
                ? "border-ok/30 bg-ok/15 text-ok"
                : project.phase === "beta"
                  ? "border-primary/30 bg-primary/15 text-primary"
                  : project.phase === "development"
                    ? "border-blue/30 bg-blue/15 text-blue"
                    : "border-warn/30 bg-warn/15 text-warn";

            return (
              <div
                key={project.id}
                className="flex flex-col justify-between rounded-xl border border-border bg-elevated/80 p-4 shadow-xs backdrop-blur-md transition-all hover:border-primary/50 hover:shadow-md"
              >
                {/* Header */}
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-muted px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-fg-muted">
                          {project.category}
                        </span>
                        <span className="font-mono text-[10px] text-fg-muted">
                          {project.version}
                        </span>
                      </div>
                      <h3 className="font-brand mt-1 text-base font-bold text-foreground">
                        {project.name}
                      </h3>
                    </div>

                    <span
                      className={`shrink-0 rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${phaseColor}`}
                    >
                      {project.phaseLabel}
                    </span>
                  </div>

                  <p className="mt-2 line-clamp-2 text-xs text-fg-muted leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Roadmap Progress Bar */}
                  <div className="mt-4 rounded-lg border border-border/60 bg-muted/30 p-2.5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-foreground">Прогресс дорожной карты</span>
                      <span className="font-mono text-primary font-bold">
                        {project.roadmapProgress}%
                      </span>
                    </div>
                    <div className="mt-1.5 h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-500"
                        style={{ width: `${project.roadmapProgress}%` }}
                      />
                    </div>
                    <div className="mt-2 flex items-center gap-1.5 truncate text-[11px] text-fg-muted">
                      <TargetIcon className="w-3 h-3 text-primary shrink-0" />
                      <span className="truncate">
                        <strong className="text-foreground/90">Цель:</strong> {project.currentMilestone}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[10px] text-fg-muted font-mono">
                      Срок: {project.milestoneDeadline}
                    </p>
                  </div>

                  {/* Sprint & Velocity Metrics Grid */}
                  <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-lg border border-border/50 bg-muted/40 p-2">
                      <p className="text-[9px] uppercase tracking-wider text-fg-muted">
                        Спринт таски
                      </p>
                      <p className="font-mono mt-0.5 text-xs font-bold text-foreground">
                        {project.sprintTasks.completed}/{project.sprintTasks.total}
                      </p>
                      <p className="text-[9px] text-ok font-semibold">{taskPercent}%</p>
                    </div>

                    <div className="rounded-lg border border-border/50 bg-muted/40 p-2">
                      <p className="text-[9px] uppercase tracking-wider text-fg-muted">
                        Коммиты / мес
                      </p>
                      <p className="font-mono mt-0.5 text-xs font-bold text-foreground">
                        {project.metrics.commitsMonthly}
                      </p>
                      <p className="text-[9px] text-primary font-semibold">
                        +{project.metrics.pullRequestsClosed} PRs
                      </p>
                    </div>

                    <div className="rounded-lg border border-border/50 bg-muted/40 p-2">
                      <p className="text-[9px] uppercase tracking-wider text-fg-muted">
                        Velocity
                      </p>
                      <p className="font-mono mt-0.5 text-xs font-bold text-foreground">
                        {project.metrics.velocityStoryPoints}
                      </p>
                      <p className="text-[9px] text-fg-muted font-mono">pts/спринт</p>
                    </div>
                  </div>
                </div>

                {/* Footer: Team & Stack Badges */}
                <div className="mt-4 border-t border-border/60 pt-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-fg-muted truncate max-w-[170px]">
                      Руководитель: <strong className="text-foreground">{project.lead.name}</strong>
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[11px] text-fg-muted shrink-0">
                      <UsersIcon className="w-3.5 h-3.5 text-primary" />
                      <span>{project.teamSize} уч.</span>
                    </span>
                  </div>

                  <div className="mt-2.5 flex flex-wrap gap-1">
                    {project.stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded bg-muted/80 px-1.5 py-0.5 font-mono text-[9px] text-fg-muted border border-border/40"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 4 ? (
                      <span className="rounded bg-muted/80 px-1.5 py-0.5 font-mono text-[9px] text-fg-muted">
                        +{project.stack.length - 4}
                      </span>
                    ) : null}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="mt-3 w-full rounded-lg border border-border bg-muted/60 py-1.5 text-xs font-medium text-foreground hover:border-primary hover:text-primary transition cursor-pointer active:scale-98"
                  >
                    Подробная аналитика проекта
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Matrix Table View */
        <div className="overflow-x-auto rounded-xl border border-border bg-elevated/80 shadow-xs backdrop-blur-md">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border bg-muted/50 text-[10px] font-bold uppercase tracking-wider text-fg-muted">
              <tr>
                <th className="px-4 py-3">Проект</th>
                <th className="px-3 py-3">Фаза</th>
                <th className="px-3 py-3">Руководитель</th>
                <th className="px-3 py-3">Задачи спринта</th>
                <th className="px-3 py-3">Дорожная карта</th>
                <th className="px-3 py-3">Активность в Git</th>
                <th className="px-3 py-3">Команда</th>
                <th className="px-3 py-3 text-right">Действие</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filteredProjects.map((project) => {
                const taskPercent = Math.round(
                  (project.sprintTasks.completed / (project.sprintTasks.total || 1)) * 100,
                );

                const phaseColor =
                  project.phase === "production"
                    ? "border-ok/30 bg-ok/15 text-ok"
                    : project.phase === "beta"
                      ? "border-primary/30 bg-primary/15 text-primary"
                      : project.phase === "development"
                        ? "border-blue/30 bg-blue/15 text-blue"
                        : "border-warn/30 bg-warn/15 text-warn";

                return (
                  <tr
                    key={project.id}
                    className="transition hover:bg-muted/30"
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-brand font-bold text-foreground">
                          {project.name}
                        </p>
                        <p className="text-[10px] text-fg-muted font-mono">
                          {project.category} · {project.version}
                        </p>
                      </div>
                    </td>

                    <td className="px-3 py-3 whitespace-nowrap">
                      <span
                        className={`rounded border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${phaseColor}`}
                      >
                        {project.phaseLabel}
                      </span>
                    </td>

                    <td className="px-3 py-3 whitespace-nowrap text-fg-muted">
                      <p className="font-medium text-foreground">{project.lead.name}</p>
                      <p className="text-[10px]">{project.lead.role}</p>
                    </td>

                    <td className="px-3 py-3 whitespace-nowrap">
                      <div className="w-28 space-y-1">
                        <div className="flex justify-between font-mono text-[10px]">
                          <span>{project.sprintTasks.completed}/{project.sprintTasks.total}</span>
                          <span className="text-ok font-bold">{taskPercent}%</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full bg-ok"
                            style={{ width: `${taskPercent}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="px-3 py-3 whitespace-nowrap">
                      <div className="w-28 space-y-1">
                        <div className="flex justify-between font-mono text-[10px]">
                          <span>Готовность</span>
                          <span className="text-primary font-bold">{project.roadmapProgress}%</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${project.roadmapProgress}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="px-3 py-3 whitespace-nowrap font-mono text-[11px]">
                      <p className="text-foreground font-semibold">
                        {project.metrics.commitsMonthly} коммитов/мес
                      </p>
                      <p className="text-fg-muted text-[10px]">
                        +{project.metrics.pullRequestsClosed} PRs · {project.metrics.velocityStoryPoints} pts
                      </p>
                    </td>

                    <td className="px-3 py-3 whitespace-nowrap font-mono text-fg-muted">
                      <span className="flex items-center gap-1">
                        <UsersIcon className="w-3 h-3 text-primary" />
                        <span>{project.teamSize} уч.</span>
                      </span>
                    </td>

                    <td className="px-3 py-3 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="rounded-md border border-border bg-muted/60 px-2.5 py-1 text-xs font-medium text-foreground hover:border-primary hover:text-primary transition cursor-pointer"
                      >
                        Анализ
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* 6. Detailed Project Inspector Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-5 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative flex max-h-[90vh] w-full max-w-2xl flex-col rounded-2xl border border-border bg-elevated text-foreground shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border bg-muted/40 px-5 py-4">
              <div>
                <span className="rounded bg-muted px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-fg-muted">
                  {selectedProject.category} · {selectedProject.version}
                </span>
                <h3 className="font-brand mt-1 text-lg font-bold text-foreground">
                  {selectedProject.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-muted/60 text-fg-muted hover:text-foreground cursor-pointer"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs sm:text-sm">
              <p className="text-fg-muted leading-relaxed">
                {selectedProject.summary}
              </p>

              {/* Roadmap Milestone */}
              <div className="rounded-xl border border-border bg-muted/30 p-3.5 space-y-2">
                <div className="flex items-center justify-between font-bold">
                  <span className="flex items-center gap-1.5">
                    <TargetIcon className="w-3.5 h-3.5 text-primary" />
                    Текущая веха (Milestone)
                  </span>
                  <span className="font-mono text-primary">
                    {selectedProject.roadmapProgress}% выполнено
                  </span>
                </div>
                <p className="text-xs text-foreground/90 font-medium">
                  {selectedProject.currentMilestone}
                </p>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${selectedProject.roadmapProgress}%` }}
                  />
                </div>
                <p className="text-[11px] text-fg-muted font-mono">
                  Дедлайн спринта: {selectedProject.milestoneDeadline}
                </p>
              </div>

              {/* Engineering Quality Metrics */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-lg border border-border bg-muted/40 p-2.5 text-center">
                  <p className="text-[9px] uppercase tracking-wider text-fg-muted">
                    Качество кода
                  </p>
                  <p className="font-mono mt-1 text-base font-bold text-ok">
                    {selectedProject.metrics.codeQualityScore}/100
                  </p>
                  <p className="text-[9px] text-fg-muted">Sonar & Linter</p>
                </div>

                <div className="rounded-lg border border-border bg-muted/40 p-2.5 text-center">
                  <p className="text-[9px] uppercase tracking-wider text-fg-muted">
                    Покрытие тестами
                  </p>
                  <p className="font-mono mt-1 text-base font-bold text-primary">
                    {selectedProject.metrics.testCoveragePercent}%
                  </p>
                  <p className="text-[9px] text-fg-muted">Unit & E2E</p>
                </div>

                <div className="rounded-lg border border-border bg-muted/40 p-2.5 text-center">
                  <p className="text-[9px] uppercase tracking-wider text-fg-muted">
                    Коммитов в месяц
                  </p>
                  <p className="font-mono mt-1 text-base font-bold text-foreground">
                    {selectedProject.metrics.commitsMonthly}
                  </p>
                  <p className="text-[9px] text-fg-muted">активность Git</p>
                </div>

                <div className="rounded-lg border border-border bg-muted/40 p-2.5 text-center">
                  <p className="text-[9px] uppercase tracking-wider text-fg-muted">
                    Аудитория (DAU)
                  </p>
                  <p className="font-mono mt-1 text-base font-bold text-foreground">
                    {selectedProject.activeUsersDau.toLocaleString("ru-RU")}
                  </p>
                  <p className="text-[9px] text-fg-muted">пользователей/день</p>
                </div>
              </div>

              {/* Lead and Team */}
              <div className="rounded-xl border border-border bg-muted/30 p-3.5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-fg-muted font-bold">
                    Техлид проекта
                  </p>
                  <p className="font-bold text-foreground mt-0.5">{selectedProject.lead.name}</p>
                  <p className="text-[11px] text-fg-muted">{selectedProject.lead.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-wider text-fg-muted font-bold">
                    Команда
                  </p>
                  <p className="font-mono font-bold text-primary mt-0.5">
                    {selectedProject.teamSize} разработчиков
                  </p>
                </div>
              </div>

              {/* Full Stack Badges */}
              <div>
                <p className="text-xs font-semibold text-fg-muted mb-2">
                  Используемые технологии и библиотеки:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-border bg-muted px-2.5 py-1 font-mono text-xs text-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
