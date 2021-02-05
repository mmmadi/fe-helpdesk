import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { appReducer } from "./appReducer";

export const rootReducer = combineReducers({
  data: authReducer,
  app: appReducer,
});
