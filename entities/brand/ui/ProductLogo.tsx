import { BifrostLogo } from "./BifrostLogo";
import { GjallarhornLogo } from "./GjallarhornLogo";
import { HeimdallLogo } from "./HeimdallLogo";
import type { ProductId } from "../model/products";

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
