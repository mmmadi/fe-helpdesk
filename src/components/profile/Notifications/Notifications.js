import { Mail } from "./Mail";
import { WhatsApp } from "./WhatsApp";

export const Notifications = () => {
  return (
    <div
      className="tab-pane fade notification-tab"
      id="account-notifications"
      role="tabpanel"
      aria-labelledby="account-notifications-tab"
    >
      <Mail />
      <hr />
      <WhatsApp />
      <hr />
    </div>
  );
};
