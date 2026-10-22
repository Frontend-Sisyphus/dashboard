export interface BootQuote {
  text: string;
  source: string;
}

/**
 * Цитаты для Bifröst (студенчество, познание, мудрость Эдды)
 */
export const bifrostQuotes: BootQuote[] = [
  {
    text: "Мудр тот, кто многое спрашивает и многое узнаёт.",
    source: "Старшая Эдда · Речи Высокого",
  },
  {
    text: "Знание — сила, если им умеют пользоваться.",
    source: "Фрэнсис Бэкон",
  },
  {
    text: "Воображение важнее знания. Знание ограничено, воображение охватывает весь мир.",
    source: "Альберт Эйнштейн",
  },
  {
    text: "Наука — это организованное знание. Мудрость — это организованная жизнь.",
    source: "Иммануил Кант",
  },
  {
    text: "Чем больше я узнаю, тем больше понимаю, сколько ещё не знаю.",
    source: "по мотивам Сократа",
  },
  {
    text: "Сначала научись быть полезным — потом удивляй мир.",
    source: "по мотивам Речей Высокого",
  },
];

/**
 * Цитаты для Heimdall (наблюдение за сообществом, стража моста)
 */
export const heimdallQuotes: BootQuote[] = [
  {
    text: "Хеймдалль видит на сто переходов вперёд и слышит, как растёт трава.",
    source: "Младшая Эдда · о страже Биврёста",
  },
  {
    text: "Друг о друге должны помнить друзья и обмениваться дарами.",
    source: "Старшая Эдда · Речи Высокого",
  },
  {
    text: "Кто контролирует прошлое, тот контролирует будущее.",
    source: "Джордж Оруэлл · 1984",
  },
  {
    text: "Свобода — это возможность сказать, что два плюс два — четыре.",
    source: "Джордж Оруэлл · 1984",
  },
];

/**
 * Цитаты для Gjallarhorn (SRE, надежность, телеметрия, мониторинг)
 */
export const gjallarhornQuotes: BootQuote[] = [
  {
    text: "Надежда — это не стратегия управления инцидентами.",
    source: "Google SRE (Site Reliability Engineering)",
  },
  {
    text: "Всё падает постоянно. Вопрос лишь в том, насколько быстро ты услышишь сигнал тревоги.",
    source: "Вернер Фогельс · CTO Amazon",
  },
  {
    text: "Узнай о сбое из телеметрии за секунды, а не из сообщений пользователей через час.",
    source: "Принцип превентивного мониторинга ИТС",
  },
  {
    text: "Сложные системы не бывают абсолютно исправны — они лишь непрерывно компенсируют ошибки.",
    source: "Ричард Кук · How Complex Systems Fail",
  },
  {
    text: "Если ты не можешь это измерить — ты не можешь этим управлять.",
    source: "Питер Друкер",
  },
  {
    text: "Автоматизируй всё, что повторяется больше одного раза.",
    source: "Google SRE Principles",
  },
  {
    text: "Инцидент — это не провал, а непреднамеренный стресс-тест архитектуры.",
    source: "John Allspaw · Adaptive Capacity",
  },
  {
    text: "Бюджет ошибок существует для того, чтобы двигаться вперед, не жертвуя стабильностью.",
    source: "SRE Error Budgets",
  },
  {
    text: "Голос рога Гьяллархорн предупреждает задолго до того, как упадет последний сервер.",
    source: "Гьяллархорн · Дозор ИТС",
  },
  {
    text: "Мониторинг должен говорить не о том, что сломалось внутри, а о том, страдают ли пользователи.",
    source: "Симптоматический мониторинг · Google SRE",
  },
];

export const bootQuotes: BootQuote[] = [
  ...bifrostQuotes,
  ...heimdallQuotes,
  ...gjallarhornQuotes,
];

export function pickBootQuote(mode?: string, seed = Date.now()): BootQuote {
  let pool = bootQuotes;
  if (mode === "monitoring" || mode === "gjallarhorn") {
    pool = gjallarhornQuotes;
  } else if (mode === "stats" || mode === "heimdall") {
    pool = heimdallQuotes;
  } else if (mode === "kiosk" || mode === "bifrost") {
    pool = bifrostQuotes;
  }

  const index = Math.abs(seed) % pool.length;
  return pool[index]!;
}
