import { contact } from "../config/event";
import "./Footer.css";

const PREFILLED_MESSAGE =
  "Hi, I saw your digital invitation and I'd like to create a similar invitation for my event.";

export function Footer() {
  const whatsappUrl = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
    PREFILLED_MESSAGE
  )}`;

  return (
    <footer className="footer">
      <div className="section__inner">
        <p className="footer__prompt">Loved this invitation?</p>
        <p className="footer__sub">
          Create a beautiful digital invitation for your special occasion.
        </p>
        <a
          className="btn"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Create Yours
        </a>
      </div>
    </footer>
  );
}
