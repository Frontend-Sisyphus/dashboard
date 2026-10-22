"use client";

import { useEffect, useMemo, useState } from "react";
import { useCrmOverview } from "@/entities/crm";
import { initialProjectsMonitoring, simulateTelemetryTick } from "./data";
import type {
  ProjectMonitoringData,
  ProjectPriority,
  ProjectUptimeStatus,
  UptimePeriod,
} from "./types";

export function useProjectsMonitoring() {
  const crm = useCrmOverview();
  const [projects, setProjects] = useState<ProjectMonitoringData[]>(
    initialProjectsMonitoring,
  );
  const [isLiveEnabled, setIsLiveEnabled] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProjectUptimeStatus | "all">(
    "all",
  );
  const [priorityFilter, setPriorityFilter] = useState<
    ProjectPriority | "all"
  >("all");
  const [selectedPeriod, setSelectedPeriod] = useState<UptimePeriod>("30d");
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Periodically simulate live telemetry fluctuations if enabled
  useEffect(() => {
    if (!isLiveEnabled) return;

    const interval = setInterval(() => {
      setProjects((prev) => simulateTelemetryTick(prev));
    }, 3800);

    return () => clearInterval(interval);
  }, [isLiveEnabled]);

  // Aggregate Cluster Metrics
  const clusterKpis = useMemo(() => {
    const total = projects.length;
    const totalUsers = projects.reduce(
      (sum, p) => sum + p.users.realtimeActiveUsers,
      0,
    );
    const totalRps = +projects
      .reduce((sum, p) => sum + p.performance.rps, 0)
      .toFixed(1);
    const avgLatency = Math.round(
      projects.reduce((sum, p) => sum + p.performance.responseTimeAvg, 0) /
        (total || 1),
    );
    const avgUptime = +(
      projects.reduce((sum, p) => sum + p.uptime.current, 0) / (total || 1)
    ).toFixed(2);
    const degradedCount = projects.filter(
      (p) => p.status === "degraded" || p.status === "outage",
    ).length;
    const operationalCount = projects.filter(
      (p) => p.status === "operational",
    ).length;

    return {
      total,
      totalUsers,
      totalRps,
      avgLatency,
      avgUptime,
      degradedCount,
      operationalCount,
    };
  }, [projects]);

  // Filtered and sorted projects
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      if (priorityFilter !== "all" && p.priority !== priorityFilter)
        return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const matchName = p.name.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchLead = p.lead.name.toLowerCase().includes(q);
      const matchTags = p.tags.some((t) => t.toLowerCase().includes(q));

      return matchName || matchDesc || matchLead || matchTags;
    });
  }, [projects, statusFilter, priorityFilter, searchQuery]);

  const activeProject = useMemo(() => {
    if (!activeProjectId) return null;
    return projects.find((p) => p.id === activeProjectId) ?? null;
  }, [projects, activeProjectId]);

  const triggerManualRefresh = () => {
    setProjects((prev) => simulateTelemetryTick(prev));
  };

  return {
    projects,
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
    activeProjectId,
    setActiveProjectId,
    viewMode,
    setViewMode,
    isLiveEnabled,
    setIsLiveEnabled,
    triggerManualRefresh,
    crmStatus: crm.status,
  };
}
