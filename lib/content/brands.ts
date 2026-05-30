export type BrandPartner = {
  name: string;
  imageUrl: string;
};

export type BrandCategory = {
  id: string;
  title: string;
  folder: string;
  brands: BrandPartner[];
};

/** Build a public URL for files under /public/brandss (handles spaces in filenames). */
export function brandImageUrl(...pathParts: string[]) {
  return `/${pathParts.map((part) => encodeURIComponent(part)).join("/")}`;
}

const access = "brandss/access";
const cctv = "brandss/access/cctv";
const fire = "brandss/access/cctv/fire";
const it = "brandss/access/cctv/fire/it";

const honeywellAccessLogo = brandImageUrl(access, "honeywell.jpg");

export const brandCategories: BrandCategory[] = [
  {
    id: "access-control",
    title: "Access Control System",
    folder: access,
    brands: [
      { name: "Bosch", imageUrl: brandImageUrl(access, "bosch.jpg") },
      { name: "smart i", imageUrl: brandImageUrl(access, "smart i.jpg") },
      { name: "SPECTRA", imageUrl: brandImageUrl(access, "spectra.jpg") },
      { name: "EBELCO", imageUrl: brandImageUrl(access, "ebelco.jpg") },
      { name: "eSSL", imageUrl: brandImageUrl(access, "essl.jpg") },
      { name: "Honeywell", imageUrl: honeywellAccessLogo },
      { name: "HID", imageUrl: brandImageUrl(access, "hid.jpg") },
      { name: "TIMEWATCH", imageUrl: brandImageUrl(access, "time.jpg") },
      { name: "ROSSLARE", imageUrl: brandImageUrl(access, "rosslare.jpg") },
    ],
  },
  {
    id: "cctv",
    title: "CCTV",
    folder: cctv,
    brands: [
      { name: "CP PLUS", imageUrl: brandImageUrl(cctv, "cp plus.jpg") },
      { name: "dahua", imageUrl: brandImageUrl(cctv, "aldhua.jpg") },
      { name: "Honeywell", imageUrl: brandImageUrl(cctv, "honey.jpg") },
      { name: "Hanwha", imageUrl: brandImageUrl(cctv, "hanwa.jpg") },
      { name: "HIKVISION", imageUrl: brandImageUrl(cctv, "hik vision.jpg") },
      { name: "uniview", imageUrl: brandImageUrl(cctv, "uniview.jpg") },
    ],
  },
  {
    id: "fire-alarm",
    title: "Fire Alarm System",
    folder: fire,
    brands: [
      { name: "apollo", imageUrl: brandImageUrl(fire, "aploll.jpg") },
      { name: "SYSTEM SENSOR", imageUrl: brandImageUrl(fire, "system senosr.jpg") },
      { name: "GST", imageUrl: brandImageUrl(fire, "gst.jpg") },
      { name: "Honeywell", imageUrl: honeywellAccessLogo },
      { name: "NOTIFIER", imageUrl: brandImageUrl(fire, "notifier.jpg") },
      { name: "EST", imageUrl: brandImageUrl(fire, "est.jpg") },
      { name: "AGNi", imageUrl: brandImageUrl(fire, "agni.jpg") },
      { name: "MORLEY-IAS", imageUrl: brandImageUrl(fire, "morley.jpg") },
    ],
  },
  {
    id: "it",
    title: "IT",
    folder: it,
    brands: [
      { name: "molex", imageUrl: brandImageUrl(it, "molec.jpg") },
      { name: "DELL", imageUrl: brandImageUrl(it, "dell.jpg") },
      { name: "D-Link", imageUrl: brandImageUrl(it, "dlink.jpg") },
      { name: "VERTIV", imageUrl: brandImageUrl(it, "vertiv.jpg") },
      { name: "Lenovo", imageUrl: brandImageUrl(it, "lenovo.jpg") },
      { name: "tp-link", imageUrl: brandImageUrl(it, "tp link.jpg") },
      { name: "VALRACK", imageUrl: brandImageUrl(it, "valrck.jpg") },
    ],
  },
];
