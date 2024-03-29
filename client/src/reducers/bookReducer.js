import { GET_BOOKS, ADD_BOOK, DELETE_BOOK, BOOKS_LOADING } from "../actions/types";

const initialState = {
	books: [],
	loading: false,
	searchOnce: false //need to b/c data could take time time, once request is made, set to true
};

//action will have a type
export default function(state = initialState, action) {
	//depending on which type
	switch (action.type) {
		case GET_BOOKS:
			return {
				...state, //copying the state
				books: action.payload, //adding items to this copy
				loading: false,
				searchOnce: true //set loading back
			};

		//can access payloads through action.payload
		case DELETE_BOOK:
			return {
				...state,
				books: state.books.filter(book => book._id != action.payload)
			};
		case ADD_BOOK:
			return {
				...state,
				books: [action.payload, ...state.books]
			};
		case BOOKS_LOADING:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
}
