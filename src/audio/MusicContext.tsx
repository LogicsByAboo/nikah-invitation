import {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode
} from "react";

interface MusicContextValue {
  isPlaying: boolean;
  isAvailable: boolean;
  /** Call once, right after the visitor's first tap (opening the envelope). */
  startAfterInteraction: () => void;
  toggle: () => void;
}

const MusicContext = createContext<MusicContextValue | null>(null);

const STORAGE_KEY = "nikah-music-muted";

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  function getAudio(): HTMLAudioElement {
    if (!audioRef.current) {
      const audio = new Audio(
        `${import.meta.env.BASE_URL}audio/islamic-instrumental.mp3`
      );

      audio.loop = true;
      audio.volume = 0.35;

      audio.addEventListener("error", () => setIsAvailable(false));

      audioRef.current = audio;
    }

    return audioRef.current;
  }

  function startAfterInteraction() {
    let mutedByPreference = false;

    try {
      mutedByPreference =
        window.localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      // Storage can be unavailable; default to playing.
    }

    if (mutedByPreference) return;

    const audio = getAudio();

    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch((error) => {
        console.error("Music failed to play:", error);
        setIsPlaying(false);
      });
  }

  function toggle() {
    if (!isAvailable) return;

    const audio = getAudio();

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);

      try {
        window.localStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // Ignore storage errors
      }
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);

          try {
            window.localStorage.setItem(STORAGE_KEY, "0");
          } catch {
            // Ignore storage errors
          }
        })
        .catch((error) => {
          console.error("Music failed to play:", error);
          setIsPlaying(false);
        });
    }
  }

  const value = useMemo(
    () => ({
      isPlaying,
      isAvailable,
      startAfterInteraction,
      toggle
    }),
    [isPlaying, isAvailable]
  );

  return (
    <MusicContext.Provider value={value}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic(): MusicContextValue {
  const ctx = useContext(MusicContext);

  if (!ctx) {
    throw new Error("useMusic must be used within MusicProvider");
  }

  return ctx;
}