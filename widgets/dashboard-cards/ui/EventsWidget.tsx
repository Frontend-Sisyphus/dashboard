"use client";

import { useCrmOverview } from "@/lib/crm/useCrmOverview";
import { communityTracks } from "@/lib/itc/tracks";
import type { WidgetCategory } from "@/lib/layout/types";
import { WidgetFrame } from "./WidgetFrame";

type EventsWidgetProps = {
  title?: string;
  category?: WidgetCategory;
};

export function EventsWidget({ title, category }: EventsWidgetProps) {
  const crm = useCrmOverview();
  const tracks =
    crm.status === "ready" ? crm.data.tracks : communityTracks;

  return (
    <WidgetFrame title={title ?? "Направления сообщества"} category={category}>
      <ul className="grid h-full gap-3 sm:grid-cols-3">
        {tracks.map((track) => (
          <li
            key={track.id}
            className="flex flex-col border border-border bg-muted/40 p-3.5 sm:p-4"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-primary/12 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.08em] text-primary">
                {track.kicker}
              </span>
            </div>
            <p className="mt-2 text-base font-medium leading-snug sm:text-lg">
              {track.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">
              {track.text}
            </p>
          </li>
        ))}
      </ul>
    </WidgetFrame>
  );
}
