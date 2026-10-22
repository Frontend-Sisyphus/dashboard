import type { WidgetCategory } from "@/lib/layout/types";
import { WidgetFrame } from "./WidgetFrame";

const slots = [
  { time: "09:00", title: "Алгоритмы и структуры данных", place: "А-312" },
  { time: "10:40", title: "Проектирование интерфейсов", place: "Лаборатория ИТС" },
  { time: "12:20", title: "Базы данных", place: "Б-201" },
];

type ScheduleWidgetProps = {
  title?: string;
  category?: WidgetCategory;
};

export function ScheduleWidget({ title, category }: ScheduleWidgetProps) {
  return (
    <WidgetFrame title={title ?? "Расписание сегодня"} category={category}>
      <ul className="flex h-full flex-col gap-1 overflow-auto">
        {slots.map((slot, index) => (
          <li
            key={slot.time}
            className={`grid grid-cols-[4.25rem_1fr] gap-3 rounded-[var(--radius-control)] px-2 py-2.5 ${
              index === 1 ? "bg-muted/70" : ""
            }`}
          >
            <span className="heimdall-kpi pt-0.5 text-base text-primary sm:text-lg">
              {slot.time}
            </span>
            <div>
              <p className="text-sm font-medium leading-snug sm:text-base">
                {slot.title}
              </p>
              <p className="mt-1 text-xs text-fg-muted sm:text-sm">{slot.place}</p>
            </div>
          </li>
        ))}
      </ul>
    </WidgetFrame>
  );
}
