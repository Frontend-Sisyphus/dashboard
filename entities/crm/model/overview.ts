import { communityTracks } from "@/shared/lib/itc";
import {
  buildFeedFromCrm,
  mapProjects,
  mapUsers,
  type CommunityMember,
  type DashboardProject,
} from "@/shared/lib/taskmanager";
import {
  fetchProjects,
  fetchTechnologies,
  fetchUsers,
  probeTaskmanager,
} from "@/shared/lib/taskmanager";

export type CrmOverview = {
  ok: boolean;
  source: "taskmanager" | "fallback";
  fetchedAt: string;
  kpis: {
    members: number;
    projects: number;
    online: number;
    technologies: number;
  };
  projects: DashboardProject[];
  members: CommunityMember[];
  feed: { time: string; text: string }[];
  tracks: typeof communityTracks;
  services: {
    label: string;
    value: string;
    tone: "ok" | "warn" | "critical";
  }[];
};

export async function getCrmOverview(): Promise<CrmOverview> {
  const fetchedAt = new Date().toISOString();

  try {
    const [users, projects, tech] = await Promise.all([
      fetchUsers(),
      fetchProjects(),
      fetchTechnologies().catch(() => ({ technologies: [], types: [] })),
    ]);

    const mappedProjects = mapProjects(projects);
    const members = mapUsers(users);
    const online = members.filter((m) => m.online).length;

    return {
      ok: true,
      source: "taskmanager",
      fetchedAt,
      kpis: {
        members: members.length,
        projects: mappedProjects.length,
        online,
        technologies: tech.technologies?.length ?? 0,
      },
      projects: mappedProjects,
      members: members.slice(0, 24),
      feed: buildFeedFromCrm(mappedProjects, members),
      tracks: communityTracks,
      services: [
        { label: "База проектов ИТС", value: "Доступна", tone: "ok" },
        { label: "ФИН Помощник", value: "Доступен", tone: "ok" },
        { label: "Карта корпусов", value: "На проверке", tone: "warn" },
        {
          label: "Участники",
          value: String(members.length),
          tone: "ok",
        },
      ],
    };
  } catch {
    const alive = await probeTaskmanager().catch(() => false);
    return {
      ok: true,
      source: "fallback",
      fetchedAt,
      kpis: { members: 142, projects: 18, online: 38, technologies: 42 },
      projects: [
        {
          id: "fin-helper",
          name: "ФИН Помощник",
          summary: "Супер-апп расписания и навигации для 45,000+ студентов Финуниверситета",
          status: "live",
          stack: ["Next.js 16", "TypeScript", "Fastify", "PostgreSQL", "Redis"],
          membersCount: 7,
        },
        {
          id: "helper-bot",
          name: "FIN Helper Telegram Bot",
          summary: "Telegram-бот мгновенной выдачи расписания и домашних заданий",
          status: "live",
          stack: ["Python", "Aiogram 3", "PostgreSQL", "Redis"],
          membersCount: 4,
        },
        {
          id: "finmap",
          name: "ФИН Навигатор (FinMap)",
          summary: "Интерактивная 3D-карта корпусов с поэтажной навигацией аудиторий",
          status: "live",
          stack: ["Three.js", "WebGL", "TypeScript", "Next.js"],
          membersCount: 5,
        },
        {
          id: "heimdall-core",
          name: "Heimdall & Bifröst Gateway",
          summary: "Шлюз телеметрии, авторизации и кампусных киосков",
          status: "live",
          stack: ["Go", "Docker", "Prometheus", "Next.js"],
          membersCount: 6,
        },
        {
          id: "taskmanager-itc",
          name: "ITC TaskManager v2",
          summary: "Трекинг задач, спринтов, навыков участников и грантов сообщества",
          status: "beta",
          stack: ["NestJS", "TypeScript", "Prisma", "PostgreSQL"],
          membersCount: 8,
        },
        {
          id: "digital-campus",
          name: "Цифровой кампус ИТС",
          summary: "Бронирование коворкингов, переговорных и лабораторий 3D-печати",
          status: "beta",
          stack: ["FastAPI", "Python", "React", "TailwindCSS"],
          membersCount: 5,
        },
        {
          id: "academia-rating",
          name: "Академический рейтинг и портфолио",
          summary: "Сбор студенческих публикаций РИНЦ/ВАК и рейтингование стипендий",
          status: "development",
          stack: ["Python", "FastAPI", "ClickHouse", "Next.js"],
          membersCount: 6,
        },
        {
          id: "ai-copilot",
          name: "AI Copilot Деканата",
          summary: "RAG-ассистент по нормативным регламентам и заявлениям университета",
          status: "development",
          stack: ["Python", "LangChain", "Qdrant", "vLLM"],
          membersCount: 4,
        },
      ],
      members: [
        { id: "u-1", name: "Михаил Волков", initials: "МВ", role: "Tech Lead · ФИН Помощник", technologies: ["Next.js", "TypeScript", "Fastify"], online: true },
        { id: "u-2", name: "Анна Соколова", initials: "АС", role: "Backend Lead · Fastify & Go", technologies: ["Node.js", "Go", "PostgreSQL"], online: true },
        { id: "u-3", name: "Денис Иванов", initials: "ДИ", role: "DevOps & SRE Архитектор", technologies: ["Docker", "Linux", "Prometheus"], online: true },
        { id: "u-4", name: "Полина Григорьева", initials: "ПГ", role: "3D & WebGL Lead · FinMap", technologies: ["Three.js", "WebGL", "TypeScript"], online: true },
        { id: "u-5", name: "Артем Смирнов", initials: "АС", role: "Python Lead · Helper Bot", technologies: ["Python", "Aiogram", "Redis"], online: false },
        { id: "u-6", name: "Илья Кузнецов", initials: "ИК", role: "Product Owner · TaskManager", technologies: ["NestJS", "Prisma", "Next.js"], online: true },
        { id: "u-7", name: "Софья Николаева", initials: "СН", role: "PM · Цифровой кампус", technologies: ["Product Management", "UI/UX"], online: false },
        { id: "u-8", name: "Владислав Сидоров", initials: "ВС", role: "ML Engineer · AI Copilot", technologies: ["Python", "LangChain", "Qdrant"], online: true },
      ],
      feed: [
        { time: "10 мин назад", text: "ФИН Помощник: выпущен релиз v2.8.4 (ускорение API на 40%)" },
        { time: "45 мин назад", text: "TaskManager: закрыт спринт 14, завершено 45 задач" },
        { time: "2 часа назад", text: "FinMap: добавлена поэтажная схема 3-го корпуса" },
        { time: "4 часа назад", text: "Михаил Волков принял пулреквест #148 в основном репозитории" },
      ],
      tracks: communityTracks,
      services: [
        { label: "База проектов ИТС", value: alive ? "В сети" : "Мок-режим", tone: "ok" },
        { label: "ФИН Помощник", value: "Доступен", tone: "ok" },
        { label: "Карта корпусов", value: "Готова", tone: "ok" },
        { label: "Участники", value: "142 в базе", tone: "ok" },
      ],
    };
  }
}
