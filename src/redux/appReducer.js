import {
  HIDE_LOADER,
  SHOW_LOADER,
  SHOW_ALERT,
  HIDE_ALERT,
  SHOW_FULL_ALERT,
  HIDE_FULL_ALERT,
  GET_NOTIFICATIONS,
} from "./types";

const initialState = {
  loading: false,
  alert: null,
  fullAlert: null,
  notifications: null,
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOADER:
      return { ...state, loading: true };
    case HIDE_LOADER:
      return { ...state, loading: false };
    case SHOW_ALERT:
      return { ...state, alert: action.payload };
    case HIDE_ALERT:
      return { ...state, alert: null };
    case SHOW_FULL_ALERT:
      return { ...state, fullAlert: action.payload };
    case HIDE_FULL_ALERT:
      return { ...state, fullAlert: null };
    case GET_NOTIFICATIONS:
      return { ...state, notifications: action.payload };
    default:
      return state;
  }
};
