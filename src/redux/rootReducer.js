import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { appReducer } from "./appReducer";
import { orderReducer } from "./orderReducer";
import { orderFilterReducer } from "./orderFilterReducer";
import { dashboardReducer } from "./dashboardReducer";
import { profileReducer } from "./profileReducer";
import { helpReducer } from "./helpReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  order: orderReducer,
  filter: orderFilterReducer,
  dashboard: dashboardReducer,
  profile: profileReducer,
  help: helpReducer,
});
