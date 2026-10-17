import type { ReactNode } from "react";
import type { WidgetCategory } from "@/lib/layout/types";

type WidgetFrameProps = {
  title?: string;
  category?: WidgetCategory;
  children: ReactNode;
  className?: string;
  compact?: boolean;
};

export function WidgetFrame({
  title,
  category,
  children,
  className = "",
  compact = false,
}: WidgetFrameProps) {
  return (
    <section
      className={`heimdall-panel flex h-full min-h-0 flex-col ${compact ? "p-3.5 sm:p-4" : "p-4 sm:p-5 lg:p-6"} ${className}`}
      data-category={category}
    >
      {title ? (
        <header className="mb-3 sm:mb-4">
          <h2 className="text-[0.7rem] font-medium uppercase tracking-[0.14em] text-fg-muted sm:text-xs">
            {title}
          </h2>
        </header>
      ) : null}
      <div className="min-h-0 flex-1">{children}</div>
    </section>
  );
}
