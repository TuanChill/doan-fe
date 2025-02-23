import { ContactSection } from "@/components/home/contact-section";
import Features from "@/components/home/feature";
import { GallerySection } from "@/components/home/gallery-section";
import { Hero } from "@/components/home/hero";
import { HistorySection } from "@/components/home/history-section";
import { NewsSection } from "@/components/home/news-section";
import { VirtualTour } from "@/components/home/virtual-tour";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function Home() {
  return (
    <div className="">
      <Header />
      <div className="mt-[60px]">
        <Hero />
        <Features />
        <HistorySection />
        <NewsSection />
        <GallerySection />
        <VirtualTour />
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
}
