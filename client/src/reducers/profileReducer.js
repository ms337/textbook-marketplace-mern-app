import { USER_LOADING, USER_LOADED, USER_DELETED, USER_DEL_ERROR } from "../actions/types";

const initialState = {
	token: localStorage.getItem("token"),
	isLoading: false,
	user: null
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
				isLoading: false,
				user: action.payload //will send user as payload
			};
		case USER_DELETED:
			localStorage.removeItem("token"); //remove any token in local storage
			return {
				...state,
				token: null,
				user: null,
				isLoading: false
			};
		case USER_DEL_ERROR:
			return {
				...state
			};
		default:
			return state;
	}
}
