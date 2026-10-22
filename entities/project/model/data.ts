import type {
  DailyUptimePoint,
  ProjectMonitoringData,
  ProjectUptimeStatus,
} from "./types";

function generateDailyHistory(
  days: number,
  baseUptime: number,
  hasRecentIncident = false,
): DailyUptimePoint[] {
  const points: DailyUptimePoint[] = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0]!;

    let uptime = 100;
    let status: "up" | "degraded" | "down" = "up";

    // Occasional minor degradation or hiccup
    if (hasRecentIncident && i === 2) {
      uptime = 96.4;
      status = "degraded";
    } else if (hasRecentIncident && i === 18) {
      uptime = 98.1;
      status = "degraded";
    } else if (Math.random() < 0.03 && baseUptime < 99.9) {
      uptime = +(98.5 + Math.random() * 1.4).toFixed(2);
      status = "degraded";
    } else {
      uptime = 100;
      status = "up";
    }

    points.push({ date: dateStr, uptime, status });
  }

  return points;
}

export const initialProjectsMonitoring: ProjectMonitoringData[] = [
  {
    id: "fin-helper",
    name: "ФИН Помощник",
    description:
      "Флагманский сервис цифрового университета: актуальное расписание пар, уведомления об изменениях преподавателей, навигация по корпусам для 45,000+ студентов и сотрудников.",
    lead: {
      name: "Михаил Волков",
      role: "Руководитель проекта / Tech Lead",
      telegram: "@m_volkov_fa",
      github: "https://github.com/itc-fa/fin-helper",
    },
    team: [
      { name: "Анна Соколова", role: "Backend Lead (.NET / Fastify)", telegram: "@sokolova_a" },
      { name: "Денис Иванов", role: "DevOps & SRE", telegram: "@den_ops" },
      { name: "Екатерина Морозова", role: "Frontend Developer (Next.js)", telegram: "@morozova_k" },
      { name: "Дмитрий Власов", role: "QA Automation", telegram: "@vlasov_qa" },
    ],
    priority: "P0 - Критический",
    tags: ["Next.js 16", "TypeScript", "Fastify", "Redis", "PostgreSQL", "Docker", "Nginx"],
    lastUpdated: "18 октября 2026, 12:44 (v2.8.4)",
    lastUpdatedIso: "2026-10-18T12:44:00Z",
    status: "operational",
    uptime: {
      current: 99.98,
      last24h: 100.0,
      last7d: 99.96,
      last30d: 99.92,
      last90d: 99.88,
      historyDaily: generateDailyHistory(90, 99.98, false),
    },
    apiCodes: {
      code2xx: 98.84,
      code3xx: 0.72,
      code4xx: 0.38,
      code5xx: 0.06,
    },
    lastSuccessCheck: "18.10.2026 14:08:42",
    lastSuccessCheckSecondsAgo: 8,
    outages: {
      incidentsCount30d: 1,
      totalDowntimeMinutes30d: 12,
      mttrMinutes: 12,
      recentIncidents: [
        {
          id: "inc-101",
          title: "Задержка синхронизации API расписания деканата",
          startedAt: "2026-10-02 08:15",
          resolvedAt: "2026-10-02 08:27",
          durationMinutes: 12,
          severity: "warning",
          rootCause: "Таймаут внешнего шлюза деканата при пиковой утренней нагрузке",
          status: "resolved",
        },
      ],
    },
    performance: {
      responseTimeAvg: 48,
      responseTimeP95: 112,
      responseTimeP99: 195,
      rps: 54.2,
      throughput: "24.6 MB/s",
      bandwidthMbps: 196.8,
    },
    hardware: {
      cpuUsagePercent: 26.4,
      cpuCores: 8,
      cpuHistory: [22, 24, 28, 25, 23, 29, 31, 26, 25, 24, 27, 26],
      memoryUsedGb: 4.8,
      memoryTotalGb: 16.0,
      memoryPercent: 30.0,
      diskFreeGb: 184.5,
      diskTotalGb: 256.0,
      diskUsedPercent: 27.9,
      diskReadMbS: 6.4,
      diskWriteMbS: 18.2,
      diskIops: 420,
      diskLatencyMs: 1.2,
      networkInMbps: 68.4,
      networkOutMbps: 128.4,
      packetLossPercent: 0.0,
      activeTcpConnections: 540,
    },
    users: {
      realtimeActiveUsers: 486,
      todayVisits: 18450,
      todayUniqueUsers: 9320,
      weeklyVisits: 112400,
      trendPercent: 12.5,
      hourlyHistory: [
        { hour: "08:00", active: 210 },
        { hour: "10:00", active: 580 },
        { hour: "12:00", active: 620 },
        { hour: "14:00", active: 486 },
      ],
    },
    serviceUrl: "https://www.fa.ru/for-students/schedule/",
    repoUrl: "https://github.com/itc-fa/fin-helper",
    healthEndpoint: "https://api.fin-helper.fa.ru/healthz",
  },
  {
    id: "helper-bot",
    name: "Помощник по расписанию (Telegram Bot)",
    description:
      "Отказоустойчивый Telegram-бот мгновенного уведомления о парах, аудиториях и дедлайнах с персональными подписками на группы и преподавателей.",
    lead: {
      name: "Александр Зайцев",
      role: "Team Lead Telegram Bots",
      telegram: "@zaytsev_tg",
      github: "https://github.com/itc-fa/schedule-bot",
    },
    team: [
      { name: "Кирилл Васильев", role: "Python AsyncIO Developer", telegram: "@vasiliev_k" },
      { name: "Егор Попов", role: "Database Engineer (PostgreSQL/Redis)", telegram: "@popov_dba" },
    ],
    priority: "P0 - Критический",
    tags: ["Python 3.12", "Aiogram 3", "Redis Sentinel", "PostgreSQL", "Prometheus", "Docker"],
    lastUpdated: "17 октября 2026, 23:10 (v3.2.1)",
    lastUpdatedIso: "2026-10-17T23:10:00Z",
    status: "operational",
    uptime: {
      current: 99.99,
      last24h: 100.0,
      last7d: 100.0,
      last30d: 99.98,
      last90d: 99.95,
      historyDaily: generateDailyHistory(90, 99.99, false),
    },
    apiCodes: {
      code2xx: 99.42,
      code3xx: 0.1,
      code4xx: 0.45,
      code5xx: 0.03,
    },
    lastSuccessCheck: "18.10.2026 14:08:50",
    lastSuccessCheckSecondsAgo: 2,
    outages: {
      incidentsCount30d: 0,
      totalDowntimeMinutes30d: 0,
      mttrMinutes: 0,
      recentIncidents: [],
    },
    performance: {
      responseTimeAvg: 32,
      responseTimeP95: 78,
      responseTimeP99: 140,
      rps: 86.4,
      throughput: "12.8 MB/s",
      bandwidthMbps: 102.4,
    },
    hardware: {
      cpuUsagePercent: 18.2,
      cpuCores: 8,
      cpuHistory: [14, 16, 20, 19, 18, 22, 18, 17, 19, 18, 18, 18],
      memoryUsedGb: 3.1,
      memoryTotalGb: 8.0,
      memoryPercent: 38.75,
      diskFreeGb: 92.4,
      diskTotalGb: 128.0,
      diskUsedPercent: 27.8,
      diskReadMbS: 2.1,
      diskWriteMbS: 8.4,
      diskIops: 210,
      diskLatencyMs: 0.9,
      networkInMbps: 34.5,
      networkOutMbps: 67.9,
      packetLossPercent: 0.0,
      activeTcpConnections: 780,
    },
    users: {
      realtimeActiveUsers: 724,
      todayVisits: 31200,
      todayUniqueUsers: 14800,
      weeklyVisits: 198000,
      trendPercent: 18.4,
      hourlyHistory: [
        { hour: "08:00", active: 450 },
        { hour: "10:00", active: 890 },
        { hour: "12:00", active: 940 },
        { hour: "14:00", active: 724 },
      ],
    },
    serviceUrl: "https://t.me/financialuniversitybot",
    repoUrl: "https://github.com/itc-fa/schedule-bot",
    healthEndpoint: "https://bot-metrics.itc-fa.ru/metrics",
  },
  {
    id: "finmap",
    name: "Карта корпусов (FinMap)",
    description:
      "Интерактивная трехмерная навигация по корпусам Финансового университета. 3D-модели этажей, поиск аудиторий, кафедр и построение кратчайшего маршрута.",
    lead: {
      name: "Арсений Лебедев",
      role: "Lead 3D & Graphics Developer",
      telegram: "@lebedev_3d",
      github: "https://github.com/itc-fa/finmap",
    },
    team: [
      { name: "Никита Кузнецов", role: "WebGL & Three.js Engineer", telegram: "@kuznetsov_gl" },
      { name: "Софья Орлова", role: "UI/UX & Wayfinding Designer", telegram: "@orlova_design" },
      { name: "Павел Романов", role: "Map Data Specialist", telegram: "@romanov_gis" },
    ],
    priority: "P1 - Высокий",
    tags: ["React 19", "Three.js", "WebGL", "Vite", "Tailwind CSS", "GeoJSON", "Nginx"],
    lastUpdated: "16 октября 2026, 17:35 (v1.6.0)",
    lastUpdatedIso: "2026-10-16T17:35:00Z",
    status: "operational",
    uptime: {
      current: 99.91,
      last24h: 100.0,
      last7d: 99.88,
      last30d: 99.82,
      last90d: 99.75,
      historyDaily: generateDailyHistory(90, 99.91, true),
    },
    apiCodes: {
      code2xx: 97.9,
      code3xx: 1.2,
      code4xx: 0.8,
      code5xx: 0.1,
    },
    lastSuccessCheck: "18.10.2026 14:08:35",
    lastSuccessCheckSecondsAgo: 17,
    outages: {
      incidentsCount30d: 1,
      totalDowntimeMinutes30d: 8,
      mttrMinutes: 8,
      recentIncidents: [
        {
          id: "inc-102",
          title: "Задержка отдачи 3D GLTF-мешей корпуса на Щербаковской",
          startedAt: "2026-09-29 14:20",
          resolvedAt: "2026-09-29 14:28",
          durationMinutes: 8,
          severity: "minor",
          rootCause: "Холодный прогрев CDN-кэша после перекомпиляции 3D-ассетов",
          status: "resolved",
        },
      ],
    },
    performance: {
      responseTimeAvg: 64,
      responseTimeP95: 148,
      responseTimeP99: 240,
      rps: 18.5,
      throughput: "38.4 MB/s",
      bandwidthMbps: 307.2,
    },
    hardware: {
      cpuUsagePercent: 21.0,
      cpuCores: 4,
      cpuHistory: [16, 19, 24, 22, 20, 25, 23, 21, 20, 22, 21, 21],
      memoryUsedGb: 2.9,
      memoryTotalGb: 8.0,
      memoryPercent: 36.25,
      diskFreeGb: 142.0,
      diskTotalGb: 256.0,
      diskUsedPercent: 44.5,
      diskReadMbS: 24.5,
      diskWriteMbS: 3.2,
      diskIops: 580,
      diskLatencyMs: 1.5,
      networkInMbps: 22.0,
      networkOutMbps: 310.0,
      packetLossPercent: 0.0,
      activeTcpConnections: 195,
    },
    users: {
      realtimeActiveUsers: 82,
      todayVisits: 3840,
      todayUniqueUsers: 2100,
      weeklyVisits: 24600,
      trendPercent: 8.2,
      hourlyHistory: [
        { hour: "08:00", active: 25 },
        { hour: "10:00", active: 95 },
        { hour: "12:00", active: 110 },
        { hour: "14:00", active: 82 },
      ],
    },
    serviceUrl: "/map",
    repoUrl: "https://github.com/itc-fa/finmap",
    healthEndpoint: "https://map.fa.ru/api/health",
  },
  {
    id: "heimdall-bifrost",
    name: "Heimdall & Bifröst (Инфостенд и терминалы)",
    description:
      "Интерактивная витрина сообщества ИТС и киоск самообслуживания в холлах университета. Дисплей оперативных сводок, расписания и сервисов.",
    lead: {
      name: "Даниил Смирнов",
      role: "Lead Platform Engineer",
      telegram: "@smirnov_tech",
      github: "https://github.com/itc-fa/heimdall",
    },
    team: [
      { name: "Максим Потапов", role: "Frontend Architect", telegram: "@potapov_m" },
      { name: "Роман Григорьев", role: "Hardware & Terminal Integration", telegram: "@grigoriev_kiosk" },
      { name: "Алина Федорова", role: "Product Designer", telegram: "@fedorova_ui" },
    ],
    priority: "P1 - Высокий",
    tags: ["Next.js 16", "React 19", "Tailwind CSS v4", "TypeScript", "WebSocket", "Edge"],
    lastUpdated: "18 октября 2026, 14:05 (v1.0.4)",
    lastUpdatedIso: "2026-10-18T14:05:00Z",
    status: "operational",
    uptime: {
      current: 100.0,
      last24h: 100.0,
      last7d: 100.0,
      last30d: 99.98,
      last90d: 99.92,
      historyDaily: generateDailyHistory(90, 100.0, false),
    },
    apiCodes: {
      code2xx: 99.2,
      code3xx: 0.5,
      code4xx: 0.3,
      code5xx: 0.0,
    },
    lastSuccessCheck: "18.10.2026 14:08:52",
    lastSuccessCheckSecondsAgo: 0,
    outages: {
      incidentsCount30d: 0,
      totalDowntimeMinutes30d: 0,
      mttrMinutes: 0,
      recentIncidents: [],
    },
    performance: {
      responseTimeAvg: 28,
      responseTimeP95: 62,
      responseTimeP99: 98,
      rps: 12.4,
      throughput: "8.6 MB/s",
      bandwidthMbps: 68.8,
    },
    hardware: {
      cpuUsagePercent: 12.5,
      cpuCores: 4,
      cpuHistory: [10, 11, 14, 13, 12, 15, 12, 11, 13, 12, 12, 13],
      memoryUsedGb: 1.8,
      memoryTotalGb: 4.0,
      memoryPercent: 45.0,
      diskFreeGb: 48.0,
      diskTotalGb: 64.0,
      diskUsedPercent: 25.0,
      diskReadMbS: 1.2,
      diskWriteMbS: 4.5,
      diskIops: 120,
      diskLatencyMs: 0.8,
      networkInMbps: 14.8,
      networkOutMbps: 54.2,
      packetLossPercent: 0.0,
      activeTcpConnections: 86,
    },
    users: {
      realtimeActiveUsers: 35,
      todayVisits: 1420,
      todayUniqueUsers: 890,
      weeklyVisits: 9800,
      trendPercent: 22.4,
      hourlyHistory: [
        { hour: "08:00", active: 12 },
        { hour: "10:00", active: 45 },
        { hour: "12:00", active: 52 },
        { hour: "14:00", active: 35 },
      ],
    },
    serviceUrl: "http://localhost:3000",
    repoUrl: "https://github.com/itc-fa/heimdall",
    healthEndpoint: "http://localhost:3000/api/health",
  },
  {
    id: "taskmanager",
    name: "TaskManager ИТС (CRM & Задачи)",
    description:
      "Система управления проектами, задачами и профилями разработчиков ИТС. Автоматический расчет стажа, учет компетенций и интеграция с Telegram.",
    lead: {
      name: "Илья Ковалев",
      role: "Project Manager & Architect",
      telegram: "@kovalev_pm",
      github: "https://github.com/itc-fa/taskmanager",
    },
    team: [
      { name: "Артем Мельников", role: "Fullstack Python / React Developer", telegram: "@melnikov_art" },
      { name: "Владислав Поляков", role: "DevOps & Cloud Engineer", telegram: "@polyakov_devops" },
      { name: "Алина Григорьева", role: "Product Analyst", telegram: "@grigorieva_al" },
    ],
    priority: "P1 - Высокий",
    tags: ["FastAPI", "React", "PostgreSQL", "Redis", "Celery", "Docker", "Sentry"],
    lastUpdated: "18 октября 2026, 11:20 (v2.1.0)",
    lastUpdatedIso: "2026-10-18T11:20:00Z",
    status: "operational",
    uptime: {
      current: 99.85,
      last24h: 100.0,
      last7d: 99.91,
      last30d: 99.78,
      last90d: 99.72,
      historyDaily: generateDailyHistory(90, 99.85, false),
    },
    apiCodes: {
      code2xx: 98.45,
      code3xx: 0.8,
      code4xx: 0.65,
      code5xx: 0.1,
    },
    lastSuccessCheck: "18.10.2026 14:08:40",
    lastSuccessCheckSecondsAgo: 12,
    outages: {
      incidentsCount30d: 1,
      totalDowntimeMinutes30d: 15,
      mttrMinutes: 15,
      recentIncidents: [
        {
          id: "inc-103",
          title: "Рестарт пула Celery-воркеров при синхронизации Telegram-групп",
          startedAt: "2026-10-09 19:30",
          resolvedAt: "2026-10-09 19:45",
          durationMinutes: 15,
          severity: "minor",
          rootCause: "OOM killer воркера из-за массовой фоновой выгрузки медиафайлов",
          status: "resolved",
        },
      ],
    },
    performance: {
      responseTimeAvg: 56,
      responseTimeP95: 124,
      responseTimeP99: 210,
      rps: 22.8,
      throughput: "14.2 MB/s",
      bandwidthMbps: 113.6,
    },
    hardware: {
      cpuUsagePercent: 32.8,
      cpuCores: 8,
      cpuHistory: [26, 28, 35, 34, 30, 38, 33, 31, 34, 32, 33, 33],
      memoryUsedGb: 5.4,
      memoryTotalGb: 16.0,
      memoryPercent: 33.75,
      diskFreeGb: 168.0,
      diskTotalGb: 256.0,
      diskUsedPercent: 34.3,
      diskReadMbS: 8.9,
      diskWriteMbS: 14.5,
      diskIops: 340,
      diskLatencyMs: 1.1,
      networkInMbps: 28.5,
      networkOutMbps: 85.0,
      packetLossPercent: 0.0,
      activeTcpConnections: 210,
    },
    users: {
      realtimeActiveUsers: 49,
      todayVisits: 1980,
      todayUniqueUsers: 245,
      weeklyVisits: 13500,
      trendPercent: 15.6,
      hourlyHistory: [
        { hour: "08:00", active: 18 },
        { hour: "10:00", active: 58 },
        { hour: "12:00", active: 64 },
        { hour: "14:00", active: 49 },
      ],
    },
    serviceUrl: "https://api.taskmanager-itc.ru",
    repoUrl: "https://github.com/itc-fa/taskmanager",
    healthEndpoint: "https://api.taskmanager-itc.ru/health",
  },
  {
    id: "itc-publications",
    name: "ИТС Публикации (Медиа-хаб)",
    description:
      "Образовательная и новостная площадка студенческого сообщества: технические статьи, обзоры хакатонов, гайды по стеку и анонсы митапов.",
    lead: {
      name: "Вероника Павлова",
      role: "Lead Tech Editor / PR",
      telegram: "@pavlova_itc",
      github: "https://github.com/itc-fa/publications",
    },
    team: [
      { name: "Сергей Новиков", role: "Static Site & CDN Engineer", telegram: "@novikov_s" },
      { name: "Полина Ильина", role: "Content QA & SEO", telegram: "@ilyina_p" },
    ],
    priority: "P2 - Средний",
    tags: ["Hugo", "Node.js", "Cloudflare Pages", "Markdown", "GitHub Actions"],
    lastUpdated: "18 октября 2026, 09:15 (v1.9.8)",
    lastUpdatedIso: "2026-10-18T09:15:00Z",
    status: "operational",
    uptime: {
      current: 99.95,
      last24h: 100.0,
      last7d: 100.0,
      last30d: 99.94,
      last90d: 99.91,
      historyDaily: generateDailyHistory(90, 99.95, false),
    },
    apiCodes: {
      code2xx: 99.1,
      code3xx: 0.6,
      code4xx: 0.28,
      code5xx: 0.02,
    },
    lastSuccessCheck: "18.10.2026 14:08:48",
    lastSuccessCheckSecondsAgo: 4,
    outages: {
      incidentsCount30d: 0,
      totalDowntimeMinutes30d: 0,
      mttrMinutes: 0,
      recentIncidents: [],
    },
    performance: {
      responseTimeAvg: 22,
      responseTimeP95: 45,
      responseTimeP99: 75,
      rps: 8.6,
      throughput: "6.2 MB/s",
      bandwidthMbps: 49.6,
    },
    hardware: {
      cpuUsagePercent: 8.4,
      cpuCores: 2,
      cpuHistory: [6, 7, 9, 8, 8, 10, 8, 7, 9, 8, 8, 8],
      memoryUsedGb: 0.9,
      memoryTotalGb: 2.0,
      memoryPercent: 45.0,
      diskFreeGb: 28.0,
      diskTotalGb: 32.0,
      diskUsedPercent: 12.5,
      diskReadMbS: 0.8,
      diskWriteMbS: 1.2,
      diskIops: 65,
      diskLatencyMs: 0.6,
      networkInMbps: 8.2,
      networkOutMbps: 41.5,
      packetLossPercent: 0.0,
      activeTcpConnections: 112,
    },
    users: {
      realtimeActiveUsers: 118,
      todayVisits: 5400,
      todayUniqueUsers: 3200,
      weeklyVisits: 38200,
      trendPercent: 9.8,
      hourlyHistory: [
        { hour: "08:00", active: 40 },
        { hour: "10:00", active: 130 },
        { hour: "12:00", active: 155 },
        { hour: "14:00", active: 118 },
      ],
    },
    serviceUrl: "https://t.me/itc_teams",
    repoUrl: "https://github.com/itc-fa/publications",
    healthEndpoint: "https://itc-teams.ru/health",
  },
  {
    id: "digital-campus",
    name: "Цифровой кампус (Smart Campus)",
    description:
      "Универсальная система бронирования аудиторий, студенческих коворкингов, переговорных комнат и оборудования. Интеграция с СКУД и картами пропусков.",
    lead: {
      name: "Георгий Белов",
      role: "Lead Fullstack Developer",
      telegram: "@belov_smart",
      github: "https://github.com/itc-fa/smart-campus",
    },
    team: [
      { name: "Дмитрий Семенов", role: "Mobile Lead (React Native)", telegram: "@semenov_d" },
      { name: "Ксения Тарасова", role: "Backend Engineer (Spring Boot)", telegram: "@tarasova_k" },
      { name: "Игорь Фетисов", role: "IoT & Hardware Integration", telegram: "@fetisov_iot" },
    ],
    priority: "P2 - Средний",
    tags: ["Kotlin", "Spring Boot 3", "React Native", "PostgreSQL", "MQTT", "Docker"],
    lastUpdated: "15 октября 2026, 18:40 (v1.4.2)",
    lastUpdatedIso: "2026-10-15T18:40:00Z",
    status: "degraded",
    uptime: {
      current: 98.42,
      last24h: 98.9,
      last7d: 98.65,
      last30d: 98.3,
      last90d: 98.15,
      historyDaily: generateDailyHistory(90, 98.42, true),
    },
    apiCodes: {
      code2xx: 94.6,
      code3xx: 0.8,
      code4xx: 3.2,
      code5xx: 1.4,
    },
    lastSuccessCheck: "18.10.2026 14:08:22",
    lastSuccessCheckSecondsAgo: 30,
    outages: {
      incidentsCount30d: 3,
      totalDowntimeMinutes30d: 46,
      mttrMinutes: 15,
      recentIncidents: [
        {
          id: "inc-104",
          title: "Задержка синхронизации замков СКУД в коворкинге",
          startedAt: "2026-10-18 13:40",
          durationMinutes: 28,
          severity: "warning",
          rootCause: "Перегрузка очереди MQTT-брокера при массовом бронировании",
          status: "investigating",
        },
      ],
    },
    performance: {
      responseTimeAvg: 185,
      responseTimeP95: 420,
      responseTimeP99: 890,
      rps: 9.4,
      throughput: "4.8 MB/s",
      bandwidthMbps: 38.4,
    },
    hardware: {
      cpuUsagePercent: 68.4,
      cpuCores: 4,
      cpuHistory: [45, 52, 60, 68, 74, 71, 69, 72, 70, 67, 68, 68],
      memoryUsedGb: 6.2,
      memoryTotalGb: 8.0,
      memoryPercent: 77.5,
      diskFreeGb: 44.0,
      diskTotalGb: 128.0,
      diskUsedPercent: 65.6,
      diskReadMbS: 18.4,
      diskWriteMbS: 24.2,
      diskIops: 780,
      diskLatencyMs: 6.8,
      networkInMbps: 24.6,
      networkOutMbps: 18.2,
      packetLossPercent: 0.4,
      activeTcpConnections: 340,
    },
    users: {
      realtimeActiveUsers: 19,
      todayVisits: 890,
      todayUniqueUsers: 340,
      weeklyVisits: 6200,
      trendPercent: -4.2,
      hourlyHistory: [
        { hour: "08:00", active: 8 },
        { hour: "10:00", active: 24 },
        { hour: "12:00", active: 31 },
        { hour: "14:00", active: 19 },
      ],
    },
    serviceUrl: "https://campus.fa.ru",
    repoUrl: "https://github.com/itc-fa/smart-campus",
    healthEndpoint: "https://campus.fa.ru/actuator/health",
  },
  {
    id: "academia",
    name: "Академия ИТС (EdTech Платформа)",
    description:
      "Образовательная среда сообщества: интерактивные практикумы по программированию, автоматическая проверка домашних заданий, трекинг прогресса менторства.",
    lead: {
      name: "Тимофей Медведев",
      role: "Curator & Educational Lead",
      telegram: "@medvedev_ed",
      github: "https://github.com/itc-fa/academia",
    },
    team: [
      { name: "Ольга Романова", role: "Frontend Developer (Vue 3)", telegram: "@romanova_o" },
      { name: "Павел Щербаков", role: "Backend Developer (Django/Celery)", telegram: "@shcherbakov_p" },
    ],
    priority: "P3 - Низкий",
    tags: ["Django 5", "Python", "Vue 3", "PostgreSQL", "Docker", "Celery"],
    lastUpdated: "12 октября 2026, 14:10 (v0.9.4)",
    lastUpdatedIso: "2026-10-12T14:10:00Z",
    status: "maintenance",
    uptime: {
      current: 97.8,
      last24h: 96.2,
      last7d: 97.4,
      last30d: 97.9,
      last90d: 98.1,
      historyDaily: generateDailyHistory(90, 97.8, true),
    },
    apiCodes: {
      code2xx: 92.4,
      code3xx: 1.1,
      code4xx: 4.5,
      code5xx: 2.0,
    },
    lastSuccessCheck: "18.10.2026 13:45:10",
    lastSuccessCheckSecondsAgo: 1400,
    outages: {
      incidentsCount30d: 2,
      totalDowntimeMinutes30d: 120,
      mttrMinutes: 60,
      recentIncidents: [
        {
          id: "inc-105",
          title: "Плановое техническое обслуживание: миграция базы PostgreSQL 16",
          startedAt: "2026-10-18 13:00",
          durationMinutes: 90,
          severity: "warning",
          rootCause: "Обновление схемы данных и индексов для модуля код-ревью",
          status: "investigating",
        },
      ],
    },
    performance: {
      responseTimeAvg: 210,
      responseTimeP95: 540,
      responseTimeP99: 1100,
      rps: 2.1,
      throughput: "1.2 MB/s",
      bandwidthMbps: 9.6,
    },
    hardware: {
      cpuUsagePercent: 14.0,
      cpuCores: 2,
      cpuHistory: [12, 14, 15, 13, 14, 16, 14, 13, 15, 14, 14, 14],
      memoryUsedGb: 1.9,
      memoryTotalGb: 4.0,
      memoryPercent: 47.5,
      diskFreeGb: 38.0,
      diskTotalGb: 64.0,
      diskUsedPercent: 40.6,
      diskReadMbS: 1.5,
      diskWriteMbS: 3.8,
      diskIops: 95,
      diskLatencyMs: 2.1,
      networkInMbps: 3.4,
      networkOutMbps: 8.6,
      packetLossPercent: 0.0,
      activeTcpConnections: 24,
    },
    users: {
      realtimeActiveUsers: 4,
      todayVisits: 140,
      todayUniqueUsers: 48,
      weeklyVisits: 1250,
      trendPercent: -15.4,
      hourlyHistory: [
        { hour: "08:00", active: 1 },
        { hour: "10:00", active: 5 },
        { hour: "12:00", active: 8 },
        { hour: "14:00", active: 4 },
      ],
    },
    serviceUrl: "https://academia.fa.ru",
    repoUrl: "https://github.com/itc-fa/academia",
    healthEndpoint: "https://academia.fa.ru/api/health",
  },
];

/**
 * Real-time telemetry tick simulator:
 * Subtly modulates RPS, latency, active users, CPU to make the monitoring dashboard feel live.
 */
export function simulateTelemetryTick(
  projects: ProjectMonitoringData[],
): ProjectMonitoringData[] {
  return projects.map((p) => {
    if (p.status === "maintenance") {
      return p;
    }

    const deltaUsers = Math.floor((Math.random() - 0.48) * 5);
    const newActiveUsers = Math.max(1, p.users.realtimeActiveUsers + deltaUsers);

    const deltaRps = +( (Math.random() - 0.5) * 1.5 ).toFixed(1);
    const newRps = Math.max(0.5, +(p.performance.rps + deltaRps).toFixed(1));

    const deltaLatency = Math.floor((Math.random() - 0.5) * 4);
    const newLatencyAvg = Math.max(15, p.performance.responseTimeAvg + deltaLatency);

    const deltaCpu = +( (Math.random() - 0.5) * 2.2 ).toFixed(1);
    const newCpu = Math.min(
      98,
      Math.max(5, +(p.hardware.cpuUsagePercent + deltaCpu).toFixed(1)),
    );
    const newCpuHistory = [...p.hardware.cpuHistory.slice(1), newCpu];

    return {
      ...p,
      lastSuccessCheckSecondsAgo: 0,
      performance: {
        ...p.performance,
        rps: newRps,
        responseTimeAvg: newLatencyAvg,
      },
      hardware: {
        ...p.hardware,
        cpuUsagePercent: newCpu,
        cpuHistory: newCpuHistory,
      },
      users: {
        ...p.users,
        realtimeActiveUsers: newActiveUsers,
      },
    };
  });
}
