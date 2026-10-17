"use client";

import { useCrmOverview } from "@/lib/crm/useCrmOverview";
import { itcProjects } from "@/lib/itc/projects";
import {
  projectStatusLabel,
  type ProjectStatus,
} from "@/lib/taskmanager/map";
import type { WidgetCategory } from "@/lib/layout/types";
import { WidgetFrame } from "./WidgetFrame";

const statusTone: Record<ProjectStatus, string> = {
  live: "bg-ok/15 text-ok",
  beta: "bg-primary/15 text-primary",
  development: "bg-blue/15 text-blue",
  paused: "bg-warn/15 text-warn",
  completed: "bg-muted text-fg-muted",
  unknown: "bg-muted text-fg-muted",
};

type ProjectsStatusWidgetProps = {
  title?: string;
  category?: WidgetCategory;
};

export function ProjectsStatusWidget({
  title,
  category,
}: ProjectsStatusWidgetProps) {
  const crm = useCrmOverview();
  const live = crm.status === "ready" ? crm.data.projects : [];
  const projects =
    live.length > 0
      ? live
      : itcProjects.map((p) => ({
          id: p.id,
          name: p.name,
          summary: p.summary,
          status: p.status as ProjectStatus,
          stack: [] as string[],
          membersCount: 0,
          href: p.href,
        }));

  return (
    <WidgetFrame title={title ?? "Проекты сообщества"} category={category}>
      {crm.status === "loading" && live.length === 0 ? (
        <p className="text-sm text-fg-muted">Загружаем проекты из базы ИТС…</p>
      ) : (
        <ul className="grid h-full gap-2 overflow-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((project) => {
            const href = "href" in project ? project.href : undefined;
            const body = (
              <>
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium sm:text-base">
                    {project.name}
                  </p>
                  <span
                    className={`shrink-0 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.08em] ${statusTone[project.status]}`}
                  >
                    {projectStatusLabel[project.status]}
                  </span>
                </div>
                <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-fg-muted sm:text-sm">
                  {project.summary}
                </p>
                {project.membersCount > 0 || project.stack.length > 0 ? (
                  <p className="mt-2 text-[10px] uppercase tracking-[0.08em] text-fg-muted">
                    {project.membersCount > 0
                      ? `${project.membersCount} в команде`
                      : null}
                    {project.membersCount > 0 && project.stack.length > 0
                      ? " · "
                      : null}
                    {project.stack.slice(0, 3).join(" · ")}
                  </p>
                ) : null}
              </>
            );

            const className =
              "block border border-border bg-muted/35 p-3 transition hover:border-primary/40 hover:bg-elevated sm:p-3.5";

            return (
              <li key={project.id}>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className={className}
                  >
                    {body}
                  </a>
                ) : (
                  <div className={className}>{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </WidgetFrame>
  );
}
