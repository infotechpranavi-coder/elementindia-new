import { notFound } from "next/navigation";
import ContentPage from "@/components/ContentPage";
import ProductsCatalog from "@/components/ProductsCatalog";
import { pageImages } from "@/lib/content/images";
import { productMatchesCategory } from "@/lib/product-category-match";
import { listProducts } from "@/lib/server/catalog-store";
import { getProductCategoryBySlug } from "@/lib/server/product-categories-store";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ q?: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const category = await getProductCategoryBySlug(slug);
  if (!category) return { title: "Products | Elemen India" };
  return {
    title: `${category.name} Products | Elemen India`,
    description: category.description || `${category.name} products from Elemen India.`,
  };
}

export default async function ProductCategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { q } = await searchParams;
  const category = await getProductCategoryBySlug(slug);
  if (!category) notFound();

  const allProducts = await listProducts();
  const products = allProducts.filter((product) => productMatchesCategory(product, category));

  return (
    <ContentPage
      title={category.name}
      subtitle={category.description || `Browse our ${category.name} product range.`}
      wrapContent={false}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: category.name },
      ]}
      heroImage={{
        src: pageImages.products,
        alt: `${category.name} products`,
      }}
    >
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 20px 80px" }}>
        <ProductsCatalog
          products={products}
          showHeader={false}
          showFilters={false}
          showPrice={false}
          largeCards
          layout="grid"
          searchQuery={q ?? ""}
        />
        {products.length === 0 ? (
          <p style={{ color: "var(--text-mid)", textAlign: "center", marginTop: 24 }}>
            No products in this category yet.
          </p>
        ) : null}
      </div>
    </ContentPage>
  );
}
