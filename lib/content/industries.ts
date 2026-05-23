import type { Block } from "@/components/RichContent";

export const industryIntro =
  "Elemen India serves a wide range of industries with its comprehensive security and management solutions. The company tailors its services to meet the unique requirements of each sector.";

export const industryContent: Record<string, Block[]> = {
  "corporate-office": [
    { type: "p", text: "Elemen India provides tailored security and management solutions for corporate offices, including access control, visitor management, time & attendance systems, CCTV surveillance, and IT infrastructure management. These solutions help corporate offices maintain a secure, efficient, and productive work environment." },
    { type: "h3", text: "Solutions for Corporate Offices" },
    { type: "ul", items: [
      "Access control to restrict entry to authorized personnel only.",
      "Visitor management to track and manage visitors efficiently.",
      "Time & attendance systems to monitor employee working hours.",
      "CCTV systems for comprehensive surveillance coverage.",
      "Network and IT infrastructure management for seamless operations.",
    ]},
  ],
  "pharmaceutical-research-centers": [
    { type: "p", text: "Pharmaceutical and research centers require the highest levels of security due to the sensitive nature of their work and the value of their assets. Elemen India provides specialized solutions to meet these stringent security requirements, including door interlocking, access control, and environmental monitoring." },
    { type: "h3", text: "Solutions for Pharma & Research" },
    { type: "ul", items: [
      "Advanced access control systems to protect sensitive research areas.",
      "Door interlocking solutions for cleanrooms and controlled environments.",
      "CCTV surveillance for 24/7 monitoring of critical areas.",
      "Intrusion detection systems for perimeter security.",
      "Time & attendance management for compliance and workforce tracking.",
    ]},
  ],
  "education-learning-centers": [
    { type: "p", text: "Educational institutions face unique security challenges, from ensuring student safety to protecting assets and managing large numbers of visitors. Elemen India provides comprehensive security solutions designed specifically for educational environments." },
    { type: "h3", text: "Solutions for Education" },
    { type: "ul", items: [
      "Access control systems to manage entry to school buildings and restricted areas.",
      "CCTV surveillance to monitor campuses and ensure student safety.",
      "Visitor management systems to track and screen all visitors.",
      "Fire alarm systems for student and staff safety.",
      "WiFi management solutions for reliable campus connectivity.",
    ]},
  ],
  "banking-finance-sector": [
    { type: "p", text: "Banks and financial institutions handle sensitive financial data and large amounts of cash, making security a top priority. Elemen India provides robust security solutions tailored to the specific needs of the banking and finance sector." },
    { type: "h3", text: "Solutions for Banking & Finance" },
    { type: "ul", items: [
      "Advanced access control systems for vaults, server rooms, and restricted areas.",
      "Door interlocking solutions for secure entry to banking halls and back offices.",
      "CCTV surveillance with high-definition cameras for monitoring all areas.",
      "Intrusion detection systems for after-hours security.",
      "IT & infrastructure management for secure banking operations.",
    ]},
  ],
  "hospital-healthcare": [
    { type: "p", text: "Healthcare facilities have unique security and management needs, including protecting patients, staff, and sensitive medical data, while ensuring smooth operations 24/7. Elemen India provides specialized solutions for the healthcare sector." },
    { type: "h3", text: "Solutions for Healthcare" },
    { type: "ul", items: [
      "Access control for restricted areas such as ICUs, pharmacies, and server rooms.",
      "CCTV surveillance for patient and staff safety monitoring.",
      "Visitor management to track and screen all visitors to patient areas.",
      "Fire alarm systems for life safety compliance.",
      "Time & attendance management for healthcare staff scheduling.",
    ]},
  ],
  "real-estate-projects": [
    { type: "p", text: "Real estate developments, including residential complexes, commercial buildings, and mixed-use developments, require comprehensive security and management solutions. Elemen India provides integrated solutions for modern real estate projects." },
    { type: "h3", text: "Solutions for Real Estate" },
    { type: "ul", items: [
      "Access control systems for building entry and amenity areas.",
      "CCTV surveillance for common areas, parking, and perimeter security.",
      "Intercom and visitor management systems for resident security.",
      "Fire alarm systems for life safety compliance.",
      "WiFi management for residents and commercial tenants.",
    ]},
  ],
};
