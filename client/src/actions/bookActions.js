//Where actions go, that is we will make requests to our backend.
import { GET_BOOKS, ADD_BOOK, DELETE_BOOK } from "./types";

export const getBooks = () => {
	return {
		type: GET_BOOKS
		// payload:
	};
};