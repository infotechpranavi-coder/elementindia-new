import ContentPage from "@/components/ContentPage";
import RichContent from "@/components/RichContent";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { ScrollStagger, ScrollStaggerItem } from "@/components/motion/ScrollReveal";
import { staggerVariantAt } from "@/lib/motion-presets";
import { pageImages } from "@/lib/content/images";

export const metadata = {
  title: "Products | Elemen India",
  description:
    "Security, surveillance, and management products from leading brands.",
};

const productBlocks = [
  {
    type: "p" as const,
    text: "Elemen India offers a wide range of security, surveillance, and management products sourced from leading brands. The company provides high-quality hardware and software solutions to meet the diverse needs of its clients across various industries.",
  },
  { type: "h2" as const, text: "Product Categories" },
  {
    type: "ul" as const,
    items: [
      "Access Control Hardware: Card readers, biometric scanners, keypads, and access controllers.",
      "CCTV Cameras & DVR/NVR Systems: HD cameras, IP cameras, analog cameras, and recording devices.",
      "Fire Alarm Equipment: Smoke detectors, heat detectors, manual call points, fire alarm panels.",
      "Network Equipment: Routers, switches, access points, and network management software.",
      "Time & Attendance Terminals: Biometric, RFID, and face recognition time attendance devices.",
      "Visitor Management Systems: Self-service kiosks, reception management software.",
      "Printing Solutions: Multi-function printers, print management software.",
      "Intrusion Detection Devices: Motion sensors, door/window sensors, alarm panels.",
    ],
  },
];

const productGallery = [
  { src: pageImages.products, alt: "CCTV and surveillance equipment" },
  { src: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80", alt: "Access control hardware" },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", alt: "Fire alarm and safety equipment" },
];

export default function ProductsPage() {
  return (
    <ContentPage
      title="Products"
      subtitle="High-quality hardware and software from trusted global brands."
      wrapContent={false}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
      heroImage={{
        src: pageImages.products,
        alt: "Security and surveillance product range",
      }}
    >
      <ScrollStagger
        className="grid grid-cols-1 sm:grid-cols-3"
        style={{ gap: 16, marginBottom: 36 }}
        stagger={0.1}
      >
        {productGallery.map((img, i) => (
          <ScrollStaggerItem key={img.alt} variant={staggerVariantAt(i)}>
            <figure
              style={{
                borderRadius: 10,
                overflow: "hidden",
                border: "1px solid var(--border)",
                margin: 0,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                style={{ width: "100%", height: 160, objectFit: "cover" }}
              />
            </figure>
          </ScrollStaggerItem>
        ))}
      </ScrollStagger>
      <ScrollReveal variant="skew-up" delay={0.05}>
        <RichContent blocks={productBlocks} />
      </ScrollReveal>
    </ContentPage>
  );
}
