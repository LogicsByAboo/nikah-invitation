import { nikah, venue } from "../config/event";
import { OrnamentDivider } from "./OrnamentDivider";
import "./VenueSection.css";

export function VenueSection() {
  return (
    <section className="section section--center venue">
      <div className="section__inner">
        <p className="eyebrow">Where We Gather</p>
        <OrnamentDivider />
        <h2 className="heading-md">{venue.name}</h2>
        <p className="body-text">
          {nikah.dateLabel} · {nikah.timeLabel}
        </p>

        <div className="venue__preview" aria-hidden="true">
          <span className="venue__pin">✦</span>
        </div>

        <a
          className="btn btn--solid"
          href={venue.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in Google Maps
        </a>
      </div>
    </section>
  );
}
