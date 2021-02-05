import {
  HIDE_ALERT,
  HIDE_LOADER,
  LOGOUT,
  SHOW_ALERT,
  SHOW_LOADER,
} from "./types";
import { LOGIN } from "./types";

export function login(form) {
  return async (dispatch) => {
    try {
      dispatch(showLoader());
      const response = await fetch("http://localhost:5000/api/login", {
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
          id_dolgnost: json.id_dolgnost,
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
  return (dispatch) => {
    const data = JSON.parse(localStorage.getItem("userData"));

    if (data && data.token) {
      dispatch(lcLogin(data));
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
