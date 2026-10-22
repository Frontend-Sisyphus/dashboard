export type ProjectStatus =
  | "live"
  | "beta"
  | "development"
  | "paused"
  | "completed";

export type ProjectCategory = "info" | "media" | "events" | "projects";

export interface ItcProject {
  id: string;
  name: string;
  summary: string;
  status: ProjectStatus;
  category: ProjectCategory;
  href?: string;
}

export const projectStatusLabel: Record<ProjectStatus, string> = {
  live: "Работает",
  beta: "На проверке",
  development: "В работе",
  paused: "На паузе",
  completed: "Завершён",
};

export const itcProjects: ItcProject[] = [
  {
    id: "fin-helper",
    name: "ФИН Помощник",
    summary: "Расписание в мессенджерах, поддержка ИТС",
    status: "live",
    category: "info",
    href: "https://www.fa.ru/for-students/schedule/",
  },
  {
    id: "finmap",
    name: "Карта корпусов",
    summary: "Объёмная карта университета: этажи и маршруты",
    status: "beta",
    category: "info",
    href: "/map",
  },
  {
    id: "helper-bot",
    name: "Помощник по расписанию",
    summary: "Актуальное расписание в мессенджере",
    status: "live",
    category: "info",
    href: "https://t.me/financialuniversitybot",
  },
  {
    id: "itc-publications",
    name: "ИТС публикации",
    summary: "Образовательный канал сообщества",
    status: "live",
    category: "media",
    href: "https://t.me/itc_teams",
  },
  {
    id: "digital-campus",
    name: "Цифровой университет",
    summary: "Победа на хакатоне · направление «Цифровизация»",
    status: "completed",
    category: "projects",
  },
  {
    id: "heimdall",
    name: "Heimdall и Bifröst",
    summary: "Информационный стенд и экран наблюдения ИТС",
    status: "development",
    category: "projects",
  },
  {
    id: "academia",
    name: "Академия",
    summary: "Мобильные сервисы для учёбы",
    status: "paused",
    category: "projects",
  },
];

