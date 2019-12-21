import { GET_MESSAGES, SENT_MESSAGE, DELETE_MESSAGE, MESSAGES_LOADING } from "../actions/types";

const initialState = {
	messages: [],
	loading: false //need to b/c data could take time time, once request is made, set to true
};

//action will have a type
export default function(state = initialState, action) {
	//depending on which type
	switch (action.type) {
		case GET_MESSAGES:
			return {
				...state, //copying the state
				messages: action.payload, //adding items to this copy
				loading: false //set loading back
			};

		//can access payloads through action.payload
		case DELETE_MESSAGE:
			return {
				...state,
				//check this
				messages: state.messages.filter(message => message._id != action.payload)
			};
		case SENT_MESSAGE:
			return {
				...state,
				messages: [action.payload, ...state.message]
			};
		case MESSAGES_LOADING:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
}
