import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../../components/Navbar";
import { List } from "../../components/profile/List";
import { General } from "../../components/profile/General";
import { ChangePassword } from "../../components/profile/ChangePassword";
import { Info } from "../../components/profile/Info";
import { Notifications } from "../../components/profile/Notifications/Notifications";
import {
  changeAvatar,
  changeGeneral,
  changeNotifications,
  getGeneral,
  changeTelegramNotifications,
} from "../../redux/actions/profileActions";
import { hideFullAlert } from "../../redux/actions/actions";
import { FullAlert } from "../../components/FullAlert";

export const UserProfile = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.data.userId);
  const alert = useSelector((state) => state.app.fullAlert);
  const {
    general,
    userImg,
    notificationsSett,
    userNotifications,
    userTelegram,
  } = useSelector((state) => state.profile);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    dispatch(getGeneral(userId));
  }, [dispatch, userId]);

  const changeAvatarHandler = (img) => {
    dispatch(changeAvatar(userId, img));
  };

  const changeGeneralHandler = (phone) => {
    dispatch(changeGeneral(userId, phone));
  };

  const changeNotifyHandler = (notifications) => {
    dispatch(changeNotifications(userId, notifications));
  };

  const changeTelegramNotifyHandler = (notifications, id) => {
    dispatch(changeTelegramNotifications(userId, notifications, id));
  };

  const getErrors = (message) => {
    setErrors(message);
  };

  const closeFullAlert = () => {
    setErrors(null);
  };

  const closeAlert = () => {
    dispatch(hideFullAlert());
  };

  return (
    <div className="layout-container">
      <Navbar />
      <div className="layout-content">
        <div className="profile container-fluid flex-grow-1 container-p-y">
          <h4 className="font-weight-bold mb-4">Редактирование профиля</h4>
          <div className="card">
            <div className="row no-gutters row-bordered row-border-light">
              <div className="col-md-3 pt-0">
                <List />
              </div>
              <div className="col-md-9 pt-0 profile-tabs">
                <div className="tab-content with-errors">
                  {errors ? (
                    <FullAlert
                      message={errors}
                      type={"danger"}
                      section={true}
                      close={closeFullAlert}
                    />
                  ) : null}
                  {alert ? (
                    <FullAlert
                      message={alert}
                      type={"success"}
                      section={true}
                      close={closeAlert}
                    />
                  ) : null}
                  <General
                    data={general}
                    userImg={userImg}
                    changeAvatar={changeAvatarHandler}
                    changeGeneral={changeGeneralHandler}
                    userId={userId}
                  />
                  <ChangePassword getErrors={getErrors} />
                  <Info />
                  <Notifications
                    teleId={general ? general[0].telegram_id : null}
                    notifications={notificationsSett}
                    userNotifications={userNotifications}
                    userTelegram={userTelegram}
                    changeNotifyHandler={changeNotifyHandler}
                    changeTelegramNotifyHandler={changeTelegramNotifyHandler}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
