import type { Block } from "@/components/RichContent";
import { getServiceImage } from "@/lib/content/images";
import { serviceContent } from "@/lib/content/services";
import { getServiceBySlug, ourServices } from "@/lib/site-pages";

export type PublicService = {
  slug: string;
  title: string;
  summary: string;
  imageUrl: string;
};

function summaryFromBlocks(blocks?: Block[]): string {
  if (!blocks) return "";
  const first = blocks.find((block) => block.type === "p");
  if (!first || first.type !== "p") return "";
  const text = first.text.trim();
  if (text.length <= 180) return text;
  return `${text.slice(0, 177)}...`;
}

export function listPublicServices(): PublicService[] {
  return ourServices
    .filter((item) => serviceContent[item.slug])
    .map((item) => ({
      slug: item.slug,
      title: item.label,
      summary: summaryFromBlocks(serviceContent[item.slug]),
      imageUrl: getServiceImage(item.slug),
    }));
}

export function getPublicService(slug: string) {
  const meta = getServiceBySlug(slug);
  if (!meta || !serviceContent[slug]) return null;

  return {
    slug: meta.slug,
    title: meta.label,
    summary: summaryFromBlocks(serviceContent[slug]),
    imageUrl: getServiceImage(slug),
  };
}
