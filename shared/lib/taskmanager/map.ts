import type { ApiProject, ApiUser } from "@/lib/taskmanager/types";

export type ProjectStatus =
  | "live"
  | "beta"
  | "development"
  | "paused"
  | "completed"
  | "unknown";

export const projectStatusLabel: Record<ProjectStatus, string> = {
  live: "Работает",
  beta: "На проверке",
  development: "В работе",
  paused: "На паузе",
  completed: "Завершён",
  unknown: "Без отметки",
};

export type DashboardProject = {
  id: string;
  name: string;
  summary: string;
  status: ProjectStatus;
  statusRaw?: string;
  type?: string;
  stack: string[];
  membersCount: number;
};

export type CommunityMember = {
  id: string;
  name: string;
  initials: string;
  role: string;
  photoUrl?: string | null;
  username?: string;
  technologies: string[];
  online?: boolean;
};

export function flattenProjectStack(stack?: Record<string, string[]>) {
  if (!stack) return [] as string[];
  return Object.values(stack).flat().filter(Boolean);
}

export function normalizeProjectStatus(raw?: string): ProjectStatus {
  if (!raw) return "unknown";
  const s = raw.toLowerCase().trim();

  if (/live|prod|продак|в\s*проде|active|актив|done.*prod|запущен/.test(s)) {
    return "live";
  }
  if (/beta|бета|тест/.test(s)) return "beta";
  if (/dev|разраб|wip|in\s*progress|в\s*работе|building/.test(s)) {
    return "development";
  }
  if (/pause|пауз|hold|stopped|останов/.test(s)) return "paused";
  if (/complete|заверш|done|архив|archive|closed/.test(s)) return "completed";

  return "unknown";
}

function displayName(user: ApiUser) {
  if (user.full_name?.trim()) {
    const parts = user.full_name.trim().split(/\s+/).filter(Boolean);
    if (parts.length >= 2) return `${parts[1]} ${parts[0]}`;
    return user.full_name.trim();
  }
  const full = [user.first_name, user.last_name].filter(Boolean).join(" ").trim();
  if (full) return full;
  if (user.username) return `@${user.username}`;
  return "Участник";
}

function initialsFrom(name: string) {
  const parts = name
    .replace(/^@/, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);
  if (parts.length === 0) return "?";
  return parts.map((part) => part[0]!.toUpperCase()).join("");
}

function userKey(user: ApiUser, index: number) {
  if (user.id != null) return String(user.id);
  if (user.telegram_id) return `tg-${user.telegram_id}`;
  if (user.username) return `u-${user.username.toLowerCase()}`;
  return `idx-${index}`;
}

function inferRoleLabel(user: ApiUser): string {
  const role = (user.role ?? "").toLowerCase();
  if (/админ|руковод|организ|lead|owner|admin|тимлид|куратор|ментор/.test(role)) {
    return "руководитель";
  }
  if (role) return user.role!.trim();
  return "участник";
}

export function mapProjects(projects: ApiProject[]): DashboardProject[] {
  return projects
    .map((project) => {
      const stack = flattenProjectStack(project.stack);
      const summary =
        project.description?.trim() ||
        (stack.length ? stack.slice(0, 4).join(" · ") : "Проект сообщества ИТС");

      return {
        id: String(project.id),
        name: project.title?.trim() || `Проект #${project.id}`,
        summary,
        status: normalizeProjectStatus(project.status),
        statusRaw: project.status,
        type: project.project_type,
        stack,
        membersCount: project.members?.length ?? 0,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name, "ru"));
}

export function mapUsers(users: ApiUser[]): CommunityMember[] {
  return users
    .map((user, index) => {
      const name = displayName(user);
      return {
        id: userKey(user, index),
        name,
        initials: initialsFrom(name),
        role: inferRoleLabel(user),
        photoUrl: user.photo_url ?? null,
        username: user.username,
        technologies: user.technologies ?? [],
        online: user.is_online,
      };
    })
    .sort((a, b) => {
      const rank = (m: CommunityMember) =>
        m.role === "руководитель" ? 0 : 1;
      const diff = rank(a) - rank(b);
      if (diff !== 0) return diff;
      return a.name.localeCompare(b.name, "ru");
    });
}

export function buildFeedFromCrm(
  projects: DashboardProject[],
  members: CommunityMember[],
) {
  const online = members.filter((m) => m.online).length;
  const now = new Date();
  const stamp = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  const items = [
    {
      time: stamp,
      text: `В базе ИТС: ${members.length} участников, ${projects.length} проектов`,
    },
    {
      time: stamp,
      text:
        online > 0
          ? `Сейчас в сети: ${online}`
          : "Отметки «в сети» появятся при следующем обновлении",
    },
    ...projects.slice(0, 6).map((project) => ({
      time: projectStatusLabel[project.status],
      text: `${project.name}${project.membersCount ? ` · ${project.membersCount} в команде` : ""}`,
    })),
  ];
  return items;
}
