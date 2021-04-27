import { Mail } from "./Mail";
import { Telegram } from "./Telegram";

export const Notifications = ({
  teleId,
  notifications,
  userNotifications,
  userTelegram,
  changeNotifyHandler,
  changeTelegramNotifyHandler,
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
      <Telegram
        teleId={teleId}
        notifications={notifications}
        userTelegram={userTelegram}
        changeTelegramNotifyHandler={changeTelegramNotifyHandler}
      />
    </div>
  );
};
