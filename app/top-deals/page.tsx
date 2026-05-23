import PageHero from "@/components/PageHero";
import PromoBanner from "@/components/PromoBanner";
import FeaturedProducts from "@/components/FeaturedProducts";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { pageImages } from "@/lib/content/images";

export const metadata = {
  title: "Top Deals | Elemen India",
  description: "Special offers on CCTV and security packages from Elemen India.",
};

export default function TopDealsPage() {
  return (
    <main>
      <PageHero
        title="Top Deals"
        subtitle="Limited-time offers on CCTV and security installations."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Top Deals" },
        ]}
        imageSrc={pageImages.topDeals}
        imageAlt="CCTV and security special offers"
      />
      <ScrollReveal variant="zoom-in">
        <PromoBanner />
      </ScrollReveal>
      <ScrollReveal variant="fade-up">
        <FeaturedProducts />
      </ScrollReveal>
    </main>
  );
}
