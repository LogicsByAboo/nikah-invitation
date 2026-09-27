import { closingBlessing, coupleShortNames, nikah } from "../config/event";
import { OrnamentDivider } from "./OrnamentDivider";

export function ClosingSection() {
  return (
    <section className="section section--center">
      <div className="section__inner">
        <OrnamentDivider />
        <p className="body-text">{closingBlessing}</p>
        <h2 className="heading-md">{coupleShortNames}</h2>
        <p className="eyebrow">{nikah.dateLabel}</p>
      </div>
    </section>
  );
}
