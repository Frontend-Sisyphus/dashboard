import type { WidgetCategory } from "@/lib/layout/types";
import { WidgetFrame } from "./WidgetFrame";

const items = [
  "ФИН Помощник: актуальное расписание в мессенджерах, поддержка ИТС.",
  "Карта корпусов: этажи и маршруты между зданиями Финуниверситета.",
  "Канал «ИТС публикации»: темы об информатике простым языком.",
];

type AnnouncementsWidgetProps = {
  title?: string;
  category?: WidgetCategory;
};

export function AnnouncementsWidget({
  title,
  category,
}: AnnouncementsWidgetProps) {
  return (
    <WidgetFrame title={title ?? "Сделано участниками ИТС"} category={category}>
      <ul className="flex h-full flex-col gap-2.5 overflow-auto">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 px-1 py-1.5 text-sm leading-relaxed sm:text-[0.95rem]"
          >
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
              aria-hidden
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </WidgetFrame>
  );
}
