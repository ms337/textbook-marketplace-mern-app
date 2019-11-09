import uuid from "uuid"; //just for testing

import { GET_BOOKS, ADD_BOOK, DELETE_BOOK } from "../actions/types";

const initialState = {
	books: [
		{ id: uuid(), name: "Book1" },
		{ id: uuid(), name: "Book2" },
		{ id: uuid(), name: "Book3" },
		{ id: uuid(), name: "Changed" }
	]
};

//action will have a type
export default function(state = initialState, action) {
	//depending on which type
	switch (action.type) {
		case GET_BOOKS:
			return {
				...state //fetches only state
			};

		//can access payloads through action.payload
		case DELETE_BOOK:
			return {
				...state,
				books: state.books.filter(book => book.id != action.payload)
			};
		default:
			return state;
	}
}
