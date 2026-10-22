import { BifrostLogo } from "@/components/brand/BifrostLogo";
import { GjallarhornLogo } from "@/components/brand/GjallarhornLogo";
import { HeimdallLogo } from "@/components/brand/HeimdallLogo";
import type { ProductId } from "@/lib/brand/products";

type ProductLogoProps = {
  product: ProductId;
  className?: string;
};

export function ProductLogo({ product, className }: ProductLogoProps) {
  if (product === "gjallarhorn") {
    return <GjallarhornLogo className={className} title="Gjallarhorn" />;
  }
  if (product === "heimdall") {
    return <HeimdallLogo className={className} title="Heimdall" />;
  }
  return <BifrostLogo className={className} title="Bifröst" />;
}
