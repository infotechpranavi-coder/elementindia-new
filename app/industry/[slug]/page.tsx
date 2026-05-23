import { notFound } from "next/navigation";
import ContentPage from "@/components/ContentPage";
import RichContent from "@/components/RichContent";
import { industryContent } from "@/lib/content/industries";
import { getIndustryImage } from "@/lib/content/images";
import { getIndustryBySlug, industries } from "@/lib/site-pages";
import { variantsForSlug } from "@/lib/motion-presets";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return { title: "Industry | Elemen India" };
  return {
    title: `${industry.label} | Elemen India`,
    description: `Elemen India solutions for ${industry.label}.`,
  };
}

export default async function IndustryDetailPage({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  const blocks = industryContent[slug];
  if (!blocks) notFound();

  const { image: imageAnimation, content: contentAnimation } =
    variantsForSlug(slug);

  return (
    <ContentPage
      title={industry.label}
      imageAnimation={imageAnimation}
      contentAnimation={contentAnimation}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Industry", href: "/industry" },
        { label: industry.label },
      ]}
      heroImage={{
        src: getIndustryImage(slug),
        alt: `${industry.label} — Elemen India solutions`,
      }}
    >
      <RichContent blocks={blocks} />
    </ContentPage>
  );
}
