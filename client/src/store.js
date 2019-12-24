import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import thunk from "redux-thunk";

import rootReducer from "./reducers/";

const initialState = {};

const middleware = [thunk]; //any middleware we use will be inside this array

const store = createStore(
	rootReducer,
	initialState,
	composeWithDevTools(
		applyMiddleware(...middleware),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
	)
);

export default store;
