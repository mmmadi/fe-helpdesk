import {
  GET_F_EXECUTOR,
  GET_F_SPEC,
  GET_F_STATUS,
  GET_F_SUB_SPEC,
} from "./types";

const initialState = {
  f_spec: null,
  f_sub_spec: null,
  f_executor: null,
  f_status: null,
};

export const orderFilterReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_F_SPEC:
      return {
        ...state,
        f_spec: action.payload,
      };
    case GET_F_SUB_SPEC:
      return {
        ...state,
        f_sub_spec: action.payload,
      };
    case GET_F_EXECUTOR:
      return {
        ...state,
        f_executor: action.payload,
      };
    case GET_F_STATUS:
      return {
        ...state,
        f_status: action.payload,
      };
    default:
      return state;
  }
};
