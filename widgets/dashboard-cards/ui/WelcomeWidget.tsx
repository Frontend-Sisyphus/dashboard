import { ProductLogo, products } from "@/entities/brand";
import type { WidgetCategory } from "@/shared/lib/layout";
import { WidgetFrame } from "@/shared/ui";

type WelcomeWidgetProps = {
  title?: string;
  category?: WidgetCategory;
  props?: Record<string, unknown>;
};

export function WelcomeWidget({ title, category, props }: WelcomeWidgetProps) {
  const isOps = props?.variant === "ops";
  const product = isOps ? products.heimdall : products.bifrost;
  const headline = title ?? product.welcomeTitle;

  return (
    <WidgetFrame category={category}>
      <div className="flex h-full flex-col justify-center gap-3 sm:gap-4">
        <div className="flex items-center gap-3">
          <ProductLogo
            product={product.id}
            className="h-12 w-12 sm:h-14 sm:w-14"
          />
          <p className="heimdall-pill w-fit">
            <span className="heimdall-pill-dot" aria-hidden />
            {product.statusPill}
          </p>
        </div>
        <h1
          className="heimdall-wordmark font-display max-w-[12ch] text-3xl font-bold leading-[0.95] tracking-[-0.04em] sm:text-4xl lg:text-5xl xl:text-[3.5rem]"
          data-text={headline}
        >
          {headline}
        </h1>
        <p className="max-w-[42ch] text-sm leading-relaxed text-fg-muted sm:text-[0.95rem] sm:leading-6 lg:text-base lg:leading-7">
          {product.welcomeBody}
        </p>
        <p className="heimdall-tag">
          {isOps ? "экран наблюдения ИТС" : "информационный стенд ИТС"}
        </p>
      </div>
    </WidgetFrame>
  );
}
