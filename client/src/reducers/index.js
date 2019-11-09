import { combineReducers } from "redux";
import bookReducer from "./bookReducer";
// import authReducer from './authReducer'; import separte reducers for the different resources

export default combineReducers({
	book: bookReducer
});
