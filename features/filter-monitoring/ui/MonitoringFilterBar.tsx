"use client";

import type {
  ProjectPriority,
  ProjectUptimeStatus,
  UptimePeriod,
} from "@/entities/project";

type MonitoringFilterBarProps = {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  statusFilter: ProjectUptimeStatus | "all";
  onStatusChange: (status: ProjectUptimeStatus | "all") => void;
  priorityFilter: ProjectPriority | "all";
  onPriorityChange: (p: ProjectPriority | "all") => void;
  selectedPeriod: UptimePeriod;
  onPeriodChange: (period: UptimePeriod) => void;
  viewMode: "grid" | "table";
  onViewModeChange: (mode: "grid" | "table") => void;
  totalFiltered: number;
};

const statuses: {
  id: ProjectUptimeStatus | "all";
  label: string;
  dotColor?: string;
}[] = [
  { id: "all", label: "Все статусы" },
  { id: "operational", label: "В строю", dotColor: "bg-ok" },
  { id: "degraded", label: "Деградация", dotColor: "bg-warn" },
  { id: "maintenance", label: "Обслуживание", dotColor: "bg-fg-muted" },
];

const priorities: { id: ProjectPriority | "all"; label: string }[] = [
  { id: "all", label: "Все приоритеты" },
  { id: "P0 - Критический", label: "P0 Критический" },
  { id: "P1 - Высокий", label: "P1 Высокий" },
  { id: "P2 - Средний", label: "P2 Средний" },
  { id: "P3 - Низкий", label: "P3 Низкий" },
];

const periods: { id: UptimePeriod; label: string }[] = [
  { id: "24h", label: "24 часа" },
  { id: "7d", label: "7 дней" },
  { id: "30d", label: "30 дней" },
  { id: "90d", label: "90 дней" },
];

export function MonitoringFilterBar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  selectedPeriod,
  onPeriodChange,
  viewMode,
  onViewModeChange,
  totalFiltered,
}: MonitoringFilterBarProps) {
  return (
    <div className="flex flex-col gap-3.5 rounded-xl border border-border bg-elevated/70 p-3.5 shadow-xs backdrop-blur-md transition-colors sm:p-4">
      {/* Top line: Search input + Period Switcher + View switcher + Count */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full min-w-0 sm:max-w-md sm:flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Поиск по названию, стеку, руководителю…"
            className="w-full rounded-lg border border-border bg-muted/60 px-3.5 py-2 text-sm text-foreground placeholder:text-fg-muted focus:border-primary focus:bg-elevated focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-fg-muted hover:text-foreground cursor-pointer"
              title="Очистить"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          ) : null}
        </div>

        {/* Period Selector & View Mode */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Uptime Period Switcher */}
          <div className="flex items-center rounded-lg border border-border bg-muted/50 p-0.5">
            <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-fg-muted">
              Период:
            </span>
            {periods.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => onPeriodChange(p.id)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition cursor-pointer active:scale-95 ${
                  selectedPeriod === p.id
                    ? "bg-primary text-[#042428] font-bold shadow-xs"
                    : "text-fg-muted hover:text-foreground hover:bg-elevated"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Grid vs Table View */}
          <div className="flex items-center rounded-lg border border-border bg-muted/50 p-0.5">
            <button
              type="button"
              onClick={() => onViewModeChange("grid")}
              title="Вид: Сетка карточек"
              className={`rounded-md px-3 py-1 text-xs font-medium transition cursor-pointer active:scale-95 ${
                viewMode === "grid"
                  ? "bg-primary text-[#042428] font-bold shadow-xs"
                  : "text-fg-muted hover:text-foreground hover:bg-elevated"
              }`}
            >
              Карточки
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange("table")}
              title="Вид: Таблица телеметрии"
              className={`rounded-md px-3 py-1 text-xs font-medium transition cursor-pointer active:scale-95 ${
                viewMode === "table"
                  ? "bg-primary text-[#042428] font-bold shadow-xs"
                  : "text-fg-muted hover:text-foreground hover:bg-elevated"
              }`}
            >
              Таблица
            </button>
          </div>

          <span className="text-xs text-fg-muted font-mono">
            Найдено: <strong className="text-foreground">{totalFiltered}</strong>
          </span>
        </div>
      </div>

      {/* Filter Badges: Status & Priority */}
      <div className="flex flex-wrap items-center gap-2 border-t border-border/60 pt-3">
        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-fg-muted mr-1">
            Статус:
          </span>
          {statuses.map((st) => (
            <button
              key={st.id}
              type="button"
              onClick={() => onStatusChange(st.id)}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition cursor-pointer active:scale-95 ${
                statusFilter === st.id
                  ? "border border-primary bg-primary/20 text-foreground font-semibold shadow-xs"
                  : "border border-border bg-muted/40 text-fg-muted hover:text-foreground hover:border-border-strong hover:bg-elevated"
              }`}
            >
              {st.dotColor && (
                <span className={`inline-block h-2 w-2 rounded-full ${st.dotColor}`} />
              )}
              {st.label}
            </button>
          ))}
        </div>

        <span className="hidden sm:inline text-border">|</span>

        {/* Priority Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-fg-muted mr-1">
            Приоритет:
          </span>
          {priorities.map((pr) => (
            <button
              key={pr.id}
              type="button"
              onClick={() => onPriorityChange(pr.id)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition cursor-pointer active:scale-95 ${
                priorityFilter === pr.id
                  ? "border border-primary bg-primary/20 text-foreground font-semibold shadow-xs"
                  : "border border-border bg-muted/40 text-fg-muted hover:text-foreground hover:border-border-strong hover:bg-elevated"
              }`}
            >
              {pr.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
