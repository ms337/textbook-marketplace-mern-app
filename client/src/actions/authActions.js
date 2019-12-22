//If we get error its going to go through error actions

import axios from "axios";
import { returnErrors } from "./errorActions";
import {
	AUTH_ERROR,
	USER_LOADED,
	USER_LOADING,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGOUT_SUCCESS,
	LOGIN_SUCCESS,
	LOGIN_FAIL
} from "../actions/types";

//Check token and load user
export const loadUser = () => (dispatch, getState) => {
	//User loading

	dispatch({ type: USER_LOADING });

	//Get token from local storage

	axios
		.get("/api/auth/user", tokenConfig(getState))
		.then(
			res => dispatch({ type: USER_LOADED, payload: res.data }) //payload contains user object and token
		)
		.catch(err => {
			console.log(err);
			// dispatch(returnErrors(err.response.data, err.response.status));
			dispatch({ type: AUTH_ERROR });
		});
	//Any error we get we want to run it through are errorReducer
};

//Register User
export const register = ({ name, email, password }) => dispatch => {
	//destructuring right here
	//headers, need to add a header value of content type
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	};
	//Request body: thhe request data we are going to send
	const body = JSON.stringify({ name, email, password });

	axios
		.post("/api/users", body, config) //data, headers
		.then(res =>
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data //everything in the data
			})
		)
		.catch(err => {
			console.log(err);
			dispatch(returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")); //errors
			dispatch({
				type: REGISTER_FAIL
			});
		});
};

//LOGIN USER

export const login = ({ email, password }) => dispatch => {
	//destructuring right here
	//headers, need to add a header value of content type
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	};
	//Request body: thhe request data we are going to send
	const body = JSON.stringify({ email, password });

	axios
		.post("/api/auth", body, config) //data, headers
		.then(res =>
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data //everything in the data
			})
		)
		.catch(err => {
			dispatch(returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")); //errors
			dispatch({
				type: LOGIN_FAIL
			});
		});
};

//LOGOUT USER

export const logout = () => {
	return {
		type: LOGOUT_SUCCESS
	};
};
//Request body

//Setup config/headers and token

// WHENEVER WE NEED TO SEND TOKEN TO AN ENDPOINT, WE JUST USE THIS
export const tokenConfig = getState => {
	const token = getState().auth.token;

	//Headers
	//With axios we set an object and then add a headers object inside it.
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	};

	//If token, then add to headers

	if (token) {
		config.headers["x-auth-token"] = token;
	}

	return config;
};
