import { GET_DASHBOARD_DATA } from "./types";

const initialState = {
  dashboardData: null,
};

export const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DASHBOARD_DATA:
      return {
        ...state,
        dashboardData: action.payload,
      };
    default:
      return state;
  }
};
