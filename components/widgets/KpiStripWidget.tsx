"use client";

import { useCrmOverview } from "@/lib/crm/useCrmOverview";
import type { WidgetCategory } from "@/lib/layout/types";
import { WidgetFrame } from "./WidgetFrame";

type KpiStripWidgetProps = {
  title?: string;
  category?: WidgetCategory;
};

export function KpiStripWidget({ title, category }: KpiStripWidgetProps) {
  const crm = useCrmOverview();
  const kpis =
    crm.status === "ready"
      ? [
          {
            label: "Участники",
            value: String(crm.data.kpis.members),
            delta: "в базе ИТС",
          },
          {
            label: "Проекты",
            value: String(crm.data.kpis.projects),
            delta: "карточки в работе",
          },
          {
            label: "В сети",
            value: String(crm.data.kpis.online),
            delta: "сейчас доступны",
          },
          {
            label: "Технологии",
            value: String(crm.data.kpis.technologies || "—"),
            delta: "в каталоге навыков",
          },
        ]
      : [
          { label: "Участники", value: "…", delta: "загрузка…" },
          { label: "Проекты", value: "…", delta: "загрузка…" },
          { label: "В сети", value: "…", delta: "загрузка…" },
          { label: "Технологии", value: "…", delta: "загрузка…" },
        ];

  return (
    <WidgetFrame title={title ?? "Ключевые показатели"} category={category} compact>
      <div className="grid h-full grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-3.5">
        {kpis.map((kpi) => (
          <article
            key={kpi.label}
            className="flex flex-col justify-between border border-border bg-muted/40 px-3.5 py-3.5 sm:px-4 sm:py-4"
          >
            <p className="text-[0.68rem] uppercase tracking-[0.12em] text-fg-muted">
              {kpi.label}
            </p>
            <p className="heimdall-kpi mt-3 text-3xl font-medium text-foreground sm:text-4xl xl:text-5xl">
              {kpi.value}
            </p>
            <p className="mt-2 text-xs text-fg-muted sm:text-sm">{kpi.delta}</p>
          </article>
        ))}
      </div>
    </WidgetFrame>
  );
}
