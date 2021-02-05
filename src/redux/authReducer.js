import { LOGIN, LOGOUT } from "./types";

const initialState = {
  data: {},
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        data: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        data: {},
      };
    default:
      return state;
  }
};
