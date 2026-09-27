import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import "./CouplePhoto.css";

/**
 * Displays /images/couple.jpg as a very faint, atmospheric presence that
 * gently emerges while the visitor scrolls through this section. If the
 * photo hasn't been placed yet, the section quietly collapses instead of
 * showing a broken image.
 */
export function CouplePhoto() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node || reducedMotion) {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.35 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  if (imageFailed) return null;

  return (
    <section className="section couple-photo" ref={wrapperRef}>
      <div
        className={`couple-photo__frame ${isVisible ? "is-visible" : ""}`}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/couple.jpg`}
          alt="Md Yusuf and Humaira Fathima"
          onError={() => setImageFailed(true)}
          loading="lazy"
        />
        <div className="couple-photo__veil" aria-hidden="true" />
      </div>
    </section>
  );
}
