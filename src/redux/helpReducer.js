import {
  CREATE_HELP_CATEGORY,
  CREATE_HELP_ITEM,
  DELETE_HELP_CATEGORY,
  DELETE_HELP_ITEM,
  GET_HELP_CATEGORY,
  GET_HELP_ITEMS,
  UPDATE_HELP_CATEGORY,
  UPDATE_HELP_ITEM,
} from "./types";

const initialState = {
  categories: null,
  createCategory: null,
  deleteCategory: null,
  updateCategory: null,
  helpItems: null,
  createItem: null,
  deleteItem: null,
  updateItem: null,
};

export const helpReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_HELP_CATEGORY:
      return {
        ...state,
        categories: action.payload,
      };
    case CREATE_HELP_CATEGORY:
      return {
        ...state,
        createCategory: action.payload,
      };
    case DELETE_HELP_CATEGORY:
      return {
        ...state,
        deleteCategory: action.payload,
      };
    case UPDATE_HELP_CATEGORY:
      return {
        ...state,
        deleteCategory: action.payload,
      };
    case GET_HELP_ITEMS:
      return {
        ...state,
        helpItems: action.payload,
      };
    case CREATE_HELP_ITEM:
      return {
        ...state,
        createItem: action.payload,
      };
    case DELETE_HELP_ITEM:
      return {
        ...state,
        deleteItem: action.payload,
      };
    case UPDATE_HELP_ITEM:
      return {
        ...state,
        updateItem: action.payload,
      };
    default:
      return state;
  }
};
