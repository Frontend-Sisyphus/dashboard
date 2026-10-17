import type { LayoutConfig } from "./types";

/**
 * Default modular layouts — widgets are grouped by category in the main screen.
 * Admin will later mutate visibility + grid position within a category.
 */
export const defaultLayoutConfig: LayoutConfig = {
  version: 1,
  layouts: {
    kiosk: {
      mode: "kiosk",
      columns: "repeat(6, minmax(0, 1fr))",
      rows: "auto",
      widgets: [
        // —— Информационные ——
        {
          id: "kiosk-welcome",
          type: "welcome",
          title: "Bifröst",
          category: "info",
          visible: true,
          position: { col: 1, row: 1, colSpan: 4, rowSpan: 1 },
        },
        {
          id: "kiosk-clock",
          type: "clock",
          category: "info",
          visible: true,
          position: { col: 5, row: 1, colSpan: 2, rowSpan: 1 },
        },
        {
          id: "kiosk-actions",
          type: "quick-actions",
          title: "Быстрый доступ",
          category: "info",
          visible: true,
          position: { col: 1, row: 2, colSpan: 6, rowSpan: 1 },
        },
        {
          id: "kiosk-schedule",
          type: "schedule",
          title: "Расписание сегодня",
          category: "info",
          visible: true,
          position: { col: 1, row: 3, colSpan: 3, rowSpan: 1 },
        },
        {
          id: "kiosk-status",
          type: "campus-status",
          title: "Состояние сервисов",
          category: "info",
          visible: true,
          position: { col: 4, row: 3, colSpan: 3, rowSpan: 1 },
        },
        // —— Направления ——
        {
          id: "kiosk-events",
          type: "events",
          title: "Направления ИТС",
          category: "events",
          visible: true,
          position: { col: 1, row: 1, colSpan: 6, rowSpan: 1 },
        },
        // —— Сообщество ——
        {
          id: "kiosk-media",
          type: "media-feed",
          title: "Участники ИТС",
          category: "media",
          visible: true,
          position: { col: 1, row: 1, colSpan: 6, rowSpan: 1 },
        },
        // —— Проекты ——
        {
          id: "kiosk-projects",
          type: "projects-status",
          title: "Проекты сообщества",
          category: "projects",
          visible: true,
          position: { col: 1, row: 1, colSpan: 6, rowSpan: 1 },
        },
      ],
    },
    stats: {
      mode: "stats",
      columns: "repeat(12, minmax(0, 1fr))",
      rows: "auto",
      widgets: [
        // —— Информационные ——
        {
          id: "stats-welcome",
          type: "welcome",
          title: "Heimdall",
          category: "info",
          visible: true,
          position: { col: 1, row: 1, colSpan: 9, rowSpan: 1 },
          props: { variant: "ops" },
        },
        {
          id: "stats-clock",
          type: "clock",
          category: "info",
          visible: true,
          position: { col: 10, row: 1, colSpan: 3, rowSpan: 1 },
        },
        {
          id: "stats-kpi",
          type: "kpi-strip",
          title: "Ключевые показатели",
          category: "info",
          visible: true,
          position: { col: 1, row: 2, colSpan: 12, rowSpan: 1 },
        },
        {
          id: "stats-feed",
          type: "live-feed",
          title: "Свежие сведения",
          category: "info",
          visible: true,
          position: { col: 1, row: 3, colSpan: 8, rowSpan: 1 },
        },
        {
          id: "stats-status",
          type: "campus-status",
          title: "Состояние сервисов",
          category: "info",
          visible: true,
          position: { col: 9, row: 3, colSpan: 4, rowSpan: 1 },
        },
        // —— Направления ——
        {
          id: "stats-events",
          type: "events",
          title: "Направления",
          category: "events",
          visible: true,
          position: { col: 1, row: 1, colSpan: 12, rowSpan: 1 },
        },
        // —— Сообщество ——
        {
          id: "stats-media",
          type: "media-feed",
          title: "Участники",
          category: "media",
          visible: true,
          position: { col: 1, row: 1, colSpan: 12, rowSpan: 1 },
        },
        // —— Проекты ——
        {
          id: "stats-projects",
          type: "projects-status",
          title: "Проекты сообщества",
          category: "projects",
          visible: true,
          position: { col: 1, row: 1, colSpan: 12, rowSpan: 1 },
        },
      ],
    },
  },
};
