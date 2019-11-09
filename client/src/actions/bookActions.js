//Where actions go, that is we will make requests to our backend.
import { GET_BOOKS, ADD_BOOK, DELETE_BOOK } from "./types";

//this function below will be called from component
export const getBooks = () => {
	return {
		type: GET_BOOKS
		// payload:
	};
};
//because it needs to delete by id
export const deleteBook = id => {
	return {
		type: DELETE_BOOK,
		payload: id
		//need to send payload because id needs to communicated to reducer to delete by id.
	};
};
