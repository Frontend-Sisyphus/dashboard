import type {
  ApiProject,
  ApiTechnologyCatalog,
  ApiUser,
} from "@/lib/taskmanager/types";

const API_URL =
  process.env.TASKMANAGER_API_URL?.replace(/\/$/, "") ??
  "https://api.taskmanager-itc.ru";

type Scope = "users" | "projects";

function tokenFor(scope: Scope) {
  const token =
    scope === "users"
      ? process.env.TASKMANAGER_USERS_TOKEN
      : process.env.TASKMANAGER_PROJECTS_TOKEN;

  if (!token) {
    throw new Error(`Missing TASKMANAGER_${scope.toUpperCase()}_TOKEN`);
  }

  return token;
}

async function taskmanagerFetch<T>(
  path: string,
  scope: Scope,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${tokenFor(scope)}`,
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(
      `TaskManager ${path} failed: ${response.status}${body ? ` ${body}` : ""}`,
    );
  }

  return (await response.json()) as T;
}

export function fetchUsers() {
  return taskmanagerFetch<ApiUser[]>("/users", "users");
}

export function searchUsers(term: string) {
  const query = new URLSearchParams({ term });
  return taskmanagerFetch<ApiUser[]>(`/users/search?${query}`, "users");
}

export function fetchTechnologies() {
  return taskmanagerFetch<ApiTechnologyCatalog>("/technologies", "users");
}

export function fetchProjects(params?: { id?: number; username?: string }) {
  const query = new URLSearchParams();
  if (params?.id != null) query.set("id", String(params.id));
  if (params?.username) query.set("username", params.username);
  const suffix = query.size > 0 ? `?${query}` : "";
  return taskmanagerFetch<ApiProject[]>(`/projects${suffix}`, "projects");
}

export function fetchProjectById(id: number) {
  return taskmanagerFetch<ApiProject>(`/projects/${id}`, "projects");
}

export async function probeTaskmanager(): Promise<boolean> {
  try {
    await fetchUsers();
    return true;
  } catch {
    return false;
  }
}
