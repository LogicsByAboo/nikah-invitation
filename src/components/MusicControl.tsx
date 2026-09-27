import { useMusic } from "../audio/MusicContext";
import "./MusicControl.css";

export function MusicControl() {
  const { isPlaying, isAvailable, toggle } = useMusic();

  if (!isAvailable) return null;

  return (
    <button
      type="button"
      className="music-control"
      onClick={toggle}
      aria-pressed={isPlaying}
      aria-label={isPlaying ? "Mute background music" : "Play background music"}
    >
      <span aria-hidden="true">{isPlaying ? "♪" : "🔇"}</span>
    </button>
  );
}
