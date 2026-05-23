import { notFound } from "next/navigation";
import ContentPage from "@/components/ContentPage";
import RichContent from "@/components/RichContent";
import { serviceContent } from "@/lib/content/services";
import { getServiceImage } from "@/lib/content/images";
import { getServiceBySlug, ourServices } from "@/lib/site-pages";
import { variantsForSlug } from "@/lib/motion-presets";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return ourServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service | Elemen India" };
  return {
    title: `${service.label} | Elemen India`,
    description: `${service.label} — solutions by Elemen India.`,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const blocks = serviceContent[slug];
  if (!blocks) notFound();

  const { image: imageAnimation, content: contentAnimation } =
    variantsForSlug(slug);

  return (
    <ContentPage
      title={service.label}
      imageAnimation={imageAnimation}
      contentAnimation={contentAnimation}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Our Services", href: "/our-services" },
        { label: service.label },
      ]}
      heroImage={{
        src: getServiceImage(slug),
        alt: `${service.label} — Elemen India`,
      }}
    >
      <RichContent blocks={blocks} />
    </ContentPage>
  );
}
