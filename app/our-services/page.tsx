import PageHero from "@/components/PageHero";
import ContentCard from "@/components/ContentCard";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { ScrollStagger, ScrollStaggerItem } from "@/components/motion/ScrollReveal";
import { staggerVariantAt } from "@/lib/motion-presets";
import { pageImages } from "@/lib/content/images";
import { listPublicServices } from "@/lib/public-services";

export const metadata = {
  title: "Our Services | Elemen India",
  description:
    "Access control, CCTV, visitor management, IT infrastructure, and more.",
};

export default function OurServicesPage() {
  const services = listPublicServices();

  return (
    <main>
      <PageHero
        title="Our Services"
        subtitle="Comprehensive security and facility management solutions."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Our Services" }]}
        imageSrc={pageImages.ourServices}
        imageAlt="Security and surveillance systems installation"
      />
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 20px 80px" }}>
        <ScrollReveal variant="fade-left">
          <p
            style={{
              fontSize: 15,
              color: "var(--text-mid)",
              lineHeight: 1.9,
              marginBottom: 36,
            }}
          >
            Elemen India delivers end-to-end solutions across physical security,
            workforce management, networking, and IT infrastructure — tailored to
            your facility and compliance needs.
          </p>
        </ScrollReveal>
        <ScrollStagger
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{ gap: 24 }}
          stagger={0.07}
        >
          {services.map((service, i) => (
            <ScrollStaggerItem key={service.slug} variant={staggerVariantAt(i)}>
              <ContentCard
                href={`/our-services/${service.slug}`}
                title={service.title}
                imageSrc={service.imageUrl}
                imageAlt={service.title}
                index={i + 1}
              />
            </ScrollStaggerItem>
          ))}
        </ScrollStagger>
      </section>
    </main>
  );
}
