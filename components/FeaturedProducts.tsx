import ProductsCatalog from "@/components/ProductsCatalog";
import type { ProductItem } from "@/lib/catalog-types";

type Props = {
  products: ProductItem[];
};

export default function FeaturedProducts({ products }: Props) {
  return (
    <ProductsCatalog
      products={products}
      showViewAllLink
      showPrice={false}
      showFilters
    />
  );
}
