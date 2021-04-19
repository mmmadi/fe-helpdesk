import { server } from "../../config/config.json";
import { GET_DASHBOARD_DATA } from "../types";
import { hideLoader, showLoader } from "./actions";

export function getDashboardData(haveTask, userId, struct_id) {
  return async (dispatch) => {
    try {
      dispatch(showLoader());
      const query = await fetch(`${server}/api/get-dashboard-data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          haveTask,
          userId,
          struct_id,
        }),
      });
      const json = await query.json();
      dispatch({ type: GET_DASHBOARD_DATA, payload: json });
      dispatch(hideLoader());
    } catch (e) {
      console.log(e.message);
    }
  };
}
