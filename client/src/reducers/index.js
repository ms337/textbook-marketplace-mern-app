import { combineReducers } from "redux";
import bookReducer from "./bookReducer";
// import authReducer from './authReducer'; import separte reducers for the different resources

//these keys for each reducer are going to be user in the mapStateToProps function in each component
export default combineReducers({
	book: bookReducer
});
