/** Elemen India brand constants */
export const BRAND_NAME = "ELEMEN INDIA";
export const BRAND_TAGLINE = "Engineering & Information Technology Solutions";
export const LOGO_SRC = "/elemen-logo.jpeg";

export const CONTACT_EMAIL = "contact@elemenindia.com";
/** @deprecated Use CONTACT_EMAIL for public-facing contact */
export const SUPPORT_EMAIL = CONTACT_EMAIL;

export const PHONE_PRIMARY = "9867111459";
export const PHONE_SECONDARY = "8452912939";
export const PHONE_DISPLAY = `${PHONE_PRIMARY} / ${PHONE_SECONDARY}`;

/** Office address — exact wording from official contact details */
export const OFFICE_ADDRESS_LINES = [
  "Rayaansh Arcade , Office No. 101 ,",
  "First Floor ,",
  "Behind St Stand , Thane",
  "Station(West),",
  "Thane - 400602, Maharashtra, INDIA",
] as const;

export const OFFICE_ADDRESS_FULL = OFFICE_ADDRESS_LINES.join("\n");

/** Single-line summary for compact UI */
export const OFFICE_ADDRESS =
  "Rayaansh Arcade, Office No. 101, First Floor, Behind St Stand, Thane Station(West), Thane - 400602, Maharashtra, INDIA";

/** Social profile URLs — set each value when ready (use "#" until then) */
export const SOCIAL_LINKS = {
  facebook: "#",
  instagram: "#",
  linkedin: "#",
  youtube: "#",
  x: "#",
  whatsapp: "#",
} as const;

export type SocialPlatform = keyof typeof SOCIAL_LINKS;
