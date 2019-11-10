import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

//needs to have initial
const initialState = {
	message: {},
	status: null,
	id: null
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_ERRORS:
			return {
				message: action.payload.message,
				status: action.payload.status,
				id: action.payload.id
			};
		//  dont want old errors hanging around in state
		case CLEAR_ERRORS:
			return {
				message: {},
				status: null,
				id: null
			};
		default:
			//returns state as it is
			return state;
	}
}
