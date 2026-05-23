import PageHero from "@/components/PageHero";
import ContentCard from "@/components/ContentCard";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { ScrollStagger, ScrollStaggerItem } from "@/components/motion/ScrollReveal";
import { staggerVariantAt } from "@/lib/motion-presets";
import { industryIntro } from "@/lib/content/industries";
import { pageImages, getIndustryImage } from "@/lib/content/images";
import { industries } from "@/lib/site-pages";

export const metadata = {
  title: "Industry | Elemen India",
  description: "Security and management solutions tailored for your industry.",
};

export default function IndustryPage() {
  return (
    <main>
      <PageHero
        title="Industry"
        subtitle="Solutions tailored for every sector we serve."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Industry" }]}
        imageSrc={pageImages.industry}
        imageAlt="Commercial buildings and industry sectors"
      />
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 20px 80px" }}>
        <ScrollReveal variant="zoom-out">
          <p
            style={{
              fontSize: 15,
              color: "var(--text-mid)",
              lineHeight: 1.9,
              marginBottom: 36,
            }}
          >
            {industryIntro}
          </p>
        </ScrollReveal>
        <ScrollStagger
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{ gap: 24 }}
          stagger={0.08}
        >
          {industries.map((item, i) => (
            <ScrollStaggerItem key={item.slug} variant={staggerVariantAt(i + 2)}>
              <ContentCard
                href={`/industry/${item.slug}`}
                title={item.label}
                imageSrc={getIndustryImage(item.slug)}
                imageAlt={item.label}
                index={i + 1}
              />
            </ScrollStaggerItem>
          ))}
        </ScrollStagger>
      </section>
    </main>
  );
}
