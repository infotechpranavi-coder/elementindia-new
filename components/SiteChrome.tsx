"use client";

import { usePathname } from "next/navigation";
import { AuthProvider } from "@/components/AuthProvider";
import { CartProvider } from "@/components/CartProvider";
import SiteNavigation from "@/components/SiteNavigation";
import Footer from "@/components/Footer";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <AuthProvider>
      <CartProvider>
        <SiteNavigation />
        {children}
        <Footer />
      </CartProvider>
    </AuthProvider>
  );
}
