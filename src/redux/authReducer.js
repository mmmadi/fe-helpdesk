import { GET_USERS, LOGIN, LOGOUT } from "./types";

const initialState = {
  data: {},
  users: null,
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
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};
