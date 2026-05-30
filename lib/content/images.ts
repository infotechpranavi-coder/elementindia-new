/** Page-level Unsplash URLs (verified HTTP 200) */

export const DEFAULT_IMAGE = "/services/CCTV System.jpg";

const unsplash = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

const pexels = (photoId: number, w = 900) =>
  `https://images.pexels.com/photos/${photoId}/pexels-photo-${photoId}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const pageImages = {
  about: unsplash("photo-1553877522-43269d4ea984", 1920),
  ourServices: unsplash("photo-1516321497487-e288fb19713f", 1920),
  industry: unsplash("photo-1497366216548-37526070297c", 1920),
  products: unsplash("photo-1563986768609-322da13575f3", 1920),
  brands: unsplash("photo-1560179707-f14e90ef3623", 1920),
  contact: unsplash("photo-1600880292203-757bb62b4baf", 1920),
  elements: unsplash("photo-1553877522-43269d4ea984", 1920),
  shop: unsplash("photo-1563986768609-322da13575f3", 1920),
  categories: unsplash("photo-1497366811353-6870744d04b2", 1920),
  topDeals: unsplash("photo-1516321497487-e288fb19713f", 1920),
} as const;

/** Local banners in /public/services — filenames must match exactly */
const serviceBannerFiles: Record<string, string> = {
  "access-control-system": "acces control.jpg",
  "door-interlocking-solution": "door locking.jpg",
  "time-attendance-management": "Time & Attendance Management.jpg",
  "canteen-management": "Canteen Management.jpg",
  "contract-labor-management": "Contract & Labor Management.jpg",
  "visitor-management": "Visitor Management.jpg",
  "corporate-printing-management": "Corporate Printing Management.jpg",
  "network-management": "Network Management.jpg",
  "managed-printing-solution": "Managed Printing Solution.jpg",
  "cctv-system": "CCTV System.jpg",
  "intrusion-detection-system": "Intrusion Detection System.jpg",
  "fire-alarm-system": "fire alarm.jpg",
};

/** Stock fallback for services without a local banner yet */
const serviceStockFallback: Record<string, string> = {
  "it-infrastructure-management": pexels(325229, 1920),
  "gym-software-management": pexels(1552242, 1920),
  "wifi-management-solution": pexels(442150, 1920),
};

function publicServicePath(fileName: string) {
  return `/services/${encodeURIComponent(fileName)}`;
}

function serviceImageUrl(slug: string) {
  const localFile = serviceBannerFiles[slug];
  if (localFile) return publicServicePath(localFile);
  if (serviceStockFallback[slug]) return serviceStockFallback[slug];
  return pageImages.ourServices;
}

export function getServiceImage(slug: string) {
  return serviceImageUrl(slug);
}

export function getServiceHeroImage(slug: string) {
  return serviceImageUrl(slug);
}

export const industryImages: Record<string, string> = {
  "corporate-office": unsplash("photo-1497366216548-37526070297c"),
  "pharmaceutical-research-centers": unsplash("photo-1582719471384-894fbb16e074"),
  "education-learning-centers": unsplash("photo-1562774053-701939374585"),
  "banking-finance-sector": unsplash("photo-1600880292203-757bb62b4baf"),
  "hospital-healthcare": unsplash("photo-1579684385127-1ef15d508118"),
  "real-estate-projects": unsplash("photo-1449844908441-8829872d2607"),
};

export function getIndustryImage(slug: string) {
  return industryImages[slug] ?? pageImages.industry;
}

export const serviceImages: Record<string, string> = Object.fromEntries(
  [...Object.keys(serviceBannerFiles), ...Object.keys(serviceStockFallback)].map((slug) => [
    slug,
    getServiceImage(slug),
  ])
);
