import type { WidgetCategory } from "@/lib/layout/types";
import { WidgetFrame } from "./WidgetFrame";

const rooms = [
  { name: "Лаборатория ИТС", load: 86 },
  { name: "Общая зона", load: 62 },
  { name: "Библиотека", load: 71 },
  { name: "Холл корпуса А", load: 28 },
];

type OccupancyWidgetProps = {
  title?: string;
  category?: WidgetCategory;
};

export function OccupancyWidget({ title, category }: OccupancyWidgetProps) {
  return (
    <WidgetFrame title={title} category={category}>
      <ul className="flex h-full flex-col justify-between gap-3">
        {rooms.map((room) => (
          <li key={room.name}>
            <div className="mb-1.5 flex items-baseline justify-between gap-2">
              <span className="text-sm sm:text-base">{room.name}</span>
              <span className="heimdall-kpi text-sm text-primary sm:text-base">
                {room.load}%
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-accent"
                style={{
                  width: `${room.load}%`,
                  background:
                    room.load > 80
                      ? "linear-gradient(90deg, var(--heimdall-accent), var(--heimdall-primary))"
                      : undefined,
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </WidgetFrame>
  );
}
