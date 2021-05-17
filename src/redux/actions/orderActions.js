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
} from "../types";
import {
  hideLoader,
  showLoader,
  showFullAlert,
  hideFullAlert,
} from "./actions";
import { server } from "../../config/config.json";

export function createOrder(form, files, client) {
  return async (dispatch) => {
    try {
      dispatch(showLoader());
      dispatch({ type: CREATE_ORDER, payload: null });
      const query = await fetch(`${server}/api/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          form: form,
          files: files,
          client,
        }),
      });
      const json = await query.json();
      dispatch({ type: CREATE_ORDER, payload: json });
      dispatch(hideLoader());
      dispatch(showFullAlert(json));
      // if (json.error) {
      //   dispatch(showAlert(json.message));
      // }
    } catch (e) {
      console.log(e.message);
    }
  };
}

export function updateOrder(id, form, files) {
  return async (dispatch) => {
    try {
      dispatch(showLoader());
      dispatch({ type: UPDATE_ORDER, payload: null });
      const query = await fetch(`${server}/api/update-order/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          form: form,
          files: files,
        }),
      });
      const json = await query.json();
      dispatch({ type: UPDATE_ORDER, payload: json });
      dispatch(hideLoader());
      dispatch(showFullAlert(json));
    } catch (e) {
      console.log(e.message);
    }
  };
}

export function getTasks() {
  return async (dispatch) => {
    try {
      const query = await fetch(`${server}/api/get-tasks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });
      const json = await query.json();
      dispatch({ type: GET_TASKS, payload: json });
    } catch (e) {
      console.log(e.message);
    }
  };
}

export function getUserList() {
  return async (dispatch) => {
    try {
      const response = await fetch(`${server}/api/get-users-data`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });
      const json = await response.json();
      dispatch({ type: GET_USER_LIST, payload: json });
    } catch (e) {
      console.log(e.message);
    }
  };
}

export function getSpec(id) {
  return async (dispatch) => {
    try {
      const query = await fetch(`${server}/api/get-spec`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          task_id: id,
        }),
      });
      const json = await query.json();
      dispatch({ type: GET_SPEC, payload: json });
    } catch (e) {
      console.log(e.message);
    }
  };
}

export function getSubSpec(id) {
  return async (dispatch) => {
    try {
      const query = await fetch(`${server}/api/get-sub-spec`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          spec_id: id,
        }),
      });
      const json = await query.json();
      dispatch({ type: GET_SUB_SPEC, payload: json });
    } catch (e) {
      console.log(e.message);
    }
  };
}

export function getOrders(param, userId, struct_id) {
  return async (dispatch) => {
    try {
      dispatch(showLoader());
      const query = await fetch(`${server}/api/get-orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          param,
          userId,
          struct_id,
        }),
      });
      const json = await query.json();
      dispatch({ type: GET_ORDERS, payload: json });
      dispatch(hideLoader());
    } catch (e) {
      console.log(e.message);
    }
  };
}

export function getFOrders(param, userId, form) {
  return async (dispatch) => {
    try {
      dispatch(showLoader());
      const query = await fetch(`${server}/api/get-filter-orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          param,
          userId,
          form,
        }),
      });
      const json = await query.json();
      dispatch({ type: GET_ORDERS, payload: json });
      dispatch(hideLoader());
    } catch (e) {
      console.log(e.message);
    }
  };
}

export function getCount(userId) {
  return async (dispatch) => {
    try {
      const query = await fetch(`${server}/api/get-count`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          userId,
        }),
      });
      const json = await query.json();
      dispatch({ type: GET_COUNT, payload: json });
    } catch (e) {
      console.log(e.message);
    }
  };
}

export function getOrder(id) {
  return async (dispatch) => {
    try {
      dispatch({ type: TAKE_IN_WORK, payload: null });
      dispatch({ type: CANCEL_ORDER, payload: null });
      dispatch({ type: DONE_ORDER, payload: null });
      dispatch(hideFullAlert());
      dispatch(showLoader());
      const query = await fetch(`${server}/api/get-order/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });
      const json = await query.json();
      dispatch({ type: GET_ORDER, payload: json });
      dispatch(hideLoader());
    } catch (e) {
      console.log(e.message);
    }
  };
}

export function takeInWork(id, userId, param) {
  return async (dispatch) => {
    try {
      dispatch(hideFullAlert());
      dispatch(showLoader());
      const query = await fetch(`${server}/api/take-in-work-order/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          userId,
          param,
        }),
      });
      const json = await query.json();
      dispatch({ type: TAKE_IN_WORK, payload: json });
      dispatch(hideLoader());
      dispatch(showFullAlert(json));
    } catch (e) {
      console.log(e.message);
    }
  };
}

export function cancelOrder(id, userId, param) {
  return async (dispatch) => {
    try {
      dispatch(hideFullAlert());
      dispatch(showLoader());
      const query = await fetch(`${server}/api/cancel-order/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          userId,
          param,
        }),
      });
      const json = await query.json();
      dispatch({ type: CANCEL_ORDER, payload: json });
      dispatch(hideLoader());
      dispatch(showFullAlert(json));
    } catch (e) {
      console.log(e.message);
    }
  };
}

export function doneOrder(id, userId, param) {
  return async (dispatch) => {
    try {
      dispatch(hideFullAlert());
      dispatch(showLoader());
      const query = await fetch(`${server}/api/done-order/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          userId,
          param,
        }),
      });
      const json = await query.json();
      dispatch({ type: DONE_ORDER, payload: json });
      dispatch(hideLoader);
      dispatch(showFullAlert(json));
      // dispatch({ type: TAKE_IN_WORK, payload: null });
    } catch (e) {
      console.log(e.message);
    }
  };
}

export function addComment(id, form, files) {
  return async (dispatch) => {
    try {
      dispatch(showLoader());
      const query = await fetch(`${server}/api/add-comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          id,
          form,
          files,
        }),
      });
      const json = await query.json();
      dispatch({ type: ADD_COMMENT, payload: json });
      dispatch(hideLoader());
    } catch (e) {
      console.log(e.message);
    }
  };
}
export function addUnderComment(id, userId, text, orderId, mark) {
  return async (dispatch) => {
    try {
      dispatch(showLoader());
      const query = await fetch(`${server}/api/add-under-comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          id,
          userId,
          text,
          orderId,
          mark,
        }),
      });
      const json = await query.json();
      dispatch({ type: ADD_UNDER_COMMENT, payload: json });
      dispatch(hideLoader());
    } catch (e) {
      console.log(e.message);
    }
  };
}
export function getComments(id) {
  return async (dispatch) => {
    try {
      dispatch(showLoader());
      const query = await fetch(`${server}/api/get-comments/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });
      const json = await query.json();
      dispatch({ type: GET_COMMENT, payload: json });
      dispatch(hideLoader());
    } catch (e) {
      console.log(e.message);
    }
  };
}
export function getUnderComments(id) {
  return async (dispatch) => {
    try {
      const query = await fetch(`${server}/api/get-under-comments/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });
      const json = await query.json();
      dispatch({ type: GET_UNDER_COMMENT, payload: json });
    } catch (e) {
      console.log(e.message);
    }
  };
}

export function deleteOrder(id) {
  return async (dispatch) => {
    try {
      dispatch(showLoader());
      const query = await fetch(`${server}/api/delete-order/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });
      const json = await query.json();
      dispatch({ type: DELETE_ORDER, payload: json });
      dispatch(hideLoader());
      dispatch(showFullAlert(json));
    } catch (e) {
      console.log(e.message);
    }
  };
}

export function getOrderParty(id) {
  return async (dispatch) => {
    try {
      const query = await fetch(`${server}/api/get-order-party/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });
      const json = await query.json();
      dispatch({ type: GET_ORDER_PARTY, payload: json });
    } catch (e) {
      console.log(e.message);
    }
  };
}

export function addOrderParty(orderId, data) {
  return async (dispatch) => {
    try {
      const query = await fetch(`${server}/api/add-order-party`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          orderId,
          data,
        }),
      });
      const json = await query.json();
      dispatch({ type: ADD_ORDER_PARTY, payload: json });
    } catch (e) {
      console.log(e.message);
    }
  };
}
