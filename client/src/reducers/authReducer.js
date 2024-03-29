import {
	USER_LOADING,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_DELETED,
	USER_DEL_ERROR
} from "../actions/types";

const initialState = {
	token: localStorage.getItem("token"),
	isAuthenticated: null,
	isLoading: false,
	user: null,
	justRegistered: false
};

//reducer function
export default function(state = initialState, action) {
	switch (action.type) {
		case USER_LOADING:
			//when we aretrying to get user from the backend, not yet fetched
			return {
				...state,
				isLoading: true
			};
		case USER_LOADED:
			//run with every request to see if we are logged in
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				user: action.payload //will send user as payload
			};
		case REGISTER_SUCCESS:
			return {
				...state,
				isAuthenticated: false,
				justRegistered: true,
				isLoading: false
			};
		case LOGIN_SUCCESS:
			localStorage.setItem("token", action.payload.token);
			return {
				...state,
				...action.payload, //this has user and token
				isAuthenticated: true,
				isLoading: false,
				justRegistered: false
			};
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case LOGOUT_SUCCESS:
		case REGISTER_FAIL:
		case USER_DELETED:
			localStorage.removeItem("token"); //remove any token in local storage
			return {
				...state,
				token: null,
				user: null,
				isAuthenticated: false,
				isLoading: false,
				justRegistered: false
			};
		case USER_DEL_ERROR:
			return {
				...state
			};
		default:
			return state;
	}
}
