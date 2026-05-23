import { industries, ourServices } from "@/lib/site-pages";

/** Sticky nav uses wine berry; header uses navy + gold accent */
export const NAVY = "#1a2744";
export const NAVY_DARK = "#141e33";
export const WINE_BERRY = "#5B1D36";
export const WINE_BERRY_DARK = "#451628";
export const GOLD = "#C4A574";
export const HEADER_BG = NAVY;

export const searchCategories = [
  "All Categories",
  "Living Room",
  "Bedroom",
  "Dining",
  "Office",
  "Outdoor",
  "Decor",
];

export const mainNavLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Our Services", href: "/our-services", hasDropdown: true },
  { label: "Industry", href: "/industry", hasDropdown: true },
  { label: "Products", href: "/products" },
  { label: "Brands", href: "/brands" },
  { label: "Contact Us", href: "/contact-us" },
] as const;

export const dropdownItems: Record<string, { label: string; href: string }[]> = {
  "Our Services": ourServices.map((s) => ({
    label: s.label,
    href: `/our-services/${s.slug}`,
  })),
  Industry: industries.map((i) => ({
    label: i.label,
    href: `/industry/${i.slug}`,
  })),
};
