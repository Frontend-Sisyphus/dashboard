import type { AppMode } from "@/lib/layout/types";

export type ProductId = "bifrost" | "heimdall";

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
 * Две стороны одной пары из Эдды:
 * Биврёст — мост для студентов (сведения и сервисы).
 * Хеймдалль — страж моста (наблюдение и сводки).
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
    gloss: "наблюдение",
    tagline: "страж моста · сводки ИТС",
    loadingLine: "стража на посту…",
    welcomeTitle: "Heimdall",
    welcomeBody:
      "Страж Bifröst: участники, проекты и состояние сервисов ИТС на одном экране наблюдения.",
    statusPill: "наблюдение ведётся",
  },
};

export function productForMode(mode: AppMode): ProductBrand {
  return mode === "stats" ? products.heimdall : products.bifrost;
}
