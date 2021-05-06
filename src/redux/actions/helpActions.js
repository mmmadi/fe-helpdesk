import {
  CREATE_HELP_CATEGORY,
  GET_HELP_CATEGORY,
  DELETE_HELP_CATEGORY,
  UPDATE_HELP_CATEGORY,
  GET_HELP_ITEMS,
  CREATE_HELP_ITEM,
  DELETE_HELP_ITEM,
  UPDATE_HELP_ITEM,
} from "../types";
import { server } from "../../config/config.json";
import { showFullAlert } from "../actions/actions";

export function getHelpCategories() {
  return async (dispatch) => {
    try {
      const query = await fetch(`${server}/api/help/get-categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });
      const json = await query.json();
      dispatch({ type: GET_HELP_CATEGORY, payload: json });
    } catch (e) {
      console.log(e.message);
    }
  };
}

export function createCategory(name, icon) {
  return async (dispatch) => {
    try {
      const query = await fetch(`${server}/api/help/create-category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          name,
          icon,
        }),
      });
      const json = await query.json();
      dispatch({ type: CREATE_HELP_CATEGORY, payload: json });
      dispatch(showFullAlert(json));
    } catch (e) {
      console.log(e.message);
    }
  };
}

export function deleteCategory(id) {
  return async (dispatch) => {
    try {
      const query = await fetch(`${server}/api/help/delete-category/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });
      const json = await query.json();
      dispatch({ type: DELETE_HELP_CATEGORY, payload: json });
      dispatch(getHelpCategories());
      dispatch(showFullAlert(json));
    } catch (e) {
      console.log(e.message);
    }
  };
}

export function updateCategory(id, name, icon) {
  return async (dispatch) => {
    try {
      const query = await fetch(`${server}/api/help/update-category/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          name,
          icon,
        }),
      });
      const json = await query.json();
      dispatch({ type: UPDATE_HELP_CATEGORY, payload: json });
      dispatch(getHelpCategories());
      dispatch(showFullAlert(json));
    } catch (e) {
      console.log(e.message);
    }
  };
}

export function getHelpItems() {
  return async (dispatch) => {
    try {
      const query = await fetch(`${server}/api/help/get-help-items`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });
      const json = await query.json();
      dispatch({ type: GET_HELP_ITEMS, payload: json });
    } catch (e) {
      console.log(e.message);
    }
  };
}

export function createHelpItem(name, categoryId, text, files) {
  return async (dispatch) => {
    try {
      const query = await fetch(`${server}/api/help/create-item`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          name,
          categoryId,
          text,
          files,
        }),
      });
      const json = await query.json();
      dispatch({ type: CREATE_HELP_ITEM, payload: json });
      dispatch(showFullAlert(json));
    } catch (e) {
      console.log(e.message);
    }
  };
}

export function deleteItem(id, help_category_id) {
  return async (dispatch) => {
    try {
      const query = await fetch(`${server}/api/help/delete-item/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          help_category_id,
        }),
      });
      const json = await query.json();
      dispatch({ type: DELETE_HELP_ITEM, payload: json });
      dispatch(showFullAlert(json));
    } catch (e) {
      console.log(e.message);
    }
  };
}

export function updateItem(id, name, categoryId, text, files) {
  return async (dispatch) => {
    try {
      const query = await fetch(`${server}/api/help/update-item/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          name,
          categoryId,
          text,
          files,
        }),
      });
      const json = await query.json();
      dispatch({ type: UPDATE_HELP_ITEM, payload: json });
      dispatch(getHelpCategories());
      dispatch(showFullAlert(json));
    } catch (e) {
      console.log(e.message);
    }
  };
}
