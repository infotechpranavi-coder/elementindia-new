import PageHero from "@/components/PageHero";
import Categories from "@/components/Categories";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { pageImages } from "@/lib/content/images";

export const metadata = {
  title: "Categories | Elemen India",
  description: "Browse security and IT solutions by category.",
};

export default function CategoriesPage() {
  return (
    <main>
      <PageHero
        title="Solution Categories"
        subtitle="CCTV, access control, networking, fire safety, and more."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Categories" },
        ]}
        imageSrc={pageImages.categories}
        imageAlt="Security solution categories"
      />
      <ScrollReveal variant="fade-up">
        <Categories />
      </ScrollReveal>
      <section style={{ padding: "40px 20px 80px", maxWidth: 1300, margin: "0 auto" }}>
        <ScrollReveal variant="fade-right">
          <p style={{ fontSize: 15, color: "var(--text-mid)", lineHeight: 1.8 }}>
            Explore our full range of security and IT solutions — organized by
            application so you can find the right system for your facility.
          </p>
        </ScrollReveal>
      </section>
    </main>
  );
}
