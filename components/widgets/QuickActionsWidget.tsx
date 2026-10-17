import type { ReactNode } from "react";
import { KioskSearch } from "@/components/shell/KioskSearch";
import { itcLinks } from "@/lib/itc/links";
import type { WidgetCategory } from "@/lib/layout/types";
import { WidgetFrame } from "./WidgetFrame";

const icons = {
  schedule: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="5" width="16" height="15" rx="1" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 3v4M16 3v4M4 10h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  map: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 19V9l8-5 8 5v10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 19v-6h6v6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  ),
  bot: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="5" y="8" width="14" height="11" rx="1" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 8V5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="4" r="1.2" fill="currentColor" />
      <circle cx="9" cy="13" r="1.2" fill="currentColor" />
      <circle cx="15" cy="13" r="1.2" fill="currentColor" />
    </svg>
  ),
  site: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 12h16M12 4c2.5 2.8 2.5 13.2 0 16M12 4c-2.5 2.8-2.5 13.2 0 16" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
} satisfies Record<string, ReactNode>;

const actions = [
  {
    id: "schedule",
    label: "Расписание",
    hint: "ФИН Помощник",
    href: itcLinks.schedulePage,
    external: true,
    icon: icons.schedule,
  },
  {
    id: "schedule-bot",
    label: "Помощник",
    hint: "в мессенджере",
    href: itcLinks.scheduleBot,
    external: true,
    icon: icons.bot,
  },
  {
    id: "finmap",
    label: "Карта корпусов",
    hint: "этажи и маршруты",
    href: itcLinks.finMap,
    external: itcLinks.finMap.startsWith("http"),
    icon: icons.map,
  },
  {
    id: "itc",
    label: "ИТС",
    hint: "сообщество",
    href: itcLinks.itcSite,
    external: true,
    icon: icons.site,
  },
];

type QuickActionsWidgetProps = {
  title?: string;
  category?: WidgetCategory;
};

export function QuickActionsWidget({ title, category }: QuickActionsWidgetProps) {
  return (
    <WidgetFrame title={title ?? "Быстрый доступ"} category={category}>
      <div className="flex h-full min-h-0 flex-col gap-3 sm:gap-3.5">
        <KioskSearch fullWidth />
        <div className="grid min-h-0 flex-1 grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-3.5">
          {actions.map((action) => (
            <a
              key={action.id}
              href={action.href}
              target={action.external ? "_blank" : undefined}
              rel={action.external ? "noopener noreferrer" : undefined}
              className="group flex min-h-[6.5rem] flex-col items-start justify-between border border-border bg-muted/45 p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:border-primary/35 hover:bg-elevated hover:shadow-[var(--shadow-panel)] focus-visible:outline-none active:translate-y-0 active:scale-[0.99] sm:min-h-[7.5rem] lg:min-h-[8.5rem] lg:p-5"
            >
              <span className="heimdall-icon-tile transition duration-200 group-hover:scale-105">
                {action.icon}
              </span>
              <span>
                <span className="block text-base font-medium tracking-tight sm:text-lg">
                  {action.label}
                </span>
                <span className="mt-1 block text-sm text-fg-muted">
                  {action.hint}
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </WidgetFrame>
  );
}
