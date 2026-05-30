import { getServiceHeroImage } from "@/lib/content/images";
import { getServiceBySlug } from "@/lib/site-pages";

export type HomeFeaturedService = {
  slug: string;
  title: string;
  sub: string;
  cta: string;
  href: string;
  img: string;
  discount: string;
  color: string;
};

/** Homepage sector cards — each links to one service; image = that service page hero. */
const featured: {
  slug: string;
  sub: string;
  discount: string;
  cta: string;
  color: string;
}[] = [
  {
    slug: "cctv-system",
    sub: "Corporate offices, factories & sites",
    discount: "Enterprise Ready",
    cta: "Explore",
    color: "#5B1D36",
  },
  {
    slug: "fire-alarm-system",
    sub: "Hospitals, clinics & facilities",
    discount: "Life Safety",
    cta: "Learn More",
    color: "#1a2744",
  },
  {
    slug: "access-control-system",
    sub: "Banking, finance & secure entry",
    discount: "High Security",
    cta: "View Service",
    color: "#5B1D36",
  },
];

export function listHomeFeaturedServices(): HomeFeaturedService[] {
  return featured.flatMap((item) => {
    const service = getServiceBySlug(item.slug);
    if (!service) return [];
    return [
      {
        slug: item.slug,
        title: service.label,
        sub: item.sub,
        cta: item.cta,
        href: `/our-services/${item.slug}`,
        img: getServiceHeroImage(item.slug),
        discount: item.discount,
        color: item.color,
      },
    ];
  });
}
