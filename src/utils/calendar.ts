import { calendarEvent, venue } from "../config/event";

function toIcsLocalDateTime(isoLocal: string): string {
  // "2027-05-30T11:00:00" -> "20270530T110000"
  return isoLocal.replace(/[-:]/g, "");
}

function escapeIcsText(value: string): string {
  return value.replace(/([,;])/g, "\\$1").replace(/\n/g, "\\n");
}

/**
 * Builds a VCALENDAR string with an explicit VTIMEZONE for Asia/Kolkata so
 * the event lands at the correct wall-clock time in any calendar app,
 * without needing a backend to generate it.
 */
export function buildIcsContent(): string {
  const uid = `nikah-${Date.now()}@invitation.local`;
  const stamp = toIcsLocalDateTime(new Date().toISOString().slice(0, 19));

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Nikah Invitation//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VTIMEZONE",
    "TZID:Asia/Kolkata",
    "BEGIN:STANDARD",
    "DTSTART:19700101T000000",
    "TZOFFSETFROM:+0530",
    "TZOFFSETTO:+0530",
    "TZNAME:IST",
    "END:STANDARD",
    "END:VTIMEZONE",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${stamp}Z`,
    `DTSTART;TZID=Asia/Kolkata:${toIcsLocalDateTime(calendarEvent.start)}`,
    `DTEND;TZID=Asia/Kolkata:${toIcsLocalDateTime(calendarEvent.end)}`,
    `SUMMARY:${escapeIcsText(calendarEvent.title)}`,
    `LOCATION:${escapeIcsText(venue.name)}`,
    `DESCRIPTION:${escapeIcsText(calendarEvent.description)}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ];

  return lines.join("\r\n");
}

/**
 * Triggers a client-side download of the .ics file — no backend involved.
 * Wrapped defensively so a blocked download (e.g. some in-app browsers)
 * never throws past this call.
 */
export function downloadNikahIcs(): boolean {
  try {
    const blob = new Blob([buildIcsContent()], {
      type: "text/calendar;charset=utf-8"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "nikah-yusuf-humaira.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.setTimeout(() => URL.revokeObjectURL(url), 2000);
    return true;
  } catch {
    return false;
  }
}
