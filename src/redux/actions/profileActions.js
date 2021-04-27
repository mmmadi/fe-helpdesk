import { server } from "../../config/config.json";
import {
  CHANGE_AVATAR,
  CHANGE_GENERAL_SETTINGS,
  CHANGE_NOTIFICATIONS,
  CHANGE_PASSWORD,
  GET_GENERAL_SETTINGS,
  GET_NOTIFICATIONS_SETTINGS,
  GET_USER_IMG,
  GET_USER_NOTIFICATIONS,
  GET_USER_TELEGRAM,
} from "../types";
import {
  hideFullAlert,
  hideLoader,
  showFullAlert,
  showLoader,
} from "./actions";

export function getGeneral(userId) {
  return async (dispatch) => {
    try {
      dispatch(showLoader());
      const query = await fetch(`${server}/api/profile/get-general-settings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          userId,
        }),
      });
      const json = await query.json();
      dispatch({ type: GET_GENERAL_SETTINGS, payload: json[0] });
      dispatch({ type: GET_USER_IMG, payload: json[1] });
      dispatch({ type: GET_USER_NOTIFICATIONS, payload: json[2] });
      dispatch({ type: GET_NOTIFICATIONS_SETTINGS, payload: json[3] });
      dispatch({ type: GET_USER_TELEGRAM, payload: json[4] });
      dispatch(hideLoader());
    } catch (e) {
      console.log(e.message);
    }
  };
}

export function changeAvatar(userId, img) {
  return async (dispatch) => {
    try {
      dispatch(showLoader());
      const query = await fetch(
        `${server}/api/profile/change-avatar/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({
            img,
          }),
        }
      );
      const json = await query.json();
      dispatch({ type: CHANGE_AVATAR, payload: json });
      dispatch(hideLoader());
    } catch (e) {
      console.log(e.message);
    }
  };
}

export function changeGeneral(userId, phone) {
  return async (dispatch) => {
    try {
      dispatch(showLoader());
      dispatch(hideFullAlert());
      const query = await fetch(
        `${server}/api/profile/change-general-settings/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({
            phone,
          }),
        }
      );
      const json = await query.json();
      dispatch({ type: CHANGE_GENERAL_SETTINGS, payload: json });
      dispatch(showFullAlert(json));
      dispatch(hideLoader());
    } catch (e) {
      console.log(e.message);
    }
  };
}

export function changePassword(userId, newPass) {
  return async (dispatch) => {
    try {
      dispatch(hideFullAlert());
      dispatch(showLoader());
      const query = await fetch(
        `${server}/api/profile/change-password/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({
            newPass,
          }),
        }
      );
      const json = await query.json();
      dispatch({ type: CHANGE_PASSWORD, payload: json });
      dispatch(showFullAlert(json));
      dispatch(hideLoader());
    } catch (e) {
      console.log(e.message);
    }
  };
}

export function changeNotifications(userId, notifications) {
  return async (dispatch) => {
    try {
      dispatch(showLoader());
      dispatch(hideFullAlert());
      const query = await fetch(
        `${server}/api/profile/change-notifications/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({
            notifications,
          }),
        }
      );
      const json = await query.json();
      dispatch({ type: CHANGE_NOTIFICATIONS, payload: json });
      dispatch(showFullAlert(json));
      dispatch(hideLoader());
    } catch (e) {
      console.log(e.message);
    }
  };
}

export function changeTelegramNotifications(userId, notifications, id) {
  return async (dispatch) => {
    try {
      dispatch(showLoader());
      dispatch(hideFullAlert());
      const query = await fetch(
        `${server}/api/profile/change-telegram-notifications/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({
            notifications,
            telegram_id: id,
          }),
        }
      );
      const json = await query.json();
      dispatch({ type: CHANGE_NOTIFICATIONS, payload: json });
      dispatch(showFullAlert(json));
      dispatch(hideLoader());
    } catch (e) {
      console.log(e.message);
    }
  };
}
