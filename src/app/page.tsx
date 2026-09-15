import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Carousel from "@/components/Carousel";
import Services from "@/components/Services";
import Cinematics from "@/components/Cinematics";
import Portfolio from "@/components/Portfolio";
import WhyChooseUs from "@/components/WhyChooseUs";
import Stories from "@/components/Stories";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LeafAnimation from "@/components/LeafAnimation";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <LeafAnimation />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Carousel />
        <Services />
        <Cinematics />
        <Portfolio />
        <WhyChooseUs />
        <Stories />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}