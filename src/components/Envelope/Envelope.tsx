import { useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useMusic } from "../../audio/MusicContext";
import { initials } from "../../config/event";
import "./Envelope.css";

interface EnvelopeProps { onOpened: () => void; }

export function Envelope({ onOpened }: EnvelopeProps) {
  const [isOpening, setIsOpening] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const monogramRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();
  const { startAfterInteraction } = useMusic();

  const petals = useMemo(() => Array.from({ length: 34 }, (_, i) => ({
    left: `${(i * 29) % 103 - 2}%`,
    delay: `${-((i * 1.37) % 11)}s`,
    duration: `${7 + (i % 7) * 1.25}s`,
    size: `${10 + (i % 5) * 3}px`,
    rotate: `${(i * 47) % 360}deg`,
    drift: `${-45 + ((i * 31) % 90)}px`,
    opacity: `${0.42 + (i % 5) * 0.1}`
  })), []);

  function handleOpen() {
    if (isOpening) return;
    setIsOpening(true);
    startAfterInteraction();

    const finish = () => onOpened();
    if (reducedMotion) {
      gsap.to(rootRef.current, { opacity: 0, duration: 0.35, onComplete: finish });
      return;
    }

    const tl = gsap.timeline({ onComplete: finish });
    tl.to(monogramRef.current, { scale: 1.08, duration: 0.18, ease: "power2.out" })
      .to(monogramRef.current, { scale: 0.92, opacity: 0, duration: 0.42, ease: "power3.in" })
      .to(".opening-petal", { y: "-18vh", opacity: 0, stagger: 0.012, duration: 0.65, ease: "power2.in" }, "-=0.32")
      .to(rootRef.current, { scale: 1.08, opacity: 0, duration: 0.75, ease: "power3.inOut" }, "-=0.5");
  }

  return (
    <div ref={rootRef} className="envelope-gate" aria-label="Nikah invitation opening">
      <div className="opening-glow opening-glow--one" aria-hidden="true" />
      <div className="opening-glow opening-glow--two" aria-hidden="true" />
      <div className="opening-arch" aria-hidden="true" />
      <div className="opening-vignette" aria-hidden="true" />

      <div className="opening-petals" aria-hidden="true">
        {petals.map((petal, i) => (
          <span
            className="opening-petal"
            key={i}
            style={{
              left: petal.left,
              animationDelay: petal.delay,
              animationDuration: petal.duration,
              width: petal.size,
              height: `calc(${petal.size} * 0.62)`,
              transform: `rotate(${petal.rotate})`,
              ["--petal-drift" as string]: petal.drift,
              opacity: petal.opacity
            }}
          />
        ))}
      </div>

      <div className="opening-ornament opening-ornament--top" aria-hidden="true">✦</div>
      <div className="opening-ornament opening-ornament--bottom" aria-hidden="true">✦</div>

      <button
        ref={monogramRef}
        type="button"
        className="opening-monogram"
        onClick={handleOpen}
        disabled={isOpening}
        aria-label="Open invitation"
      >
        <span className="opening-monogram__ring" aria-hidden="true" />
        <span className="opening-monogram__letters">{initials}</span>
        <span className="opening-monogram__hint">{isOpening ? "" : "Tap to open"}</span>
      </button>
    </div>
  );
}
