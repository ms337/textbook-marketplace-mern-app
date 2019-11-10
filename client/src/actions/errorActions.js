import { GET_ERRORS, CLEAR_ERRORS } from "./types";

//RETURN ERROS

export const returnErrors = (message, status, id = null) => {
	return {
		type: GET_ERRORS,
		payload: { message, status, id }
	};
};

//CLEAR ERRORS

export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS
	};
};
