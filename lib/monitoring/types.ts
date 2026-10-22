export type ProjectPriority =
  | "P0 - Критический"
  | "P1 - Высокий"
  | "P2 - Средний"
  | "P3 - Низкий";

export type ProjectUptimeStatus =
  | "operational"
  | "degraded"
  | "outage"
  | "maintenance";

export type UptimePeriod = "24h" | "7d" | "30d" | "90d";

export interface TeamMember {
  name: string;
  role: string;
  avatar?: string;
  telegram?: string;
  github?: string;
}

export interface ApiCodeDistribution {
  code2xx: number;
  code3xx: number;
  code4xx: number;
  code5xx: number;
}

export interface Incident {
  id: string;
  title: string;
  startedAt: string;
  resolvedAt?: string;
  durationMinutes: number;
  severity: "critical" | "warning" | "minor";
  rootCause: string;
  status: "resolved" | "investigating" | "mitigated";
}

export interface DailyUptimePoint {
  date: string;
  uptime: number;
  status: "up" | "degraded" | "down";
}

export interface UptimeStats {
  current: number;
  last24h: number;
  last7d: number;
  last30d: number;
  last90d: number;
  historyDaily: DailyUptimePoint[];
}

export interface PerformanceMetrics {
  responseTimeAvg: number;
  responseTimeP95: number;
  responseTimeP99: number;
  rps: number;
  throughput: string;
  bandwidthMbps: number;
}

export interface HardwareMetrics {
  cpuUsagePercent: number;
  cpuCores: number;
  cpuHistory: number[];
  memoryUsedGb: number;
  memoryTotalGb: number;
  memoryPercent: number;
  diskFreeGb: number;
  diskTotalGb: number;
  diskUsedPercent: number;
  diskReadMbS: number;
  diskWriteMbS: number;
  diskIops: number;
  diskLatencyMs: number;
  networkInMbps: number;
  networkOutMbps: number;
  packetLossPercent: number;
  activeTcpConnections: number;
}

export interface UserTrafficMetrics {
  realtimeActiveUsers: number;
  todayVisits: number;
  todayUniqueUsers: number;
  weeklyVisits: number;
  trendPercent: number;
  hourlyHistory: { hour: string; active: number }[];
}

export interface ProjectMonitoringData {
  id: string;
  name: string;
  description: string;
  lead: TeamMember;
  team: TeamMember[];
  priority: ProjectPriority;
  tags: string[];
  lastUpdated: string;
  lastUpdatedIso: string;
  status: ProjectUptimeStatus;
  uptime: UptimeStats;
  apiCodes: ApiCodeDistribution;
  lastSuccessCheck: string;
  lastSuccessCheckSecondsAgo: number;
  outages: {
    incidentsCount30d: number;
    totalDowntimeMinutes30d: number;
    mttrMinutes: number;
    recentIncidents: Incident[];
  };
  performance: PerformanceMetrics;
  hardware: HardwareMetrics;
  users: UserTrafficMetrics;
  serviceUrl?: string;
  repoUrl?: string;
  healthEndpoint?: string;
}

export const statusLabelMap: Record<ProjectUptimeStatus, string> = {
  operational: "Работает штатно",
  degraded: "Деградация",
  outage: "Сбой",
  maintenance: "Обслуживание",
};

export const priorityColorMap: Record<ProjectPriority, { bg: string; text: string; border: string }> = {
  "P0 - Критический": {
    bg: "rgba(239, 68, 68, 0.15)",
    text: "#ef4444",
    border: "rgba(239, 68, 68, 0.35)",
  },
  "P1 - Высокий": {
    bg: "rgba(245, 158, 11, 0.15)",
    text: "#f59e0b",
    border: "rgba(245, 158, 11, 0.35)",
  },
  "P2 - Средний": {
    bg: "rgba(0, 203, 217, 0.15)",
    text: "#00cbd9",
    border: "rgba(0, 203, 217, 0.35)",
  },
  "P3 - Низкий": {
    bg: "rgba(100, 116, 139, 0.15)",
    text: "#94a3b8",
    border: "rgba(100, 116, 139, 0.35)",
  },
};
