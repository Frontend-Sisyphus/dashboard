export type AppMode = "kiosk" | "stats" | "monitoring";

/** Content categories — widgets are grouped into layout sections by this */
export type WidgetCategory = "info" | "media" | "events" | "projects";

export type WidgetType =
  | "welcome"
  | "quick-actions"
  | "schedule"
  | "announcements"
  | "events"
  | "campus-status"
  | "kpi-strip"
  | "attendance"
  | "occupancy"
  | "live-feed"
  | "alerts"
  | "clock"
  | "projects-status"
  | "media-feed"
  | "category-rail";

export interface GridPosition {
  /** 1-based column start */
  col: number;
  /** 1-based row start */
  row: number;
  colSpan: number;
  rowSpan: number;
}

export interface WidgetInstance {
  id: string;
  type: WidgetType;
  title?: string;
  /** Block category — groups widgets into main layout sections */
  category: WidgetCategory;
  visible: boolean;
  position: GridPosition;
  /** Optional per-widget props for future admin config */
  props?: Record<string, unknown>;
}

export interface ModeLayout {
  mode: AppMode;
  /** CSS grid template columns, e.g. "repeat(4, 1fr)" */
  columns: string;
  /** CSS grid template rows */
  rows: string;
  widgets: WidgetInstance[];
}

export interface LayoutConfig {
  version: 1;
  /** Active layouts keyed by mode — admin will edit these later */
  layouts: Record<AppMode, ModeLayout>;
}

export const widgetCategoryLabel: Record<WidgetCategory, string> = {
  info: "Сведения",
  media: "Сообщество",
  events: "Направления",
  projects: "Проекты",
};
