import Link from "next/link";
import { ProductLogo } from "@/components/brand/ProductLogo";
import { itcLinks } from "@/lib/itc/links";

export const metadata = {
  title: "Карта корпусов · Bifröst",
  description:
    "Объёмная карта Финуниверситета — проект сообщества ИТС",
};

export default function MapBridgePage() {
  const deployed = Boolean(process.env.NEXT_PUBLIC_FINMAP_URL?.trim());

  return (
    <div className="heimdall-shell min-h-dvh px-4 py-8 sm:px-6 lg:px-10">
      <div className="relative z-[2] mx-auto flex w-full max-w-3xl flex-col gap-6">
        <Link href="/?mode=kiosk" className="heimdall-tag w-fit hover:text-primary">
          ← назад к Bifröst
        </Link>

        <section className="heimdall-panel p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <ProductLogo product="bifrost" className="h-14 w-14 shrink-0" />
            <div>
              <p className="heimdall-tag">проекты · сведения</p>
              <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Карта корпусов
              </h1>
              <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-fg-muted sm:text-base">
                Объёмная карта Финуниверситета: корпуса, этажи, маршруты и
                навигация. Проект сообщества ИТС.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {deployed ? (
              <a
                href={itcLinks.finMap}
                className="heimdall-action inline-flex items-center justify-center px-5 py-3 text-sm font-medium"
              >
                Открыть карту
              </a>
            ) : (
              <div className="border border-border bg-muted/40 px-5 py-3 text-sm text-fg-muted">
                Карта ещё не подключена: задайте адрес веб-версии в настройках
                стенда (
                <code className="font-mono text-primary">
                  NEXT_PUBLIC_FINMAP_URL
                </code>
                ).
              </div>
            )}
            <a
              href={itcLinks.schedulePage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border border-border bg-elevated px-5 py-3 text-sm font-medium transition hover:border-primary/40"
            >
              Расписание · ФИН Помощник
            </a>
          </div>

          <ul className="mt-8 space-y-2 text-sm text-fg-muted">
            <li>• Объёмный вид корпусов</li>
            <li>• Планы этажей и построение маршрутов</li>
            <li>• Связь с внешними навигаторами</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
