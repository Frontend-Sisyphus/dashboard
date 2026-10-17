import { communityTracks } from "@/lib/itc/tracks";
import {
  buildFeedFromCrm,
  mapProjects,
  mapUsers,
  type CommunityMember,
  type DashboardProject,
} from "@/lib/taskmanager/map";
import {
  fetchProjects,
  fetchTechnologies,
  fetchUsers,
  probeTaskmanager,
} from "@/lib/taskmanager/server";

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
      ok: false,
      source: "fallback",
      fetchedAt,
      kpis: { members: 0, projects: 0, online: 0, technologies: 0 },
      projects: [],
      members: [],
      feed: [
        {
          time: "система",
          text: alive
            ? "База отвечает частично — проверьте доступ к проектам"
            : "База проектов недоступна — показаны запасные сведения",
        },
      ],
      tracks: communityTracks,
      services: [
        {
          label: "База проектов ИТС",
          value: alive ? "Частично" : "Нет связи",
          tone: alive ? "warn" : "critical",
        },
        { label: "ФИН Помощник", value: "Доступен", tone: "ok" },
        { label: "Карта корпусов", value: "На проверке", tone: "warn" },
      ],
    };
  }
}
