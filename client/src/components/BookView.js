import React, { Component, Fragment } from "react";
import {
	Row,
	Col,
	Container,
	ListGroup,
	ListGroupItem,
	Card,
	Button,
	CardImg,
	CardTitle,
	CardText,
	CardGroup,
	CardColumns,
	CardSubtitle,
	CardBody
} from "reactstrap";

import { CSSTransition, TransitionGroup } from "react-transition-group";

import { connect } from "react-redux"; //allows us to get state from redux into a react component
import { getBooks, deleteBook } from "../actions/bookActions"; //import action

import PropTypes from "prop-types";

class BookView extends Component {
	static propTypes = {
		//action from redux is store as a prop
		getViews: PropTypes.func.isRequired,
		deleteBook: PropTypes.func.isRequired,
		book: PropTypes.object.isRequired //represent a state
	};

	toggle = () => {
		this.props.clearErrors();
		this.setState({
			//modifies state
			modal: !this.state.modal
		});
	};

	render() {
		//book represent our entire state object, books represents the array
		const { name, author, price, imageURL, edition, courses, quality, seller } = this.props;

		// const rowUnit = books.length / 4;
		// console.log(rowUnit);
		// const bookLayout = books.map(({ _id, name, author, price, imageURL }) => (
		// 	<Col lg="3" md="4" sm="4" xs="6">
		// 		<Card className="m-2">
		// 			{/*Need to control size of image*/}
		// 			<Container style={{ padding: "10% 10% 2% 10%" }}>
		// 				<CardImg style={{ borderRadius: "0" }} width="100%" src={imageURL} />
		// 			</Container>
		// 			<CardBody style={{ padding: "2.5% 12.5%" }}>
		// 				<CardTitle>{"$" + price.$numberDecimal + " CDN"}</CardTitle>
		// 				<CardSubtitle>{author}</CardSubtitle>
		// 			</CardBody>

		// 			{/* <CardText>{_id}</CardText> */}
		// 		</Card>
		// 	</Col>
		// ));

		return (
			//make search bar here using forms and then bind to this button

			<div>
				<NavLink onClick={this.toggle} href="#">
					Register
				</NavLink>

				{/* Modal takes properties inside depicting its component state */}
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Register</ModalHeader>
					<ModalBody>
						{this.state.message ? <Alert color="danger">{this.state.message} </Alert> : null}
						{this.state.goToLoginMsg ? (
							<Alert color="success">A Verification email has been sent to your email </Alert>
						) : null}
						<Form onSubmit={this.onSubmit}>
							<FormGroup>
								<Label for="name">Name</Label>
								<Input
									type="text"
									name="name"
									id="name"
									placeholder="Your Name"
									onChange={this.onChange}
									className="mb-3"
								/>
								<Label for="email">Email</Label>
								<Input
									type="email"
									name="email"
									id="email"
									placeholder="Email"
									onChange={this.onChange}
									className="mb-3"
								/>
								<Label for="password">Password</Label>
								<Input
									type="password"
									name="password"
									id="password"
									placeholder="Password"
									onChange={this.onChange}
									className="mb-3"
								/>
								<Button color="dark" style={{ marginTop: "2rem" }} block>
									Register
								</Button>
							</FormGroup>
						</Form>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	//root reducer key for this componentsReducer or is it the value
	book: state.book
});

//mapping function, {actions to be executed},, component name
export default connect(mapStateToProps, { getBooks, deleteBook })(BookView);
