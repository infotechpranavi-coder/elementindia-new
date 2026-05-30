import PageHero from "@/components/PageHero";
import FeaturedProducts from "@/components/FeaturedProducts";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { pageImages } from "@/lib/content/images";
import { listProducts } from "@/lib/server/catalog-store";

export const metadata = {
  title: "Shop | Elemen India",
  description: "Browse security, CCTV, and IT products from Elemen India.",
};

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const products = await listProducts();

  return (
    <main>
      <PageHero
        title="Shop"
        subtitle="Security, CCTV, access control, and IT products for every facility."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Shop" },
        ]}
        imageSrc={pageImages.shop}
        imageAlt="Security and surveillance products"
      />
      <ScrollReveal variant="fade-left">
        <FeaturedProducts products={products} />
      </ScrollReveal>
    </main>
  );
}
