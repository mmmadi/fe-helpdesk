import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { appReducer } from "./appReducer";
import { orderReducer } from "./orderReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  order: orderReducer,
});
