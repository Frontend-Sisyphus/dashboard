import type { AppMode } from "@/shared/lib/layout";

export type ProductId = "bifrost" | "heimdall" | "gjallarhorn";

export type ProductBrand = {
  id: ProductId;
  mode: AppMode;
  /** Latin wordmark used in UI */
  name: string;
  /** Short subtitle under the switcher */
  gloss: string;
  /** Status line under the wordmark */
  tagline: string;
  /** Boot splash status line */
  loadingLine: string;
  /** Welcome block headline */
  welcomeTitle: string;
  /** Welcome block body */
  welcomeBody: string;
  /** Pill under the logo */
  statusPill: string;
};

/**
 * Три стороны Эдды в цифровой экосистеме ИТС:
 * Биврёст — радужный мост для студентов (сервисы и навигация).
 * Хеймдалль — страж моста (наблюдение за сообществом и сводки).
 * Гьяллархорн — рог стража (мониторинг, пульс серверов и телеметрия проектов).
 */
export const products: Record<ProductId, ProductBrand> = {
  bifrost: {
    id: "bifrost",
    mode: "kiosk",
    name: "Bifröst",
    gloss: "для студентов",
    tagline: "мост к сервисам университета",
    loadingLine: "открываем мост…",
    welcomeTitle: "Bifröst",
    welcomeBody:
      "Мост к цифровым сервисам Финуниверситета: расписание, карта корпусов, события и проекты ИТС — в пару касаний.",
    statusPill: "мост открыт",
  },
  heimdall: {
    id: "heimdall",
    mode: "stats",
    name: "Heimdall",
    gloss: "статистика проектов",
    tagline: "статистика и аналитика проектов ИТС",
    loadingLine: "собираем метрики и прогресс проектов…",
    welcomeTitle: "Heimdall",
    welcomeBody:
      "Страж Bifröst: всесторонняя статистика, прогресс дорожных карт, спринты и инженерные показатели проектов сообщества ИТС.",
    statusPill: "статистика актуальна",
  },
  gjallarhorn: {
    id: "gjallarhorn",
    mode: "monitoring",
    name: "Gjallarhorn",
    gloss: "мониторинг проектов",
    tagline: "мониторинг проектов ИТС",
    loadingLine: "сканируем узлы и службы…",
    welcomeTitle: "Gjallarhorn",
    welcomeBody:
      "Голос рога Хеймдалля: оперативный мониторинг доступности, телеметрия серверов, uptime и активность пользователей проектов ИТС в реальном времени.",
    statusPill: "системы под контролем",
  },
};

export function productForMode(mode: AppMode): ProductBrand {
  if (mode === "monitoring") return products.gjallarhorn;
  return mode === "stats" ? products.heimdall : products.bifrost;
}
