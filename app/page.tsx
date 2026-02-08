import Hero from "@/components/Hero";
import Usluge from "@/components/Usluge";
import VideoSection from "@/components/VideoSection";
import ImageShowcase from "@/components/ImageShowcase";
import Testimonials from "@/components/Testimonials";
import RezervacijaCTA from "@/components/RezervacijaCTA";
import Kontakt from "@/components/Kontakt";

export default function Home() {
  return (
    <>
      <Hero />
      <Usluge />
      <VideoSection />
      <ImageShowcase />
      <Testimonials />
      <RezervacijaCTA />
      <Kontakt />
    </>
  );
}

