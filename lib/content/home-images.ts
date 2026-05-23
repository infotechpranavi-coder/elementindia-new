import { serviceImages, industryImages, pageImages } from "@/lib/content/images";

const u = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80`;

/** Verified Unsplash IDs — security, CCTV & IT */
export const homeImages = {
  hero: {
    cctv: u("photo-1563986768609-322da13575f3", 1920),
    accessControl: u("photo-1563013544-824ae1b704d3", 1920),
    itInfra: u("photo-1558494949-ef010cbdcc31", 1920),
  },
  categories: {
    cctv: u("photo-1563986768609-322da13575f3", 600),
    accessControl: u("photo-1563013544-824ae1b704d3", 600),
    fireSafety: u("photo-1558618666-fcd25c85cd64", 600),
    network: u("photo-1558494949-ef010cbdcc31", 600),
    visitor: u("photo-1497366811353-6870744d04b2", 600),
    attendance: u("photo-1486312338219-ce68d2c6f44d", 600),
  },
  solutions: {
    cctvKit: u("photo-1563986768609-322da13575f3", 500),
    biometric: u("photo-1563013544-824ae1b704d3", 500),
    nvr: u("photo-1516321497487-e288fb19713f", 500),
    firewall: u("photo-1555949963-aa79dcee981c", 500),
    attendance: u("photo-1486312338219-ce68d2c6f44d", 500),
    visitor: u("photo-1497366811353-6870744d04b2", 500),
    intercom: u("photo-1581091226825-a6a2a5aee158", 500),
    wifi: u("photo-1519389950473-47ba0277781c", 500),
  },
  promo: u("photo-1516321497487-e288fb19713f", 700),
  newSolutionsBanner: u("photo-1581091226825-a6a2a5aee158", 700),
  banners: {
    corporate: industryImages["corporate-office"] ?? u("photo-1497366216548-37526070297c", 700),
    hospital: industryImages["hospital-healthcare"] ?? u("photo-1579684385127-1ef15d508118", 700),
    banking: industryImages["banking-finance-sector"] ?? u("photo-1600880292203-757bb62b4baf", 700),
  },
  blog: {
    cctvGuide: u("photo-1563986768609-322da13575f3", 600),
    accessTips: serviceImages["access-control-system"] ?? u("photo-1563013544-824ae1b704d3", 600),
    itSecurity: pageImages.products,
  },
};
