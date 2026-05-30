import { notFound } from "next/navigation";
import ContentPage from "@/components/ContentPage";
import RichContent from "@/components/RichContent";
import { getServiceHeroImage } from "@/lib/content/images";
import { serviceContent } from "@/lib/content/services";
import { getPublicService } from "@/lib/public-services";
import { ourServices } from "@/lib/site-pages";
import { variantsForSlug } from "@/lib/motion-presets";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ourServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = getPublicService(slug);
  if (!service) return { title: "Service | Elemen India" };
  return {
    title: `${service.title} | Elemen India`,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getPublicService(slug);
  if (!service) notFound();

  const blocks = serviceContent[slug];
  const { image: imageAnimation, content: contentAnimation } = variantsForSlug(slug);

  return (
    <ContentPage
      title={service.title}
      imageAnimation={imageAnimation}
      contentAnimation={contentAnimation}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Our Services", href: "/our-services" },
        { label: service.title },
      ]}
      heroImage={{
        src: getServiceHeroImage(slug),
        alt: `${service.title} — security and IT solutions by Elemen India`,
      }}
    >
      <RichContent blocks={blocks} />
    </ContentPage>
  );
}
