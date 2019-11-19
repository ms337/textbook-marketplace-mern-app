//Where actions go, that is we will make requests to our backend.
import { GET_BOOKS, ADD_BOOK, DELETE_BOOK, BOOKS_LOADING } from "./types";
import axios from "axios";

import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

//this function below will be called from component
export const getBooks = () => dispatch => {
	//dispatch to send type along with data to reducer
	dispatch(setBooksLoading());
	axios
		.get("/api/books") //uses proxy in package.json; returns a promise
		.then(res => {
			dispatch({
				type: GET_BOOKS,
				payload: res.data
			});
		})
		.catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
//because it needs to delete by id
export const deleteBook = id => (dispatch, getState) => {
	axios
		.delete(`/api/books/${id}`, tokenConfig(getState)) //attaches token to request
		.then(res =>
			dispatch({
				type: DELETE_BOOK,
				payload: id
			})
		)
		.catch(err => {
			console.log(err.response.data);
			dispatch(returnErrors(err.response.data, err.response.status));
		});
};

export const addBook = newBook => (dispatch, getState) => {
	axios
		.post("/api/books/", newBook, tokenConfig(getState))
		.then(res =>
			dispatch({
				type: ADD_BOOK,
				payload: res.data
			})
		)
		.catch(err => {
			console.log(err.response.data);
			dispatch(returnErrors(err.response.data, err.response.status));
		});
};

export const setBooksLoading = () => {
	return {
		type: BOOKS_LOADING
	};
};
