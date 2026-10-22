"use client";

import { useCrmOverview } from "@/lib/crm/useCrmOverview";
import { itcLinks } from "@/lib/itc/links";
import type { WidgetCategory } from "@/lib/layout/types";
import { WidgetFrame } from "./WidgetFrame";

type MediaFeedWidgetProps = {
  title?: string;
  category?: WidgetCategory;
};

export function MediaFeedWidget({ title, category }: MediaFeedWidgetProps) {
  const crm = useCrmOverview();
  const members =
    crm.status === "ready" ? crm.data.members.slice(0, 8) : [];

  return (
    <WidgetFrame title={title ?? "Участники ИТС"} category={category}>
      <div className="flex h-full min-h-0 flex-col gap-3">
        {members.length > 0 ? (
          <ul className="grid grid-cols-4 gap-2 sm:grid-cols-8">
            {members.map((member) => (
              <li
                key={member.id}
                className="flex flex-col items-center gap-1.5 text-center"
                title={`${member.name} · ${member.role}`}
              >
                {member.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={member.photoUrl}
                    alt=""
                    className="h-10 w-10 object-cover sm:h-12 sm:w-12"
                  />
                ) : (
                  <span className="grid h-10 w-10 place-items-center bg-primary/15 text-[0.65rem] font-medium text-primary sm:h-12 sm:w-12 sm:text-xs">
                    {member.initials}
                  </span>
                )}
                <span className="line-clamp-1 w-full text-[10px] text-fg-muted">
                  {member.name.split(" ")[0]}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-fg-muted">
            {crm.status === "loading"
              ? "Загружаем участников…"
              : "Участники появятся, когда ответит база ИТС"}
          </p>
        )}

        <ul className="mt-auto flex flex-col gap-2">
          <li>
            <a
              href={itcLinks.itcTelegram}
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-border bg-muted/40 p-3 transition hover:border-primary/40 hover:bg-elevated"
            >
              <p className="text-sm font-medium">ИТС публикации</p>
              <p className="mt-0.5 text-xs text-fg-muted">
                Темы об информатике простым языком от команды сообщества
              </p>
            </a>
          </li>
          <li>
            <a
              href={itcLinks.itcSite}
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-border bg-muted/40 p-3 transition hover:border-primary/40 hover:bg-elevated"
            >
              <p className="text-sm font-medium">Сайт сообщества</p>
              <p className="mt-0.5 text-xs text-fg-muted">
                Направления, проекты и как вступить в ИТС
              </p>
            </a>
          </li>
        </ul>
      </div>
    </WidgetFrame>
  );
}
