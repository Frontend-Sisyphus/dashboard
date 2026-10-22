export interface ProjectStatistic {
  id: string;
  name: string;
  category: "Университет" | "Студенты" | "Инфраструктура" | "AI & Данные" | "Наука";
  phase: "production" | "beta" | "development" | "mvp";
  phaseLabel: string;
  summary: string;
  lead: {
    name: string;
    role: string;
    avatar?: string;
  };
  teamSize: number;
  roadmapProgress: number; // 0 - 100%
  currentMilestone: string;
  milestoneDeadline: string;
  sprintTasks: {
    completed: number;
    total: number;
  };
  metrics: {
    commitsMonthly: number;
    pullRequestsClosed: number;
    velocityStoryPoints: number;
    codeQualityScore: number; // 0-100
    testCoveragePercent: number;
  };
  stack: string[];
  version: string;
  lastReleaseDate: string;
  activeUsersDau: number;
}

export interface EcosystemStatsKpis {
  totalProjects: number;
  productionCount: number;
  betaCount: number;
  developmentCount: number;
  mvpCount: number;
  totalContributors: number;
  onlineNow: number;
  tasksCompletedMonth: number;
  averageRoadmapProgress: number;
  releasesThisYear: number;
}

export const mockEcosystemProjects: ProjectStatistic[] = [
  {
    id: "fin-helper",
    name: "ФИН Помощник",
    category: "Университет",
    phase: "production",
    phaseLabel: "Запущен (v2.8.4)",
    summary: "Главный студенческий супер-апп: расписание, замены, аудитории, навигация для 45,000+ студентов Финуниверситета.",
    lead: {
      name: "Михаил Волков",
      role: "Tech Lead & Архитектор",
    },
    teamSize: 7,
    roadmapProgress: 92,
    currentMilestone: "Интеграция с деканатом и пуш-уведомления о переносах пар",
    milestoneDeadline: "28 октября 2026",
    sprintTasks: {
      completed: 38,
      total: 42,
    },
    metrics: {
      commitsMonthly: 148,
      pullRequestsClosed: 32,
      velocityStoryPoints: 54,
      codeQualityScore: 96,
      testCoveragePercent: 88,
    },
    stack: ["Next.js 16", "TypeScript", "Fastify", "PostgreSQL", "Redis", "Docker"],
    version: "v2.8.4",
    lastReleaseDate: "18.10.2026",
    activeUsersDau: 18400,
  },
  {
    id: "schedule-bot",
    name: "FIN Helper Telegram Bot",
    category: "Студенты",
    phase: "production",
    phaseLabel: "Запущен (v3.1.0)",
    summary: "Высоконагруженный Telegram-бот мгновенной выдачи расписания, экзаменов и персональных домашних заданий.",
    lead: {
      name: "Артем Смирнов",
      role: "Lead Backend Developer",
    },
    teamSize: 4,
    roadmapProgress: 95,
    currentMilestone: "Поддержка инлайн-кнопок быстрых выписок групп",
    milestoneDeadline: "30 октября 2026",
    sprintTasks: {
      completed: 24,
      total: 26,
    },
    metrics: {
      commitsMonthly: 96,
      pullRequestsClosed: 19,
      velocityStoryPoints: 42,
      codeQualityScore: 94,
      testCoveragePercent: 84,
    },
    stack: ["Python 3.12", "Aiogram 3", "Redis", "PostgreSQL", "Docker", "Prometheus"],
    version: "v3.1.0",
    lastReleaseDate: "14.10.2026",
    activeUsersDau: 14800,
  },
  {
    id: "finmap",
    name: "ФИН Навигатор (FinMap)",
    category: "Кампус" as any,
    phase: "production",
    phaseLabel: "Запущен (v1.9.0)",
    summary: "Интерактивная трёхмерная карта корпусов на Ленинградском, Щёлковском и Автозаводском проспектах с поэтажной навигацией.",
    lead: {
      name: "Полина Григорьева",
      role: "3D & WebGL Lead",
    },
    teamSize: 5,
    roadmapProgress: 84,
    currentMilestone: "Построение маршрутов между корпусами с учётом доступной среды",
    milestoneDeadline: "5 ноября 2026",
    sprintTasks: {
      completed: 29,
      total: 35,
    },
    metrics: {
      commitsMonthly: 112,
      pullRequestsClosed: 24,
      velocityStoryPoints: 46,
      codeQualityScore: 91,
      testCoveragePercent: 79,
    },
    stack: ["Three.js", "WebGL", "TypeScript", "Next.js", "TailwindCSS"],
    version: "v1.9.0",
    lastReleaseDate: "12.10.2026",
    activeUsersDau: 5600,
  },
  {
    id: "heimdall-core",
    name: "Heimdall & Bifröst Gateway",
    category: "Инфраструктура",
    phase: "production",
    phaseLabel: "Запущен (v2.0.0)",
    summary: "Центральный шлюз авторизации, телеметрии и кампусных киосков самообслуживания сообщества ИТС.",
    lead: {
      name: "Денис Иванов",
      role: "DevOps & SRE Архитектор",
    },
    teamSize: 6,
    roadmapProgress: 88,
    currentMilestone: "Поддержка FSD-архитектуры и мобильных штор-меню",
    milestoneDeadline: "24 октября 2026",
    sprintTasks: {
      completed: 31,
      total: 33,
    },
    metrics: {
      commitsMonthly: 134,
      pullRequestsClosed: 28,
      velocityStoryPoints: 48,
      codeQualityScore: 98,
      testCoveragePercent: 92,
    },
    stack: ["Go", "Next.js 16", "Docker", "Nginx", "Linux", "Prometheus"],
    version: "v2.0.0",
    lastReleaseDate: "22.10.2026",
    activeUsersDau: 4200,
  },
  {
    id: "taskmanager-itc",
    name: "ITC TaskManager v2",
    category: "Инфраструктура",
    phase: "beta",
    phaseLabel: "Бета-тест (v2.1-beta)",
    summary: "Внутренняя система трекинга проектов, спринтов, навыков участников и распределения грантов ИТС.",
    lead: {
      name: "Илья Кузнецов",
      role: "Product Owner / Backend",
    },
    teamSize: 8,
    roadmapProgress: 76,
    currentMilestone: "Интеграция с GitHub Webhooks и авто-закрытие тикетов по коммитам",
    milestoneDeadline: "10 ноября 2026",
    sprintTasks: {
      completed: 45,
      total: 58,
    },
    metrics: {
      commitsMonthly: 178,
      pullRequestsClosed: 41,
      velocityStoryPoints: 62,
      codeQualityScore: 89,
      testCoveragePercent: 76,
    },
    stack: ["NestJS", "TypeScript", "Prisma", "PostgreSQL", "Next.js", "Docker"],
    version: "v2.1-beta",
    lastReleaseDate: "16.10.2026",
    activeUsersDau: 2100,
  },
  {
    id: "digital-campus",
    name: "Цифровой кампус ИТС",
    category: "Университет",
    phase: "beta",
    phaseLabel: "Бета-тест (v1.4-beta)",
    summary: "Бронирование коворкингов, переговорных комнат, лабораторий робототехники и 3D-печати для резидентов ИТС.",
    lead: {
      name: "Софья Николаева",
      role: "Product Manager",
    },
    teamSize: 5,
    roadmapProgress: 72,
    currentMilestone: "Синхронизация пропусков СКУД через QR-коды приложения",
    milestoneDeadline: "15 ноября 2026",
    sprintTasks: {
      completed: 21,
      total: 30,
    },
    metrics: {
      commitsMonthly: 84,
      pullRequestsClosed: 18,
      velocityStoryPoints: 36,
      codeQualityScore: 92,
      testCoveragePercent: 81,
    },
    stack: ["FastAPI", "Python", "React", "TailwindCSS", "PostgreSQL"],
    version: "v1.4-beta",
    lastReleaseDate: "09.10.2026",
    activeUsersDau: 1850,
  },
  {
    id: "academia-rating",
    name: "Академический рейтинг и портфолио",
    category: "Наука",
    phase: "development",
    phaseLabel: "В разработке (Sprint 8)",
    summary: "Автоматический сбор студенческих научных публикаций РИНЦ/ВАК, участие в хакатонах и рейтингование стипендий.",
    lead: {
      name: "Роман Захаров",
      role: "Lead Fullstack Dev",
    },
    teamSize: 6,
    roadmapProgress: 58,
    currentMilestone: "Парсер библиографических карточек eLibrary и Semantic Scholar",
    milestoneDeadline: "20 ноября 2026",
    sprintTasks: {
      completed: 18,
      total: 32,
    },
    metrics: {
      commitsMonthly: 122,
      pullRequestsClosed: 26,
      velocityStoryPoints: 40,
      codeQualityScore: 88,
      testCoveragePercent: 74,
    },
    stack: ["Python", "FastAPI", "Next.js", "ClickHouse", "Docker"],
    version: "v0.9.2-dev",
    lastReleaseDate: "04.10.2026",
    activeUsersDau: 820,
  },
  {
    id: "ai-deans-copilot",
    name: "AI Copilot Деканата",
    category: "AI & Данные",
    phase: "development",
    phaseLabel: "В разработке (Sprint 5)",
    summary: "LLM-ассистент на базе открытых моделей для ответов на частые вопросы студентов по регламентам и заявлениям.",
    lead: {
      name: "Владислав Сидоров",
      role: "ML / NLP Engineer",
    },
    teamSize: 4,
    roadmapProgress: 48,
    currentMilestone: "RAG-пайплайн по базе нормативных документов университета",
    milestoneDeadline: "25 ноября 2026",
    sprintTasks: {
      completed: 16,
      total: 28,
    },
    metrics: {
      commitsMonthly: 94,
      pullRequestsClosed: 15,
      velocityStoryPoints: 34,
      codeQualityScore: 86,
      testCoveragePercent: 70,
    },
    stack: ["Python 3.11", "LangChain", "Qdrant", "vLLM", "FastAPI", "Docker"],
    version: "v0.5.0-alpha",
    lastReleaseDate: "28.09.2026",
    activeUsersDau: 450,
  },
  {
    id: "itc-publications",
    name: "Научные публикации ИТС",
    category: "Наука",
    phase: "production",
    phaseLabel: "В проде (v1.2.0)",
    summary: "Открытый репозиторий препринтов, тезисов докладов и методических материалов студенческих секций ИТС.",
    lead: {
      name: "Екатерина Соколова",
      role: "Content & Tech Lead",
    },
    teamSize: 3,
    roadmapProgress: 90,
    currentMilestone: "Экспорт в BibTeX и интеграция с DOI Crossref",
    milestoneDeadline: "2 ноября 2026",
    sprintTasks: {
      completed: 14,
      total: 16,
    },
    metrics: {
      commitsMonthly: 52,
      pullRequestsClosed: 12,
      velocityStoryPoints: 26,
      codeQualityScore: 95,
      testCoveragePercent: 86,
    },
    stack: ["Next.js", "Strapi CMS", "PostgreSQL", "TailwindCSS"],
    version: "v1.2.0",
    lastReleaseDate: "06.10.2026",
    activeUsersDau: 920,
  },
  {
    id: "vr-campus-tour",
    name: "VR Campus Metaverse",
    category: "Кампус" as any,
    phase: "mvp",
    phaseLabel: "MVP / Исследование",
    summary: "Виртуальный тур в VR для абитуриентов и первокурсников: осмотр аудиторий и лабораторий университета в браузере.",
    lead: {
      name: "Максим Орлов",
      role: "Unity & WebXR Developer",
    },
    teamSize: 3,
    roadmapProgress: 36,
    currentMilestone: "Оптимизация текстур 3D-моделей под мобильный WebXR",
    milestoneDeadline: "1 декабря 2026",
    sprintTasks: {
      completed: 11,
      total: 24,
    },
    metrics: {
      commitsMonthly: 64,
      pullRequestsClosed: 9,
      velocityStoryPoints: 22,
      codeQualityScore: 82,
      testCoveragePercent: 60,
    },
    stack: ["Unity", "WebXR", "C#", "Blender", "WebGL"],
    version: "v0.2.1-proto",
    lastReleaseDate: "20.09.2026",
    activeUsersDau: 180,
  },
];

export const mockEcosystemStatsKpis: EcosystemStatsKpis = {
  totalProjects: 18,
  productionCount: 6,
  betaCount: 5,
  developmentCount: 4,
  mvpCount: 3,
  totalContributors: 142,
  onlineNow: 38,
  tasksCompletedMonth: 894,
  averageRoadmapProgress: 76.4,
  releasesThisYear: 34,
};

export const mockTechStackDistribution = [
  { name: "TypeScript / Next.js", sharePercent: 44, projectsCount: 14, tone: "bg-primary" },
  { name: "Python / FastAPI / ML", sharePercent: 28, projectsCount: 9, tone: "bg-blue" },
  { name: "Go / Microservices", sharePercent: 12, projectsCount: 4, tone: "bg-ok" },
  { name: "PostgreSQL & ClickHouse", sharePercent: 36, projectsCount: 12, tone: "bg-accent" },
  { name: "Three.js / WebGL / VR", sharePercent: 8, projectsCount: 3, tone: "bg-warn" },
  { name: "Docker & Linux Infra", sharePercent: 50, projectsCount: 16, tone: "bg-fg-muted" },
];

export const mockEngineeringEvents = [
  {
    id: "evt-1",
    timestamp: "10 минут назад",
    project: "ФИН Помощник",
    badge: "Релиз v2.8.4",
    badgeTone: "bg-ok/20 text-ok border-ok/30",
    text: "Оптимизирована загрузка кеша расписания деканата — задержка снижена с 420мс до 84мс.",
    author: "Михаил Волков",
  },
  {
    id: "evt-2",
    timestamp: "45 минут назад",
    project: "ITC TaskManager",
    badge: "PR Merged",
    badgeTone: "bg-primary/20 text-primary border-primary/30",
    text: "Влит пулреквест #182: автоматическое создание карточек задач из Telegram-комментариев.",
    author: "Илья Кузнецов",
  },
  {
    id: "evt-3",
    timestamp: "2 часа назад",
    project: "AI Copilot Деканата",
    badge: "Benchmark",
    badgeTone: "bg-blue/20 text-blue border-blue/30",
    text: "Завершено тестирование RAG на 200 регламентах: точность ответов составила 94.2%.",
    author: "Владислав Сидоров",
  },
  {
    id: "evt-4",
    timestamp: "4 часа назад",
    project: "ФИН Навигатор",
    badge: "Sprint Milestone",
    badgeTone: "bg-warn/20 text-warn border-warn/30",
    text: "Оцифрованы поэтажные планы 3-го корпуса: добавлено 42 аудитории и 6 лекционных залов.",
    author: "Полина Григорьева",
  },
  {
    id: "evt-5",
    timestamp: "Вчера, 19:40",
    project: "Gjallarhorn SRE",
    badge: "Инфраструктура",
    badgeTone: "bg-ok/20 text-ok border-ok/30",
    text: "Все 8 боевых сервисов прошли автоматический стресс-тест готовности к сессионной нагрузке.",
    author: "Денис Иванов",
  },
];
