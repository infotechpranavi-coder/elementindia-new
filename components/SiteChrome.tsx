import SiteHeader from "@/components/SiteHeader";
import MainNav from "@/components/MainNav";
import Footer from "@/components/Footer";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <MainNav />
      {children}
      <Footer />
    </>
  );
}
