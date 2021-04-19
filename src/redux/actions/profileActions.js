import { server } from "../../config/config.json";
import {
  CHANGE_GENERAL_SETTINGS,
  CHANGE_PASSWORD,
  GET_GENERAL_SETTINGS,
  GET_USER_IMG,
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
      dispatch({ type: GET_GENERAL_SETTINGS, payload: json });
      dispatch({ type: GET_USER_IMG, payload: json[1] });
      dispatch(hideLoader());
    } catch (e) {
      console.log(e.message);
    }
  };
}

export function changeGeneral(userId, img) {
  return async (dispatch) => {
    try {
      dispatch(showLoader());
      const query = await fetch(
        `${server}/api/profile/change-general-settings/${userId}`,
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
      dispatch({ type: CHANGE_GENERAL_SETTINGS, payload: json });
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
