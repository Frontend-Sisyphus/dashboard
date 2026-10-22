"use client";

import { useCrmOverview } from "@/lib/crm/useCrmOverview";
import type { WidgetCategory } from "@/lib/layout/types";
import { WidgetFrame } from "./WidgetFrame";

type LiveFeedWidgetProps = {
  title?: string;
  category?: WidgetCategory;
};

export function LiveFeedWidget({ title, category }: LiveFeedWidgetProps) {
  const crm = useCrmOverview();
  const feed =
    crm.status === "ready"
      ? crm.data.feed
      : [{ time: "…", text: "Подключаемся к базе ИТС…" }];

  return (
    <WidgetFrame title={title ?? "Свежие сведения"} category={category}>
      <ul className="flex h-full flex-col gap-1 overflow-auto">
        {feed.map((item) => (
          <li
            key={`${item.time}-${item.text}`}
            className="grid grid-cols-[4.5rem_1fr] gap-3 px-2 py-2.5 text-sm sm:text-base"
          >
            <span className="truncate font-mono text-primary">{item.time}</span>
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </WidgetFrame>
  );
}
