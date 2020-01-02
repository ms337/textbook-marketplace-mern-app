import axios from "axios";
import { returnErrors } from "./errorActions";
import { USER_LOADED, AUTH_ERROR, USER_DELETED, USER_DEL_ERROR } from "../actions/types";

import { tokenConfig } from "./authActions";

export const getProfile = () => (dispatch, getState) => {
	//Get token from local storage

	axios
		.get("/api/users", tokenConfig(getState))
		.then(
			res => dispatch({ type: USER_LOADED, payload: res.data }) //payload contains user object and token
		)
		.catch(err => {
			dispatch(returnErrors(err.response.data, err.response.status));
			dispatch({ type: AUTH_ERROR });
		});
	//Any error we get we want to run it through are errorReducer
};

export const deleteUser = () => (dispatch, getState) => {
	//Get token from local storage

	axios
		.delete("/api/users", tokenConfig(getState))
		.then(
			res => dispatch({ type: USER_DELETED, payload: res.data }) //payload contains user object and token
		)
		.catch(err => {
			dispatch(returnErrors(err.response.data, err.response.status));
			dispatch({ type: USER_DEL_ERROR });
		});
	//Any error we get we want to run it through are errorReducer
};
