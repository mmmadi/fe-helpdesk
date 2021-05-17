import {
  ADD_COMMENT,
  ADD_ORDER_PARTY,
  ADD_UNDER_COMMENT,
  CANCEL_ORDER,
  CREATE_ORDER,
  DELETE_ORDER,
  DONE_ORDER,
  GET_COMMENT,
  GET_COUNT,
  GET_ORDER,
  GET_ORDERS,
  GET_ORDER_PARTY,
  GET_SPEC,
  GET_SUB_SPEC,
  GET_TASKS,
  GET_UNDER_COMMENT,
  GET_USER_LIST,
  TAKE_IN_WORK,
  UPDATE_ORDER,
} from "./types";

const initialState = {
  data: null,
  update: null,
  tasks: null,
  spec: null,
  sub_spec: null,
  orders: null,
  count: null,
  order: null,
  inWork: null,
  cancel: null,
  done: null,
  comment: null,
  underComment: null,
  delete: null,
  orderParty: null,
  userList: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_LIST:
      return {
        ...state,
        userList: action.payload,
      };
    case CREATE_ORDER:
      return {
        ...state,
        data: action.payload,
      };
    case UPDATE_ORDER:
      return {
        ...state,
        update: action.payload,
      };
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    case GET_SPEC:
      return {
        ...state,
        spec: action.payload,
      };
    case GET_SUB_SPEC:
      return {
        ...state,
        sub_spec: action.payload,
      };
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case GET_COUNT:
      return {
        ...state,
        count: action.payload,
      };
    case GET_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    case TAKE_IN_WORK:
      return {
        ...state,
        inWork: action.payload,
      };
    case CANCEL_ORDER:
      return {
        ...state,
        cancel: action.payload,
      };
    case DONE_ORDER:
      return {
        ...state,
        done: action.payload,
      };
    case GET_COMMENT:
      return {
        ...state,
        comment: action.payload,
      };
    case ADD_COMMENT:
      return {
        ...state,
        comment: action.payload,
      };
    case GET_UNDER_COMMENT:
      return {
        ...state,
        underComment: action.payload,
      };
    case ADD_UNDER_COMMENT:
      return {
        ...state,
        underComment: action.payload,
      };
    case DELETE_ORDER:
      return {
        ...state,
        delete: action.payload,
      };
    case GET_ORDER_PARTY:
      return {
        ...state,
        orderParty: action.payload,
      };
    case ADD_ORDER_PARTY:
      return {
        ...state,
        orderParty: action.payload,
      };
    default:
      return state;
  }
};
