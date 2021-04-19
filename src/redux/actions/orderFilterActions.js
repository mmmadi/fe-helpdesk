import { server } from "../../config/config.json";
import {
  GET_F_EXECUTOR,
  GET_F_SPEC,
  GET_F_STATUS,
  GET_F_SUB_SPEC,
} from "../types";

export function getSpecFilter(struct_id) {
  return async (dispatch) => {
    try {
      const query = await fetch(`${server}/api/get-filter-spec`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          struct_id,
        }),
      });
      const json = await query.json();
      dispatch({ type: GET_F_SPEC, payload: json });
    } catch (e) {}
  };
}

export function getSubSpecFilter(spec_id) {
  return async (dispatch) => {
    try {
      const query = await fetch(`${server}/api/get-filter-sub-spec`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          spec_id,
        }),
      });
      const json = await query.json();
      dispatch({ type: GET_F_SUB_SPEC, payload: json });
    } catch (e) {}
  };
}

export function getExecutorFilter(struct_id) {
  return async (dispatch) => {
    try {
      const query = await fetch(`${server}/api/get-filter-executor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          struct_id,
        }),
      });
      const json = await query.json();
      dispatch({ type: GET_F_EXECUTOR, payload: json });
    } catch (e) {}
  };
}

export function getStatusFilter() {
  return async (dispatch) => {
    try {
      const query = await fetch(`${server}/api/get-filter-status`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });
      const json = await query.json();
      dispatch({ type: GET_F_STATUS, payload: json });
    } catch (e) {}
  };
}
