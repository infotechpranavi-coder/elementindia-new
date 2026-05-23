import ContentPage from "@/components/ContentPage";
import RichContent from "@/components/RichContent";
import { aboutBlocks } from "@/lib/content/about";
import { pageImages } from "@/lib/content/images";

export const metadata = {
  title: "About Us | Elemen India",
  description:
    "Elemen India — Mumbai based specialists in Engineering, IT, and nationwide CCTV services.",
};

export default function AboutUsPage() {
  return (
    <ContentPage
      title="About Us"
      subtitle="Engineering & Information Technology solutions across India."
      contentAnimation="fade-right"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      heroImage={{
        src: pageImages.about,
        alt: "Elemen India professional team and technology solutions",
      }}
    >
      <RichContent blocks={aboutBlocks} />
    </ContentPage>
  );
}
