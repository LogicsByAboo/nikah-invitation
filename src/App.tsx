import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MusicProvider } from "./audio/MusicContext";
import { Envelope } from "./components/Envelope/Envelope";
import { Hero } from "./components/Hero";
import { InvitationMessage } from "./components/InvitationMessage";
import { OurFamilies } from "./components/OurFamilies";
import { CouplePhoto } from "./components/CouplePhoto";
import { NikahDetails } from "./components/NikahDetails";
import { VenueSection } from "./components/VenueSection";
import { ScratchCard } from "./components/ScratchCard";
import { ClosingSection } from "./components/ClosingSection";
import { Footer } from "./components/Footer";
import { MusicControl } from "./components/MusicControl";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    if (!isOpened) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".invitation .section").forEach((section) => {
        gsap.fromTo(section.querySelectorAll(".section__inner, .hero__photo-wrap, .families, .venue__preview, .scratch-card"),
          { y: 42, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.06, scrollTrigger: { trigger: section, start: "top 86%", once: true } }
        );
      });
    });
    return () => ctx.revert();
  }, [isOpened]);

  return (
    <MusicProvider>
      <div className="app">
        {!isOpened && <Envelope onOpened={() => setIsOpened(true)} />}

        {isOpened && (
          <main className="invitation">
            <Hero />
            <InvitationMessage />
            <OurFamilies />
            <CouplePhoto />
            <NikahDetails />
            <VenueSection />
            <ScratchCard />
            <ClosingSection />
            <Footer />
          </main>
        )}

        {isOpened && <MusicControl />}
      </div>
    </MusicProvider>
  );
}
