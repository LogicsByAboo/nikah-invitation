import { useCountdown } from "../hooks/useCountdown";
import { nikah } from "../config/event";
import "./Countdown.css";

function pad(value: number): string {
  return value.toString().padStart(2, "0");
}

export function Countdown() {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(
    nikah.isoDateTime
  );

  if (isExpired) {
    return <p className="countdown countdown--expired">Today is the day.</p>;
  }

  const units: Array<{ label: string; value: number }> = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds }
  ];

  return (
    <div className="countdown" role="timer" aria-live="off">
      {units.map((unit) => (
        <div className="countdown__unit" key={unit.label}>
          <span className="countdown__value">{pad(unit.value)}</span>
          <span className="countdown__label">{unit.label}</span>
        </div>
      ))}
    </div>
  );
}
