import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import ContactInfoCards from "@/components/ContactInfoCards";
import ContactAddressSection from "@/components/ContactAddressSection";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { pageImages } from "@/lib/content/images";

export const metadata = {
  title: "Contact Us | Elemen India",
  description: "Contact Elemen India — Thane, Maharashtra. Phone, email, and social.",
};

export default function ContactUsPage() {
  return (
    <main>
      <PageHero
        title="Contact Us"
        subtitle="Reach our team for quotes, support, and general enquiries."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
        imageSrc={pageImages.contact}
        imageAlt="Elemen India office — Thane, Maharashtra"
      />

      {/* Form + contact cards */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "56px 20px 48px",
        }}
      >
        <ScrollReveal variant="fade-up">
          <div
            className="grid grid-cols-1 lg:grid-cols-2"
            style={{ gap: 32, alignItems: "start" }}
          >
            <div>
              <ContactForm />
            </div>
            <div>
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "var(--navy)",
                  marginBottom: 8,
                }}
              >
                Get in touch
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--text-mid)",
                  marginBottom: 20,
                  lineHeight: 1.6,
                }}
              >
                Call, email, or visit our Thane office. We serve clients across
                India for CCTV, access control, and IT solutions.
              </p>
              <ContactInfoCards />
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Address + map — above footer */}
      <ContactAddressSection />
    </main>
  );
}
