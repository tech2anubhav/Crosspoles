import { applyMiddleware, createStore } from "redux";

// thunk allow us to perform async action
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducers from "./reducers";

const persistConfig = {
  key: "authState",
  storage: storage,
  whitelist: [], // which reducer want to store
};
const pReducer = persistReducer(persistConfig, reducers);

const store = createStore(
  pReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);
const persistor = persistStore(store);

// export default store;
export { persistor, store };
