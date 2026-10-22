import type { ComponentType } from "react";
import type { WidgetCategory, WidgetType } from "@/lib/layout/types";
import { AlertsWidget } from "./AlertsWidget";
import { AnnouncementsWidget } from "./AnnouncementsWidget";
import { AttendanceWidget } from "./AttendanceWidget";
import { CampusStatusWidget } from "./CampusStatusWidget";
import { ClockWidget } from "./ClockWidget";
import { EventsWidget } from "./EventsWidget";
import { KpiStripWidget } from "./KpiStripWidget";
import { LiveFeedWidget } from "./LiveFeedWidget";
import { MediaFeedWidget } from "./MediaFeedWidget";
import { OccupancyWidget } from "./OccupancyWidget";
import { ProjectsStatusWidget } from "./ProjectsStatusWidget";
import { QuickActionsWidget } from "./QuickActionsWidget";
import { ScheduleWidget } from "./ScheduleWidget";
import { WelcomeWidget } from "./WelcomeWidget";

export type WidgetComponentProps = {
  title?: string;
  category?: WidgetCategory;
  props?: Record<string, unknown>;
};

export const widgetRegistry: Record<
  WidgetType,
  ComponentType<WidgetComponentProps>
> = {
  welcome: WelcomeWidget,
  "quick-actions": QuickActionsWidget,
  schedule: ScheduleWidget,
  announcements: AnnouncementsWidget,
  events: EventsWidget,
  "campus-status": CampusStatusWidget,
  "kpi-strip": KpiStripWidget,
  attendance: AttendanceWidget,
  occupancy: OccupancyWidget,
  "live-feed": LiveFeedWidget,
  alerts: AlertsWidget,
  clock: ClockWidget,
  "projects-status": ProjectsStatusWidget,
  "media-feed": MediaFeedWidget,
  "category-rail": () => null,
};

export function resolveWidget(type: WidgetType) {
  return widgetRegistry[type];
}
