import { useEffect, useRef, useState } from "react";
import { scratchMessage } from "../config/event";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { OrnamentDivider } from "./OrnamentDivider";
import "./ScratchCard.css";

const REVEAL_THRESHOLD = 0.5; // reveal once ~50% is cleared
const SAMPLE_STEP = 6; // sample the alpha grid every N px — cheap enough to run each stroke

export function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScratchingRef = useRef(false);
  const revealedRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      // Skip the interaction entirely for reduced-motion visitors.
      setIsRevealed(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;

    function paintSurface() {
      // Champagne-gold surface with a faint Islamic geometric lattice —
      // reads as printed invitation stock, not a game.
      const gradient = ctx!.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#d9b869");
      gradient.addColorStop(1, "#c29344");
      ctx!.fillStyle = gradient;
      ctx!.fillRect(0, 0, width, height);

      ctx!.strokeStyle = "rgba(250, 246, 238, 0.35)";
      ctx!.lineWidth = 1;
      const step = 26;
      for (let x = -height; x < width; x += step) {
        ctx!.beginPath();
        ctx!.moveTo(x, 0);
        ctx!.lineTo(x + height, height);
        ctx!.stroke();
        ctx!.beginPath();
        ctx!.moveTo(x + height, 0);
        ctx!.lineTo(x, height);
        ctx!.stroke();
      }

      ctx!.fillStyle = "rgba(58, 44, 34, 0.65)";
      ctx!.font =
        "300 15px 'Jost', Arial, sans-serif";
      ctx!.textAlign = "center";
      ctx!.fillText("Scratch here", width / 2, height / 2 + 5);
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      paintSurface();
    }

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    function getPoint(clientX: number, clientY: number) {
      const rect = canvas!.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    }

    function scratchAt(x: number, y: number) {
      ctx!.globalCompositeOperation = "destination-out";
      ctx!.beginPath();
      ctx!.arc(x, y, 24, 0, Math.PI * 2);
      ctx!.fill();

      const last = lastPointRef.current;
      if (last) {
        ctx!.lineWidth = 48;
        ctx!.lineCap = "round";
        ctx!.beginPath();
        ctx!.moveTo(last.x, last.y);
        ctx!.lineTo(x, y);
        ctx!.stroke();
      }
      lastPointRef.current = { x, y };
    }

    function checkRevealProgress() {
      if (revealedRef.current) return;
      const dpr = window.devicePixelRatio || 1;
      const imageData = ctx!.getImageData(
        0,
        0,
        Math.round(width * dpr),
        Math.round(height * dpr)
      );
      const pixels = imageData.data;
      let transparent = 0;
      let sampled = 0;
      const strideBytes = SAMPLE_STEP * 4;
      for (let i = 3; i < pixels.length; i += strideBytes) {
        sampled += 1;
        if (pixels[i] < 40) transparent += 1;
      }
      if (sampled > 0 && transparent / sampled >= REVEAL_THRESHOLD) {
        revealedRef.current = true;
        setIsRevealed(true);
      }
    }

    function handlePointerDown(e: PointerEvent) {
      if (revealedRef.current) return;
      isScratchingRef.current = true;
      canvas!.setPointerCapture(e.pointerId);
      const { x, y } = getPoint(e.clientX, e.clientY);
      scratchAt(x, y);
    }

    function handlePointerMove(e: PointerEvent) {
      if (!isScratchingRef.current || revealedRef.current) return;
      e.preventDefault(); // stop page scroll only while actively scratching
      const { x, y } = getPoint(e.clientX, e.clientY);
      scratchAt(x, y);
      checkRevealProgress();
    }

    function handlePointerUp() {
      isScratchingRef.current = false;
      lastPointRef.current = null;
    }

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove, {
      passive: false
    });
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    return () => {
      resizeObserver.disconnect();
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [reducedMotion]);

  return (
    <section className="section section--center">
      <div className="section__inner">
        <p className="eyebrow">A Little Surprise For You</p>
        <OrnamentDivider />
        <p className="body-text scratch-card__intro">
          Scratch to reveal a message from our hearts
        </p>

        <div
          ref={containerRef}
          className={`scratch-card ${isRevealed ? "is-revealed" : ""}`}
        >
          <p className="scratch-card__message">{scratchMessage}</p>
          {!reducedMotion && (
            <canvas
              ref={canvasRef}
              className="scratch-card__canvas"
              aria-hidden={isRevealed}
            />
          )}
        </div>
      </div>
    </section>
  );
}
