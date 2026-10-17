import type { CSSProperties } from "react";
import { defaultLayoutConfig } from "./defaults";
import type {
  AppMode,
  LayoutConfig,
  ModeLayout,
  WidgetCategory,
  WidgetInstance,
} from "./types";

/** Display order of category sections on the main screen */
export const categorySectionOrder: WidgetCategory[] = [
  "info",
  "events",
  "media",
  "projects",
];

export function getLayoutConfig(): LayoutConfig {
  // Later: fetch from admin API / CMS
  return defaultLayoutConfig;
}

export function getModeLayout(
  mode: AppMode,
  config: LayoutConfig = getLayoutConfig(),
): ModeLayout {
  return config.layouts[mode];
}

export function getVisibleWidgets(layout: ModeLayout): WidgetInstance[] {
  return layout.widgets.filter((widget) => widget.visible);
}

export type CategorySection = {
  category: WidgetCategory;
  widgets: WidgetInstance[];
};

/** Group visible widgets into ordered category sections for the main layout */
export function getCategorySections(layout: ModeLayout): CategorySection[] {
  const visible = getVisibleWidgets(layout);
  return categorySectionOrder
    .map((category) => ({
      category,
      widgets: visible
        .filter((widget) => widget.category === category)
        .sort((a, b) => {
          if (a.position.row !== b.position.row) {
            return a.position.row - b.position.row;
          }
          return a.position.col - b.position.col;
        }),
    }))
    .filter((section) => section.widgets.length > 0);
}

/** Positions relative to the first row of the section */
export function sectionPositionStyle(widget: WidgetInstance): CSSProperties {
  const { col, row, colSpan, rowSpan } = widget.position;
  return {
    gridColumn: `${col} / span ${colSpan}`,
    gridRow: `${row} / span ${rowSpan}`,
  };
}

export function sectionRowsTemplate(widgets: WidgetInstance[]): string {
  const maxRow = widgets.reduce(
    (max, widget) =>
      Math.max(max, widget.position.row + widget.position.rowSpan - 1),
    1,
  );
  return `repeat(${maxRow}, minmax(11rem, auto))`;
}
