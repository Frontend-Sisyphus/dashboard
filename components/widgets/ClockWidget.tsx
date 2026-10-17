"use client";

import { useEffect, useState } from "react";
import type { WidgetCategory } from "@/lib/layout/types";
import { WidgetFrame } from "./WidgetFrame";

function formatNow(date: Date) {
  return {
    time: new Intl.DateTimeFormat("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date),
    date: new Intl.DateTimeFormat("ru-RU", {
      weekday: "short",
      day: "numeric",
      month: "long",
    }).format(date),
  };
}

type ClockWidgetProps = {
  category?: WidgetCategory;
};

export function ClockWidget({ category }: ClockWidgetProps) {
  const [now, setNow] = useState(() => formatNow(new Date()));

  useEffect(() => {
    const tick = () => setNow(formatNow(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <WidgetFrame category={category} compact>
      <div className="flex h-full flex-col items-end justify-center text-right">
        <p className="heimdall-kpi text-4xl font-medium text-foreground sm:text-5xl lg:text-[3.4rem]">
          {now.time}
        </p>
        <p className="mt-2 text-sm capitalize text-fg-muted sm:text-base">
          {now.date}
        </p>
      </div>
    </WidgetFrame>
  );
}
