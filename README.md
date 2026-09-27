# Nikah of Md Yusuf & Humaira Fathima — Digital Invitation

A premium, mobile-first Islamic Nikah invitation built with React, Vite,
TypeScript and GSAP. Static frontend only — no backend, no database, no
authentication, no RSVP.

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
npm run preview  # preview the production build locally
```

## Adding your two media assets

The site works perfectly with these files missing (see "Graceful
fallbacks" below), but for the full intended experience, add:

1. **Couple photograph**
   Place a photo at:
   ```
   public/images/couple.jpg
   ```
   Use a real, unedited photo of the couple. It's displayed very subtly
   (low opacity, soft vignette) as an atmospheric element, not a gallery
   photo — a portrait-ish or 4:5 crop works best.

2. **Background music**
   Place an instrumental audio file at:
   ```
   public/audio/islamic-instrumental.mp3
   ```
   Use a peaceful, copyright-cleared instrumental (oud / soft piano /
   strings). Do not use a copyrighted commercial song. It loops quietly
   after the visitor taps the envelope.

Both `public/images/` and `public/audio/` already exist as folders —
just drop the files in with those exact names, no code changes needed.

## Graceful fallbacks

- **Missing couple photo:** the photo section quietly removes itself;
  no broken image, no error.
- **Missing/failed audio:** the music control button hides itself; the
  rest of the site is unaffected.
- **`prefers-reduced-motion` enabled:** the envelope opens with a short
  fade instead of the full animated sequence, the couple photo appears
  without the scroll-reveal transition, and the scratch card is skipped
  in favour of showing the message directly.

## Editing event details

Every name, date, time, venue and message lives in one file:

```
src/config/event.ts
```

Change the values there — every component reads from this file, so
there is nothing else to hunt down.

## Project structure

```
index.html                  entry HTML, fonts, SEO meta tags
src/
  main.tsx                  React root, global styles
  App.tsx                   composes the full page + envelope gate
  config/event.ts           all event data (single source of truth)
  audio/MusicContext.tsx    shared background-music state
  hooks/
    useCountdown.ts         live countdown to the Nikah instant
    useReducedMotion.ts     tracks prefers-reduced-motion
  utils/calendar.ts         builds & downloads the .ics calendar file
  components/
    Envelope/               opening animation (GSAP timeline)
    Hero.tsx, InvitationMessage.tsx, QuranVerse.tsx,
    OurFamilies.tsx, CouplePhoto.tsx, NikahDetails.tsx,
    Countdown.tsx, VenueSection.tsx, ScratchCard.tsx,
    ClosingSection.tsx, Footer.tsx, MusicControl.tsx,
    OrnamentDivider.tsx
  styles/theme.css           color & type CSS variables
  styles/global.css          shared section/typography/button styles
public/
  favicon.svg
  images/                   → put couple.jpg here
  audio/                    → put islamic-instrumental.mp3 here
```

## Notes

- No navigation, no RSVP, no "Our Story" section — by design.
- The Google Maps button opens the exact supplied link in a new tab.
- The footer's "Create Yours" button opens WhatsApp
  (+91 94463 6302) with a pre-filled message — no business name or
  Instagram handle is shown anywhere.
