import HeroSlider from "@/components/HeroSlider";
import Features from "@/components/Features";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import PromoBanner from "@/components/PromoBanner";
import NewArrivals from "@/components/NewArrivals";
import BannerGrid from "@/components/BannerGrid";
import Testimonials from "@/components/Testimonials";
import Blog from "@/components/Blog";
import ScrollReveal from "@/components/motion/ScrollReveal";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <ScrollReveal variant="fade-up">
        <Features />
      </ScrollReveal>
      <ScrollReveal variant="fade-left" duration={0.7}>
        <Categories />
      </ScrollReveal>
      <ScrollReveal variant="fade-right" duration={0.7}>
        <FeaturedProducts />
      </ScrollReveal>
      <ScrollReveal variant="zoom-in" duration={0.75}>
        <PromoBanner />
      </ScrollReveal>
      <ScrollReveal variant="flip-up" duration={0.7}>
        <NewArrivals />
      </ScrollReveal>
      <ScrollReveal variant="fade-down">
        <BannerGrid />
      </ScrollReveal>
      <ScrollReveal variant="blur-in" duration={0.8}>
        <Testimonials />
      </ScrollReveal>
      <ScrollReveal variant="rotate-in" duration={0.7}>
        <Blog />
      </ScrollReveal>
    </main>
  );
}
