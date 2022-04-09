import { combineReducers } from "redux";
import { userReducer } from "./userReducer";

const rootReducers = combineReducers({
  users: userReducer,
});

const reducers = function combinedRootReducer(state, action) {
  return rootReducers(state, action);
};

export default reducers;
