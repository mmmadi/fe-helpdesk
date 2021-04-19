import {
  CHANGE_GENERAL_SETTINGS,
  CHANGE_PASSWORD,
  GET_GENERAL_SETTINGS,
  GET_USER_IMG,
} from "./types";

const initialState = {
  general: null,
  userImg: null,
  changePass: null,
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GENERAL_SETTINGS:
      return {
        ...state,
        general: action.payload,
      };
    case GET_USER_IMG:
      return {
        ...state,
        userImg: action.payload,
      };
    case CHANGE_GENERAL_SETTINGS:
      return {
        ...state,
        userImg: action.payload,
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
        changePass: action.payload,
      };
    default:
      return state;
  }
};
