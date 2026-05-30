import ContentPage from "@/components/ContentPage";
import ProductsCatalog from "@/components/ProductsCatalog";
import { pageImages } from "@/lib/content/images";
import { listProducts } from "@/lib/server/catalog-store";

export const metadata = {
  title: "Products | Elemen India",
  description:
    "Security, surveillance, and management products from leading brands.",
};

type Props = { searchParams: Promise<{ q?: string }> };

export default async function ProductsPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const products = await listProducts();

  return (
    <ContentPage
      title="Products"
      subtitle="High-quality hardware and software from trusted global brands."
      wrapContent={false}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
      heroImage={{
        src: pageImages.products,
        alt: "Security and surveillance product range",
      }}
    >
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 20px 80px" }}>
        <ProductsCatalog
          products={products}
          showHeader={false}
          showFilters
          showPrice={false}
          largeCards
          layout="grid"
          searchQuery={q ?? ""}
        />
      </div>
    </ContentPage>
  );
}
