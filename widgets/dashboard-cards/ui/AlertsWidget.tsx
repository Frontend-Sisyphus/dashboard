import type { WidgetCategory } from "@/lib/layout/types";
import { WidgetFrame } from "./WidgetFrame";

const alerts = [
  { level: "warn" as const, text: "Очередь в столовой выше нормы" },
  { level: "ok" as const, text: "Все критичные сервисы в норме" },
  { level: "critical" as const, text: "Лифт корпуса Б на обслуживании" },
];

const levelDot = {
  ok: "bg-ok",
  warn: "bg-warn",
  critical: "bg-critical",
};

type AlertsWidgetProps = {
  title?: string;
  category?: WidgetCategory;
};

export function AlertsWidget({ title, category }: AlertsWidgetProps) {
  return (
    <WidgetFrame title={title} category={category}>
      <ul className="flex h-full flex-col gap-3 overflow-auto">
        {alerts.map((alert) => (
          <li
            key={alert.text}
            className="flex gap-3 bg-muted/60 p-3 text-sm leading-snug sm:text-base"
          >
            <span
              className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${levelDot[alert.level]}`}
              aria-hidden
            />
            <span>{alert.text}</span>
          </li>
        ))}
      </ul>
    </WidgetFrame>
  );
}
