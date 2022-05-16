import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import counterSlice from "./slices/counterSlice.js";
import userSlice from "./slices/userSlice.js";
import persistStore from "redux-persist/lib/persistStore";
import persistReducer from "redux-persist/lib/persistReducer";
import storage from "redux-persist/lib/storage";
import {
	nextReduxCookieMiddleware,
	wrapMakeStore,
} from "next-redux-cookie-wrapper";

const persistConfig = {
	key: "root",
	storage,
};
const combinedReducer = combineReducers({
	counter: counterSlice,
	user: userSlice,
});

const persistedReducer = persistReducer(persistConfig, combinedReducer);

const store = createStore(
	persistedReducer,
	composeWithDevTools(
		applyMiddleware(
			nextReduxCookieMiddleware({
				subtrees: ["my.subtree"],
			})
		)
	)
);
export const persistor = persistStore(store);

const initStore = () => {
	return store;
};

export const wrapper = createWrapper(initStore);
