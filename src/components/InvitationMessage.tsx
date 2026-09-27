import { invitationMessage } from "../config/event";
import { OrnamentDivider } from "./OrnamentDivider";

export function InvitationMessage() {
  return (
    <section className="section section--center">
      <div className="section__inner">
        <OrnamentDivider />
        <p className="body-text">{invitationMessage}</p>
        <OrnamentDivider />
      </div>
    </section>
  );
}
