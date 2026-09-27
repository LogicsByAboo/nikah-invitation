import { bride, groom } from "../config/event";
import { OrnamentDivider } from "./OrnamentDivider";
import "./OurFamilies.css";

export function OurFamilies() {
  return (
    <section className="section section--center">
      <div className="section__inner">
        <p className="eyebrow">Our Families</p>
        <OrnamentDivider />

        <div className="families">
          <div className="families__side">
            <p className="families__role">The Groom</p>
            <h3 className="heading-md">{groom.name}</h3>
            <p className="families__parents">
              Son of {groom.father} &amp; {groom.mother}
            </p>
          </div>

          <p className="families__and">and</p>

          <div className="families__side">
            <p className="families__role">The Bride</p>
            <h3 className="heading-md">{bride.name}</h3>
            <p className="families__parents">
              Daughter of {bride.father} &amp; {bride.mother}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
