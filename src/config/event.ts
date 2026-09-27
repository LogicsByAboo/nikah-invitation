// Central place for every fact about the event.
// Change details here only — every component reads from this file.

export const groom = {
  name: "Md Yusuf",
  father: "Md Arief Khan.M",
  mother: "Sunaitha Banu.M"
};

export const bride = {
  name: "Humaira Fathima.N",
  father: "Nagoor Gani.A",
  mother: "Sarifa Banu.N"
};

export const coupleShortNames = "Md Yusuf & Humaira Fathima";
export const initials = "Y & H";

export const nikah = {
  // ISO string with explicit +05:30 (Asia/Kolkata) offset so the countdown
  // is unambiguous regardless of the visitor's own timezone.
  isoDateTime: "2027-05-30T11:00:00+05:30",
  dateLabel: "30 May 2027",
  dayLabel: "Sunday",
  timeLabel: "11:00 AM – 12:30 PM",
  timeZone: "Asia/Kolkata"
};

export const venue = {
  name: "Ramjan Mahal",
  mapsUrl: "https://maps.app.goo.gl/PgMnM4qXNaXLaJeD8?g_st=ac"
};

export const contact = {
  whatsappNumber: "919444636302", // digits only, for wa.me links
  displayNumber: "+91 94446 36302"
};

export const invitationMessage =
  "With the blessings of Allah and the love and prayers of our families, we request the honour of your presence at our Nikah as we begin this beautiful journey together.";

export const closingBlessing =
  "May Allah bless this beautiful beginning with love, mercy and barakah.";

export const scratchMessage =
  "Your presence would make our Nikah even more special. May Allah bless this beautiful beginning and fill our journey with love, mercy and barakah. We can't wait to celebrate with you. 🤍";



export const calendarEvent = {
  title: `Nikah of ${coupleShortNames}`,
  description:
    "With the blessings of Allah and the love and prayers of our families, we invite you to celebrate our Nikah.",
  location: venue.name,
  // .ics needs a start/end pair; the venue's local (IST) wall-clock time.
  start: "2027-05-30T11:00:00",
  end: "2027-05-30T12:30:00",
  timeZone: "Asia/Kolkata"
};
