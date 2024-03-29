import React, { Component, Fragment } from "react";

import { Button, Modal, ModalHeader, ModalBody, NavLink, Form, FormGroup, Label, Input } from "reactstrap";

import { connect } from "react-redux"; //allows us to get state from redux into a react component

import { addBook } from "../actions/bookActions"; //import action

import PropTypes from "prop-types";

class BookModal extends Component {
	//will have a Component state value to denote whether modal is open or not
	//whenever form, form input pieces needs to have pieces of state in component
	state = {
		modal: false,
		name: "",
		author: "",
		courses: [],
		price: 0,
		edition: "",
		quality: -1,
		seller: 0,
		file: "",
	};

	fileSelectHandler = (e) => {
		this.setState({
			file: e.target.files[0],
		});

		// console.log(this.state.file);
	};

	//to toggle to modal view
	toggle = () => {
		this.setState({
			//modifies state
			modal: !this.state.modal,
		});
	};

	confirmClose = () => {
		if (window.confirm("Are you sure you want to quit the form without posting?")) {
			this.toggle();
		}
	};

	static propTypes = {
		isAuthenticated: PropTypes.bool,
	};

	//onChange function declared below in form so that whenever something is form is changed, that is some input is given, the components state is updated"
	//e is event parameter, could get e.target.value, using [e.target.name] refers to name prop and set it to value for whenever something else is typed in
	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	//tag called functions have an event parameter e
	onSubmit = (e) => {
		e.preventDefault();
		// const newBook = {
		// 	//MongoDB will create id on its own
		// 	name: this.state.name,
		// 	author: this.state.author,
		// 	courses: ["CS", "PHIL"],
		// 	price: this.state.price,
		// 	quality: this.state.quality,
		// 	seller: 0
		// };

		let form = new FormData();
		form.append("name", this.state.name);
		form.append("author", this.state.author);
		form.append("courses", this.state.courses);
		form.append("price", this.state.price);
		form.append("quality", this.state.quality);
		form.append("file", this.state.file);

		// console.log("HEYYY");
		// console.log(this.state.file);
		// console.log(form);

		// Add book via addBook action
		this.props.addBook(form);
		this.toggle();
	};
	render() {
		return (
			<div>
				<Fragment>
					<NavLink style={{ color: "black" }} onClick={this.toggle}>
						Post a Listing
					</NavLink>
				</Fragment>

				{/* Modal takes properties inside depicting its component state */}
				{/* Removed toggle={this.toggle} */}
				<Modal isOpen={this.state.modal}>
					<ModalHeader toggle={this.confirmClose}>Post a Listing</ModalHeader>
					<ModalBody>
						<Form onSubmit={this.onSubmit}>
							<FormGroup>
								<Label for="book">Title</Label>
								<Input type="text" name="name" placeholder="Add book title" onChange={this.onChange} required />
								<Label for="book">Author</Label>
								<Input type="text" name="author" placeholder="Add book author" onChange={this.onChange} required />
								<Label for="book">Price</Label>
								<Input type="text" name="price" placeholder="Add book price" onChange={this.onChange} required />
								<Label for="book">Edition</Label>
								<Input
									type="text"
									name="edition"
									placeholder="Add edition of the book"
									onChange={this.onChange}
									required
								/>
								<Label for="book">Quality</Label>
								<Input
									type="number"
									name="quality"
									placeholder="Rate the condition of the book from 0 (bad) to 5 (excellent)"
									onChange={this.onChange}
									required
								/>
								<Label for="book">Image</Label>
								<Input
									style={{ color: "black" }}
									type="file"
									name="file"
									placeholder="Upload an Image"
									onChange={this.fileSelectHandler}
									required
								/>
								<Button color="primary" style={{ marginTop: "2rem" }} block>
									Create Listing
								</Button>
							</FormGroup>
						</Form>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

//can also do this as static proptypes?
BookModal.propTypes = {
	//action from redux is store as a prop
	addBook: PropTypes.func.isRequired,
	book: PropTypes.object.isRequired, //represent a state
};

const mapStateToProps = (state) => ({
	//root reducer key for this componentsReducer or is it the value
	book: state.book,
	isAuthenticated: state.auth.isAuthenticated,
});

//mapping function, {actions to be executed},, component name
export default connect(mapStateToProps, { addBook })(BookModal);
