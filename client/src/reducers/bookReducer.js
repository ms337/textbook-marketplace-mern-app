import uuid from "uuid"; //just for testing

import { GET_BOOKS, ADD_BOOK, DELETE_BOOK } from "../actions/types";

const initialState = {
	books: [
		{ id: uuid(), name: "Book1" },
		{ id: uuid(), name: "Book2" },
		{ id: uuid(), name: "Book3" },
		{ id: uuid(), name: "Book4" }
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
		default:
			return state;
	}
}
