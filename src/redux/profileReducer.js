import {
  CHANGE_AVATAR,
  CHANGE_GENERAL_SETTINGS,
  CHANGE_NOTIFICATIONS,
  CHANGE_PASSWORD,
  GET_GENERAL_SETTINGS,
  GET_NOTIFICATIONS_SETTINGS,
  GET_USER_IMG,
  GET_USER_NOTIFICATIONS,
} from "./types";

const initialState = {
  general: null,
  userImg: null,
  changePass: null,
  notificationsSett: [],
  userNotifications: [],
  changeNotify: null,
  changeGeneral: null,
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GENERAL_SETTINGS:
      return {
        ...state,
        general: action.payload,
      };
    case CHANGE_GENERAL_SETTINGS:
      return {
        ...state,
        changeGeneral: action.payload,
      };
    case GET_USER_IMG:
      return {
        ...state,
        userImg: action.payload,
      };
    case CHANGE_AVATAR:
      return {
        ...state,
        userImg: action.payload,
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
        changePass: action.payload,
      };
    case GET_NOTIFICATIONS_SETTINGS:
      return {
        ...state,
        notificationsSett: action.payload,
      };
    case CHANGE_NOTIFICATIONS:
      return {
        ...state,
        changeNotify: action.payload,
      };
    case GET_USER_NOTIFICATIONS:
      return {
        ...state,
        userNotifications: action.payload,
      };
    default:
      return state;
  }
};
