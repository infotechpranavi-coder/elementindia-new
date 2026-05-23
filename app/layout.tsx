import type { Metadata } from "next";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "ELEMEN INDIA - Security, CCTV & IT Solutions",
  description:
    "Elemen India — Mumbai based specialists in CCTV, access control, visitor management, and IT infrastructure across India.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
