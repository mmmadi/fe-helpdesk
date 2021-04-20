import { Mail } from "./Mail";
import { WhatsApp } from "./WhatsApp";

export const Notifications = ({
  notifications,
  userNotifications,
  changeNotifyHandler,
}) => {
  return (
    <div
      className="tab-pane fade notification-tab"
      id="account-notifications"
      role="tabpanel"
      aria-labelledby="account-notifications-tab"
    >
      <Mail
        notifications={notifications}
        userNotifications={userNotifications}
        changeNotifyHandler={changeNotifyHandler}
      />
      <hr />
      <WhatsApp />
    </div>
  );
};
