import { GET_MESSAGES, SENT_MESSAGE, DELETE_MESSAGE, MESSAGES_LOADING } from "./types";
import axios from "axios";

import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const setMessagesLoading = () => {
	return {
		type: MESSAGES_LOADING
	};
};
export const getMessages = () => (dispatch, getState) => {
	dispatch(setMessagesLoading());
	axios
		.get("/api/chat", tokenConfig(getState))
		.then(res => {
			console.log(res.data);
			dispatch({
				type: GET_MESSAGES,
				payload: res.data
			});
		})
		.catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const deleteMessage = id => (dispatch, getState) => {
	axios
		.delete(`api/chat/${id}`, tokenConfig(getState))
		.then(res => ({
			type: DELETE_MESSAGE,
			payload: id
		}))
		.catch(err => {
			console.log(err.response.data);
			dispatch(returnErrors(err.response.data, err.response.status));
		});
};

//send a new Message with POST
export const sendNewMessage = newMessage => (dispatch, getState) => {
	axios
		.post("/api/chat/", newMessage, tokenConfig(getState))
		.then(res =>
			dispatch({
				type: SENT_MESSAGE,
				payload: res.data
			})
		)
		.catch(err => {
			console.log(err.response.data);
			dispatch(returnErrors(err.response.data, err.response.status));
		});
};

export const sendMessage = message => (dispatch, getState) => {
	axios
		.put(`/api/chat/${message._id}`, message, tokenConfig(getState))
		.then(res =>
			dispatch({
				type: SENT_MESSAGE,
				payload: res.data
			})
		)
		.catch(err => {
			console.log(err);
			console.log(err.response.data);
			dispatch(returnErrors(err.response.data, err.response.status));
		});
};
