import {
  HIDE_ALERT,
  HIDE_LOADER,
  LOGOUT,
  SHOW_ALERT,
  SHOW_LOADER,
  LOGIN,
  SHOW_FULL_ALERT,
  HIDE_FULL_ALERT,
} from "../types";
import { server } from "../../config/config.json";

export function login(form) {
  return async (dispatch) => {
    try {
      dispatch(showLoader());
      const response = await fetch(`${server}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(form),
      });
      const json = await response.json();
      dispatch({ type: LOGIN, payload: json });
      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId: json.userId,
          email: json.email,
          token: json.token,
          fio: json.fio,
          id_struct: json.id_struct,
          have_task: json.have_task,
        })
      );
      dispatch(hideLoader());

      if (json.error) {
        dispatch(showAlert(json.message));
      }
    } catch (e) {
      console.log(e.message);
    }
  };
}

export function lcLogin(userData) {
  return (dispatch) => {
    dispatch({ type: LOGIN, payload: userData });
  };
}

export function checkAuth() {
  return async (dispatch) => {
    try {
      const data = JSON.parse(localStorage.getItem("userData"));

      if (data) {
        const response = await fetch(`${server}/api/check-auth`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Bearer ${data.token}`,
          },
        });
        const json = await response.json();
        const newData = { ...data, token: json.token };
        dispatch(lcLogin(newData));
        localStorage.setItem("userData", JSON.stringify(newData));
      }
      return;
    } catch (e) {
      console.log(e.message);
    }
  };
}

export function logout() {
  return (dispatch) => {
    dispatch({
      type: LOGOUT,
    });

    localStorage.removeItem("userData");
  };
}

export function showLoader() {
  return {
    type: SHOW_LOADER,
  };
}
export function hideLoader() {
  return {
    type: HIDE_LOADER,
  };
}
export function showAlert(message) {
  return (dispath) => {
    dispath({
      type: SHOW_ALERT,
      payload: message,
    });

    setTimeout(() => {
      dispath(hideAlert());
    }, 3000);
  };
}
export function hideAlert() {
  return {
    type: HIDE_ALERT,
  };
}

export function showFullAlert(message) {
  return (dispath) => {
    dispath({
      type: SHOW_FULL_ALERT,
      payload: message,
    });
  };
}
export function hideFullAlert() {
  return {
    type: HIDE_FULL_ALERT,
  };
}
