//Where actions go, that is we will make requests to our backend.
import { GET_BOOKS, ADD_BOOK, DELETE_BOOK, BOOKS_LOADING } from "./types";
import axios from "axios";

//this function below will be called from component
export const getBooks = () => dispatch => {
	//dispatch to send type along with data to reducer
	dispatch(setBooksLoading());
	axios
		.get("/api/books") //uses proxy in package.json; returns a promise
		.then(res =>
			dispatch({
				type: GET_BOOKS,
				payload: res.data
			})
		);
};
//because it needs to delete by id
export const deleteBook = id => {
	return {
		type: DELETE_BOOK,
		payload: id
		//need to send payload because id needs to communicated to reducer to delete by id.
	};
};

export const addBook = newBook => dispatch => {
	axios.post("/api/books/", newBook).then(res =>
		dispatch({
			type: ADD_BOOK,
			payload: res.data
		})
	);
};

export const setBooksLoading = () => {
	return {
		type: BOOKS_LOADING
	};
};
