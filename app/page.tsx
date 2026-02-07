import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { PhilosophySection } from "@/components/philosophy-section";
import { DomainSaleSection } from "@/components/domain-sale-section";
import { ExperiencesSection } from "@/components/experiences-section";
import { AmenitiesSection } from "@/components/amenities-section";
import { ReservationsSection } from "@/components/reservations-section";
import { NewsletterSection } from "@/components/newsletter-section";
import { GallerySection } from "@/components/gallery-section";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { PageTransition } from "@/components/page-transition";

export default function Page() {
  return (
    <PageTransition>
      <Navigation />
      <WhatsAppButton />
      <main>
        <HeroSection />
        <PhilosophySection />
        <DomainSaleSection />
        <ExperiencesSection />
        <AmenitiesSection />
        <ReservationsSection />
        <NewsletterSection />
        <GallerySection />
      </main>
      <Footer />
    </PageTransition>
  );
}
