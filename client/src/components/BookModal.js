import React, { Component } from "react";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";

import { connect } from "react-redux"; //allows us to get state from redux into a react component

import { addBook } from "../actions/bookActions"; //import action
import { Model } from "mongoose";
import uuid from "uuid"; //just for testing
import PropTypes from "prop-types";

class BookModal extends Component {
	//will have a Component state value to denote whether modal is open or not
	//whenever form, form input pieces needs to have pieces of state in component
	state = {
		modal: false,
		name: ""
	};

	//to toggle to modal view
	toggle = () => {
		this.setState({
			//modifies state
			modal: !this.state.modal
		});
	};

	//onChange function declared below in form so that whenever something is form is changed, that is some input is given, the components state is updated"
	//e is event parameter, could get e.target.value, using [e.target.name] refers to name prop and set it to value for whenever something else is typed in
	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	//tag called functions have an event parameter e
	onSubmit = e => {
		e.preventDefault();
		const newBook = {
			id: uuid(),
			name: this.state.name
		};

		//Add book via addBook action
		this.props.addBook(newBook);
		this.toggle();
	};
	render() {
		return (
			<div>
				<Button color="dark" style={{ marginBottom: "2rem" }} onClick={this.toggle}>
					Add Book
				</Button>

				{/* Modal takes properties inside depicting its component state */}
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Post a Listing</ModalHeader>
					<ModalBody>
						<Form onSubmit={this.onSubmit}>
							<FormGroup>
								<Label for="book">Book</Label>
								<Input type="text" name="name" id="book" placeholder="Add book" onChange={this.onChange} />
								<Button color="dark" style={{ marginTop: "2rem" }} block>
									Add Item
								</Button>
							</FormGroup>
						</Form>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

BookModal.propTypes = {
	//action from redux is store as a prop
	addBook: PropTypes.func.isRequired,
	book: PropTypes.object.isRequired //represent a state
};

const mapStateToProps = state => ({
	//root reducer key for this componentsReducer or is it the value
	book: state.book
});

//mapping function, {actions to be executed},, component name
export default connect(
	mapStateToProps,
	{ addBook }
)(BookModal);
