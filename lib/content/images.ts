/** Verified Unsplash URLs (404 IDs removed) */

export const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=900&q=80";

const u = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80`;

export const pageImages = {
  about: u("photo-1553877522-43269d4ea984", 1920),
  ourServices: u("photo-1516321497487-e288fb19713f", 1920),
  industry: u("photo-1497366216548-37526070297c", 1920),
  products: u("photo-1563986768609-322da13575f3", 1920),
  brands: u("photo-1560179707-f14e90ef3623", 1920),
  contact: u("photo-1600880292203-757bb62b4baf", 1920),
  elements: u("photo-1553877522-43269d4ea984", 1920),
  shop: u("photo-1563986768609-322da13575f3", 1920),
  categories: u("photo-1497366811353-6870744d04b2", 1920),
  topDeals: u("photo-1516321497487-e288fb19713f", 1920),
} as const;

export const serviceImages: Record<string, string> = {
  "access-control-system": u("photo-1563013544-824ae1b704d3"),
  "door-interlocking-solution": u("photo-1581091226825-a6a2a5aee158"),
  "time-attendance-management": u("photo-1486312338219-ce68d2c6f44d"),
  "canteen-management": u("photo-1555939594-58d7cb561ad1"),
  "contract-labor-management": u("photo-1454165804606-c3d57bc86b40"),
  "visitor-management": u("photo-1497366811353-6870744d04b2"),
  "corporate-printing-management": u("photo-1556761175-5973dc0f32e7"),
  "network-management": u("photo-1558494949-ef010cbdcc31"),
  "it-infrastructure-management": u("photo-1519389950473-47ba0277781c"),
  "managed-printing-solution": u("photo-1504384308090-c894fdcc538d"),
  "cctv-system": u("photo-1563986768609-322da13575f3"),
  "gym-software-management": u("photo-1534438327276-14e5300c3a48"),
  "wifi-management-solution": u("photo-1519389950473-47ba0277781c"),
  "intrusion-detection-system": u("photo-1555949963-aa79dcee981c"),
  "fire-alarm-system": u("photo-1558618666-fcd25c85cd64"),
};

export const industryImages: Record<string, string> = {
  "corporate-office": u("photo-1497366216548-37526070297c"),
  "pharmaceutical-research-centers": u("photo-1582719471384-894fbb16e074"),
  "education-learning-centers": u("photo-1562774053-701939374585"),
  "banking-finance-sector": u("photo-1600880292203-757bb62b4baf"),
  "hospital-healthcare": u("photo-1579684385127-1ef15d508118"),
  "real-estate-projects": u("photo-1449844908441-8829872d2607"),
};

export function getServiceImage(slug: string) {
  return serviceImages[slug] ?? pageImages.ourServices;
}

export function getIndustryImage(slug: string) {
  return industryImages[slug] ?? pageImages.industry;
}
