import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import thunk from "redux-thunk";

import rootReducer from "./reducers/";

const initialState = {};

const middleware = [thunk]; //any middleware we use will be inside this array

const composeEnhancers = composeWithDevTools({
	// options like actionSanitizer, stateSanitizer
});
const store = createStore(
	rootReducer,
	/* preloadedState, */ composeEnhancers(
		applyMiddleware(...middleware)
		// other store enhancers if any
	)
);

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(
// 	rootReducer,
// 	initialState,
// 	compose(
// 		applyMiddleware(...middleware),
// 		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
// 	)
// );

export default store;
