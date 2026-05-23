import PageHero from "@/components/PageHero";
import FeaturedProducts from "@/components/FeaturedProducts";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { pageImages } from "@/lib/content/images";

export const metadata = {
  title: "Shop | Elemen India",
  description: "Browse security, CCTV, and IT products from Elemen India.",
};

export default function ShopPage() {
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
        <FeaturedProducts />
      </ScrollReveal>
    </main>
  );
}
