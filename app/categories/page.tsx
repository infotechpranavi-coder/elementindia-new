import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { pageImages } from "@/lib/content/images";
import Link from "next/link";
import { listPublicServices } from "@/lib/public-services";

export const metadata = {
  title: "Categories | Elemen India",
  description: "Browse security and IT solutions by category.",
};

export default function CategoriesPage() {
  const services = listPublicServices();

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
      <section style={{ padding: "40px 20px 10px", maxWidth: 1300, margin: "0 auto" }}>
        <ScrollReveal variant="fade-up">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 16 }}>
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/our-services/${service.slug}`}
                style={{
                  textDecoration: "none",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  overflow: "hidden",
                  background: "#fff",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  style={{ width: "100%", height: 170, objectFit: "cover" }}
                />
                <div style={{ padding: 14 }}>
                  <h3 style={{ margin: "0 0 8px", color: "var(--navy)", fontSize: 18 }}>
                    {service.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: 14, color: "var(--text-mid)" }}>{service.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </section>
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
