import React, { Component, Fragment } from "react";

import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	NavLink,
	ListGroup,
	ListGroupItem,
	ListGroupItemHeading,
	ListGroupItemText
} from "reactstrap";

import { connect } from "react-redux"; //allows us to get state from redux into a react component

import { getMessages, deleteMessage, sendMessage } from "../actions/chatActions"; //import action

import PropTypes from "prop-types";
import { Model } from "mongoose";

class ChatModal extends Component {
	//will have a Component state value to denote whether modal is open or not
	//whenever form, form input pieces needs to have pieces of state in component
	state = {
		modal: false,
		showMessage: false,
		messageSelectedBool: false,
		messageSelected: null
	};

	componentDidMount() {
		if (this.props.isAuthenticated) {
			this.props.getMessages();
		}
	}

	onInboxClick = () => {
		this.props.getMessages();
	};

	//to toggle to modal view
	toggle = () => {
		this.setState({
			//modifies state
			modal: !this.state.modal
		});

		//bad design
		this.props.getMessages();
	};

	closeMessageForm = () => {
		this.setState({
			messageSelectedBool: false
		});
	};

	static propTypes = {
		isAuthenticated: PropTypes.bool,
		getMessages: PropTypes.func.isRequired,
		deleteMessage: PropTypes.func.isRequired,
		sendMessage: PropTypes.func.isRequired,
		messages: PropTypes.object.isRequired
	};

	//onChange function declared below in form so that whenever something is form is changed, that is some input is given, the components state is updated"
	//e is event parameter, could get e.target.value, using [e.target.name] refers to name prop and set it to value for whenever something else is typed in
	// onChange = e => {
	// 	this.setState({ [e.target.name]: e.target.value });
	// };

	//tag called functions have an event parameter e
	onSubmit = e => {
		e.preventDefault();

		this.toggle();
	};

	selectMessage = params => {
		this.setState({
			messageSelectedBool: true,
			messageSelected: params
		});
		console.log("Hey");
		console.log(params);
	};

	render() {
		const last = array => {
			if (array == null) return null;
			else return array[array.length - 1];
		};

		const { messages } = this.props.messages;
		// console.log(messages);
		const messagesList = messages.map(({ _id, userIdFrom, messageArray, fromName, seen }) => (
			//<ListGroupItem active={!seen} onClick={}> for seen unseen
			<ListGroupItem>
				<ListGroupItemHeading>{fromName}</ListGroupItemHeading>
				<ListGroupItemText>
					{last(messageArray).length > 150 ? last(messageArray).slice(0, 150) + "..." : last(messageArray)}
				</ListGroupItemText>
				<Button onClick={() => this.selectMessage({ _id, messageArray, fromName })}>Message</Button>
			</ListGroupItem>
		));
		return (
			<div>
				<Fragment>
					<NavLink style={{ color: "white" }} onClick={this.toggle}>
						Inbox
					</NavLink>
				</Fragment>

				{/* Modal takes properties inside depicting its component state */}
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Inbox</ModalHeader>
					<ModalBody>{messagesList}</ModalBody>
				</Modal>

				<Modal isOpen={this.state.messageSelectedBool} toggle={this.closeMessageForm}>
					<ModalHeader toggle={this.closeMessageForm}>Inbox</ModalHeader>
					<ModalBody>Send Message Here</ModalBody>
				</Modal>
			</div>
		);
	}
}

//can also do this as static proptypes?

const mapStateToProps = state => ({
	//root reducer key for this componentsReducer or is it the value
	messages: state.chat,
	isAuthenticated: state.auth.isAuthenticated
});

//mapping function, {actions to be executed},, component name
export default connect(mapStateToProps, { getMessages, deleteMessage, sendMessage })(ChatModal);
