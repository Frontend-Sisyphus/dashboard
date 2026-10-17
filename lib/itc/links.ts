/**
 * Public ITC / FA service links.
 * FinMap deploy URL can be overridden via NEXT_PUBLIC_FINMAP_URL.
 */
export const itcLinks = {
  /** Official schedule hub (ITC-supported «ФИН Помощник») */
  schedulePage: "https://www.fa.ru/for-students/schedule/",
  /** Telegram schedule assistant */
  scheduleBot: "https://t.me/financialuniversitybot",
  /** ITC community page */
  itcOfficial: "https://www.fa.ru/for-students/itc/",
  /** ITC marketing site */
  itcSite: "https://itc-site-theta.vercel.app/",
  /** Telegram community channel */
  itcTelegram: "https://t.me/itc_teams",
  /**
   * 3D campus map (FinMap). Set NEXT_PUBLIC_FINMAP_URL when deployed;
   * otherwise Heimdall opens the local bridge page.
   */
  finMap:
    process.env.NEXT_PUBLIC_FINMAP_URL?.trim() || "/map",
} as const;
