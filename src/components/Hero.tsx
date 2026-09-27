import { coupleShortNames, nikah, venue } from "../config/event";
import { OrnamentDivider } from "./OrnamentDivider";
import "./Hero.css";

export function Hero() {
  const coupleImage = `${import.meta.env.BASE_URL}images/couple.jpg`;

  return (
    <section className="section hero">
      <div className="hero__wash" aria-hidden="true" />
      <div className="section__inner hero__inner">
        <p className="eyebrow hero__eyebrow">The Nikah Of</p>
        <h1 className="heading-lg hero__names">{coupleShortNames}</h1>
        <p className="hero__date">{nikah.dateLabel} · {nikah.dayLabel}</p>
        <OrnamentDivider />

        <div className="hero__photo-wrap">
          <img src={coupleImage} alt="Md Yusuf and Humaira Fathima" className="hero__photo" />
          <div className="hero__photo-frame" aria-hidden="true" />
        </div>

        <div className="hero__details">
          <span>{nikah.timeLabel}</span>
          <span>{venue.name}</span>
        </div>
      </div>
    </section>
  );
}
