import { useState } from "react";
import { nikah } from "../config/event";
import { downloadNikahIcs } from "../utils/calendar";
import { OrnamentDivider } from "./OrnamentDivider";
import { Countdown } from "./Countdown";
import "./NikahDetails.css";

export function NikahDetails() {
  const [calendarNotice, setCalendarNotice] = useState<string | null>(null);

  function handleAddToCalendar() {
    const succeeded = downloadNikahIcs();
    setCalendarNotice(
      succeeded
        ? "Calendar file downloaded."
        : "Your browser blocked the download — please try again."
    );
    window.setTimeout(() => setCalendarNotice(null), 4000);
  }

  return (
    <section className="section section--center">
      <div className="section__inner">
        <p className="eyebrow">Our Nikah</p>
        <OrnamentDivider />
        <h2 className="heading-md">
          {nikah.dateLabel} · {nikah.dayLabel}
        </h2>
        <p className="body-text">{nikah.timeLabel}</p>

        <Countdown />

        <button type="button" className="btn" onClick={handleAddToCalendar}>
          Add to Calendar
        </button>
        {calendarNotice && (
          <p role="status" className="nikah-details__notice">
            {calendarNotice}
          </p>
        )}
      </div>
    </section>
  );
}
