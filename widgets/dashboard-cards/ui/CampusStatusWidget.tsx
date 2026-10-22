"use client";

import { useCrmOverview } from "@/lib/crm/useCrmOverview";
import type { WidgetCategory } from "@/lib/layout/types";
import { WidgetFrame } from "./WidgetFrame";

const toneClass = {
  ok: "bg-ok/15 text-ok",
  warn: "bg-primary/12 text-primary",
  critical: "bg-critical/15 text-critical",
};

type CampusStatusWidgetProps = {
  title?: string;
  category?: WidgetCategory;
};

export function CampusStatusWidget({ title, category }: CampusStatusWidgetProps) {
  const crm = useCrmOverview();
  const statuses =
    crm.status === "ready"
      ? crm.data.services
      : [
          { label: "База проектов ИТС", value: "Загрузка…", tone: "warn" as const },
          { label: "ФИН Помощник", value: "Доступен", tone: "ok" as const },
          { label: "Карта корпусов", value: "На проверке", tone: "warn" as const },
        ];

  return (
    <WidgetFrame title={title ?? "Состояние сервисов"} category={category}>
      <ul className="flex h-full flex-col justify-between gap-3">
        {statuses.map((status) => (
          <li
            key={status.label}
            className="flex items-center justify-between gap-3"
          >
            <span className="text-sm text-fg-muted sm:text-base">
              {status.label}
            </span>
            <span
              className={`px-2.5 py-1 text-xs font-medium sm:text-sm ${toneClass[status.tone]}`}
            >
              {status.value}
            </span>
          </li>
        ))}
      </ul>
    </WidgetFrame>
  );
}
