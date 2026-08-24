import Hero from "../components/Hero";
import ServicesSection from "../components/ServicesSection";
import BrandsSection from "../components/BrandsSection";
import WhyChooseUsSection from "../components/WhyChooseUsSection";
import GallerySection from "../components/GallerySection";
import AboutSection from "../components/AboutSection";
import FaqSection from "../components/FaqSection";
import ContactSection from "../components/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <BrandsSection />
      <WhyChooseUsSection />
      <GallerySection />
      <AboutSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
