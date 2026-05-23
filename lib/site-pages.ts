export const ourServices = [
  { label: "Access Control System", slug: "access-control-system" },
  { label: "Door Interlocking Solution", slug: "door-interlocking-solution" },
  { label: "Time & Attendance Management", slug: "time-attendance-management" },
  { label: "Canteen Management", slug: "canteen-management" },
  { label: "Contract & Labor Management", slug: "contract-labor-management" },
  { label: "Visitor Management", slug: "visitor-management" },
  { label: "Corporate Printing Management", slug: "corporate-printing-management" },
  { label: "Network Management", slug: "network-management" },
  { label: "IT & Infrastructure Management", slug: "it-infrastructure-management" },
  { label: "Managed Printing Solution", slug: "managed-printing-solution" },
  { label: "CCTV System", slug: "cctv-system" },
  { label: "Gym Software Management", slug: "gym-software-management" },
  { label: "Wifi Management Solution", slug: "wifi-management-solution" },
  { label: "Intrusion Detection System", slug: "intrusion-detection-system" },
  { label: "Fire Alarm System", slug: "fire-alarm-system" },
] as const;

export const industries = [
  { label: "Corporate Office", slug: "corporate-office" },
  { label: "Pharmaceutical & Research Centers", slug: "pharmaceutical-research-centers" },
  { label: "Education & Learning Centers", slug: "education-learning-centers" },
  { label: "Banking & Finance Sector", slug: "banking-finance-sector" },
  { label: "Hospital & Healthcare", slug: "hospital-healthcare" },
  { label: "Real Estate Projects", slug: "real-estate-projects" },
] as const;

export function getServiceBySlug(slug: string) {
  return ourServices.find((s) => s.slug === slug);
}

export function getIndustryBySlug(slug: string) {
  return industries.find((i) => i.slug === slug);
}
