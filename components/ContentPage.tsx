import PageHero from "@/components/PageHero";
import PageImage from "@/components/PageImage";
import ScrollReveal from "@/components/motion/ScrollReveal";
import type { RevealVariant } from "@/lib/motion-presets";
import type { Breadcrumb } from "@/components/PageHero";

type ContentPageProps = {
  title: string;
  subtitle?: string;
  breadcrumbs: Breadcrumb[];
  heroImage: { src: string; alt: string };
  /** Optional second image in page body (off by default — hero shows main image) */
  showInlineImage?: boolean;
  image?: { src: string; alt: string; caption?: string };
  children?: React.ReactNode;
  imageAnimation?: RevealVariant;
  contentAnimation?: RevealVariant;
  wrapContent?: boolean;
  contentMaxWidth?: number;
};

export default function ContentPage({
  title,
  subtitle,
  breadcrumbs,
  heroImage,
  showInlineImage = false,
  image,
  children,
  imageAnimation = "zoom-in",
  contentAnimation = "fade-up",
  wrapContent = true,
  contentMaxWidth = 960,
}: ContentPageProps) {
  const inline = showInlineImage && image;

  return (
    <main>
      <PageHero
        title={title}
        subtitle={subtitle}
        breadcrumbs={breadcrumbs}
        imageSrc={heroImage.src}
        imageAlt={heroImage.alt}
      />
      <section
        style={{
          maxWidth: contentMaxWidth,
          margin: "0 auto",
          padding: "48px 20px 80px",
        }}
      >
        {inline && (
          <ScrollReveal variant={imageAnimation} duration={0.7}>
            <PageImage
              src={image.src}
              alt={image.alt}
              caption={image.caption}
              priority
            />
          </ScrollReveal>
        )}
        {wrapContent ? (
          <ScrollReveal
            variant={contentAnimation}
            delay={inline ? 0.12 : 0}
            duration={0.65}
          >
            {children ?? (
              <p
                style={{
                  fontSize: 16,
                  color: "var(--text-mid)",
                  lineHeight: 1.9,
                }}
              >
                Learn more about our {title.toLowerCase()} solutions tailored for
                your organization. Contact us for demos, pricing, and
                implementation support.
              </p>
            )}
          </ScrollReveal>
        ) : (
          children
        )}
      </section>
    </main>
  );
}
