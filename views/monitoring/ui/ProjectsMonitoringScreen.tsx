"use client";

import {
  useProjectsMonitoring,
  ProjectMonitorCard,
  ProjectMonitorTable,
} from "@/entities/project";
import { MonitoringFilterBar } from "@/features/filter-monitoring";
import { ClusterKpiBar } from "@/widgets/cluster-kpi-bar";
import { ProjectInspectorModal } from "@/widgets/project-inspector";

export function ProjectsMonitoringScreen() {
  const {
    filteredProjects,
    clusterKpis,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    selectedPeriod,
    setSelectedPeriod,
    activeProject,
    setActiveProjectId,
    viewMode,
    setViewMode,
    isLiveEnabled,
    setIsLiveEnabled,
    triggerManualRefresh,
  } = useProjectsMonitoring();

  return (
    <div className="flex flex-1 flex-col gap-5 sm:gap-6">
      {/* 1. Global Cluster Health Bar */}
      <ClusterKpiBar
        kpis={clusterKpis}
        isLiveEnabled={isLiveEnabled}
        onToggleLive={() => setIsLiveEnabled(!isLiveEnabled)}
        onManualRefresh={triggerManualRefresh}
      />

      {/* 2. Filters & View Controls */}
      <MonitoringFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        priorityFilter={priorityFilter}
        onPriorityChange={setPriorityFilter}
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalFiltered={filteredProjects.length}
      />

      {/* 3. Main Project Telemetry View (Grid or Table) */}
      {filteredProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center border border-dashed border-border bg-elevated/20 p-12 text-center">
          <p className="text-base font-semibold text-foreground">
            Проектов по заданным критериям не найдено
          </p>
          <p className="mt-1 text-xs text-fg-muted">
            Попробуйте сбросить поисковый запрос или фильтры по статусу и
            приоритету.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setStatusFilter("all");
              setPriorityFilter("all");
            }}
            className="mt-4 border border-border bg-muted/60 px-4 py-1.5 text-xs font-medium text-foreground hover:border-primary/50"
          >
            Сбросить фильтры
          </button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProjects.map((project) => (
            <ProjectMonitorCard
              key={project.id}
              project={project}
              period={selectedPeriod}
              onSelect={(p) => setActiveProjectId(p.id)}
            />
          ))}
        </div>
      ) : (
        <ProjectMonitorTable
          projects={filteredProjects}
          period={selectedPeriod}
          onSelect={(p) => setActiveProjectId(p.id)}
        />
      )}

      {/* 4. Deep-dive Inspector Modal */}
      {activeProject ? (
        <ProjectInspectorModal
          project={activeProject}
          onClose={() => setActiveProjectId(null)}
        />
      ) : null}
    </div>
  );
}
