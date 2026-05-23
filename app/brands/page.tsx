import PageHero from "@/components/PageHero";
import BrandsShowcase from "@/components/BrandsShowcase";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { pageImages } from "@/lib/content/images";

export const metadata = {
  title: "Brands | Elemen India",
  description:
    "Authorized dealer for Bosch, Hikvision, Honeywell, Dell, and leading security & IT brands.",
};

export default function BrandsPage() {
  return (
    <main>
      <PageHero
        title="Brands"
        subtitle="Trusted partnerships powering every solution we deliver."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Brands" }]}
        imageSrc={pageImages.brands}
        imageAlt="Technology and security brand partnerships"
      />

      <section
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "48px 20px 80px",
        }}
      >
        <ScrollReveal variant="fade-up">
          <p
            style={{
              fontSize: 16,
              color: "var(--text-mid)",
              lineHeight: 1.9,
              marginBottom: 40,
              maxWidth: 720,
            }}
          >
            Elemen India is an authorized dealer and service provider for leading
            global brands across access control, CCTV, fire alarm, and IT
            infrastructure. We deliver genuine products with professional
            installation and after-sales support.
          </p>
        </ScrollReveal>

        <BrandsShowcase />
      </section>
    </main>
  );
}
