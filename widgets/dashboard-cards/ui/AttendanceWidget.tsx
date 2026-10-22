import type { WidgetCategory } from "@/lib/layout/types";
import { WidgetFrame } from "./WidgetFrame";

const bars = [
  { label: "09", value: 42 },
  { label: "11", value: 68 },
  { label: "13", value: 81 },
  { label: "15", value: 74 },
  { label: "17", value: 55 },
  { label: "19", value: 33 },
];

type AttendanceWidgetProps = {
  title?: string;
  category?: WidgetCategory;
};

export function AttendanceWidget({ title, category }: AttendanceWidgetProps) {
  return (
    <WidgetFrame title={title} category={category}>
      <div className="flex h-full flex-col">
        <p className="heimdall-kpi text-4xl font-medium text-primary sm:text-5xl">
          76%
        </p>
        <p className="mt-1 text-sm text-fg-muted">средняя заполняемость аудиторий</p>
        <div className="mt-6 flex min-h-0 flex-1 items-end gap-2 sm:gap-3">
          {bars.map((bar) => (
            <div key={bar.label} className="flex h-full flex-1 flex-col justify-end gap-2">
              <div
                className="w-full bg-gradient-to-t from-accent to-primary"
                style={{ height: `${bar.value}%` }}
                title={`${bar.value}%`}
              />
              <span className="text-center text-[0.65rem] text-fg-muted sm:text-xs">
                {bar.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </WidgetFrame>
  );
}
