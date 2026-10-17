import { BifrostLogo } from "@/components/brand/BifrostLogo";
import { HeimdallLogo } from "@/components/brand/HeimdallLogo";
import type { ProductId } from "@/lib/brand/products";

type ProductLogoProps = {
  product: ProductId;
  className?: string;
};

export function ProductLogo({ product, className }: ProductLogoProps) {
  if (product === "heimdall") {
    return <HeimdallLogo className={className} title="Heimdall" />;
  }
  return <BifrostLogo className={className} title="Bifröst" />;
}
