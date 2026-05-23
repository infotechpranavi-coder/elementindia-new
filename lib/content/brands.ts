export type BrandPartner = {
  name: string;
  tagline?: string;
};

export type BrandCategory = {
  id: string;
  title: string;
  brands: BrandPartner[];
};

export const brandCategories: BrandCategory[] = [
  {
    id: "access-control",
    title: "Access Control System",
    brands: [
      { name: "Bosch", tagline: "Security Systems" },
      { name: "smart i" },
      { name: "SPECTRA" },
      { name: "EBELCO" },
      { name: "eSSL", tagline: "Security at Fingertips" },
      { name: "Honeywell" },
      { name: "HID" },
      { name: "TIMEWATCH" },
      { name: "ROSSLARE", tagline: "Security Products" },
    ],
  },
  {
    id: "cctv",
    title: "CCTV",
    brands: [
      { name: "CP PLUS" },
      { name: "dahua" },
      { name: "Honeywell" },
      { name: "Hanwha", tagline: "Techwin" },
      { name: "HIKVISION" },
      { name: "uniview" },
    ],
  },
  {
    id: "fire-alarm",
    title: "Fire Alarm System",
    brands: [
      { name: "apollo" },
      { name: "SYSTEM SENSOR" },
      { name: "GST" },
      { name: "NOTIFIER", tagline: "by Honeywell" },
      { name: "EST" },
      { name: "AGNi" },
      { name: "MORLEY-IAS", tagline: "Fire Systems" },
    ],
  },
  {
    id: "it",
    title: "IT",
    brands: [
      { name: "molex" },
      { name: "DELL" },
      { name: "D-Link" },
      { name: "VERTIV" },
      { name: "Lenovo" },
      { name: "tp-link" },
      { name: "VALRACK" },
    ],
  },
];
