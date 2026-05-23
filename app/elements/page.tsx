import PageHero from "@/components/PageHero";
import Blog from "@/components/Blog";
import Newsletter from "@/components/Newsletter";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { ScrollStagger, ScrollStaggerItem } from "@/components/motion/ScrollReveal";
import { pageImages } from "@/lib/content/images";

export const metadata = {
  title: "Elements | Elemen India",
  description: "About Elemen India, blog, and contact information.",
};

export default function ElementsPage() {
  return (
    <main>
      <PageHero
        title="Elements"
        subtitle="About us, inspiration, and ways to get in touch."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Elements" },
        ]}
        imageSrc={pageImages.elements}
        imageAlt="Elemen India technology and security solutions"
      />

      <ScrollReveal variant="fade-right">
        <section
          id="about"
          style={{ maxWidth: 1300, margin: "0 auto", padding: "60px 20px" }}
        >
          <h2
            style={{
              fontSize: 28,
              fontWeight: 700,
              marginBottom: 16,
              fontFamily: "Montserrat, sans-serif",
              color: "var(--navy)",
            }}
          >
            About Elemen India
          </h2>
          <p style={{ fontSize: 16, color: "#555", lineHeight: 1.9, maxWidth: 720 }}>
            Elemen India provides engineering and information technology solutions
            including CCTV, access control, and facility management across India.
          </p>
        </section>
      </ScrollReveal>

      <ScrollReveal variant="skew-up">
        <div id="blog">
          <Blog />
        </div>
      </ScrollReveal>

      <ScrollReveal variant="blur-in">
        <section
          id="contact"
          style={{
            maxWidth: 1300,
            margin: "0 auto",
            padding: "0 20px 40px",
          }}
        >
          <h2
            style={{
              fontSize: 24,
              fontWeight: 700,
              marginBottom: 20,
              fontFamily: "Montserrat, sans-serif",
              color: "var(--navy)",
            }}
          >
            Contact Us
          </h2>
          <ScrollStagger
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 24,
            }}
            stagger={0.12}
          >
            {[
              { label: "Phone", value: "(+91) 9867111459", variant: "fade-up" as const },
              { label: "Email", value: "support@elemenindia.com", variant: "fade-left" as const },
              { label: "Address", value: "Thane Station (West), Thane - 400602", variant: "fade-right" as const },
            ].map((item) => (
              <ScrollStaggerItem key={item.label} variant={item.variant}>
                <div
                  style={{
                    padding: 24,
                    background: "#f9f6f2",
                    borderRadius: 8,
                    border: "1px solid #e8e0d5",
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      color: "#5B1D36",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      marginBottom: 8,
                    }}
                  >
                    {item.label}
                  </div>
                  <div style={{ fontSize: 16, color: "#333", fontWeight: 500 }}>
                    {item.value}
                  </div>
                </div>
              </ScrollStaggerItem>
            ))}
          </ScrollStagger>
        </section>
      </ScrollReveal>

      <ScrollReveal variant="rotate-in">
        <section id="account" style={{ scrollMarginTop: 120 }}>
          <Newsletter />
        </section>
      </ScrollReveal>
    </main>
  );
}
