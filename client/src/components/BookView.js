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
	CardBody,
} from "reactstrap";

import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink, Alert } from "reactstrap";

import { connect } from "react-redux"; //allows us to get state from redux into a react component
import { getBooks, deleteBook } from "../actions/bookActions"; //import action

import PropTypes from "prop-types";

const qualityDict = { 1: "Okay", 2: "Used", 3: "Lightly Used", 4: "Almost New", 5: "As Good As New" };

class BookView extends Component {
	static propTypes = {
		//action from redux is store as a prop

		book: PropTypes.object.isRequired, //represent a state
	};

	state = {
		modal: false,
	};

	toggle = () => {
		this.setState({
			modal: !this.state.modal,
		});
		// console.log(this.state.modal);
	};

	render() {
		//book represent our entire state object, books represents the array
		console.log(this.state.modal);
		const { name, author, price, imageURL, edition, courses, quality, seller } = this.props;

		return (
			//make search bar here using forms and then bind to this button
			<Fragment>
				<Card className="m-2" onClick={this.toggle}>
					{/*Need to control size of image*/}
					<Container style={{ padding: "10% 10% 2% 10%" }}>
						<CardImg style={{ borderRadius: "0" }} width="100%" src={imageURL} />
					</Container>
					<CardBody style={{ padding: "2.5% 12.5%" }}>
						<CardTitle>{"$" + price.$numberDecimal + " CDN"}</CardTitle>
						<CardSubtitle>{name + ", " + edition}</CardSubtitle>
						<p style={{ fontSize: "0.75rem" }}>{author}</p>
						<h6>{qualityDict[quality]}</h6>
					</CardBody>

					{/* <CardText>{_id}</CardText> */}
				</Card>
				{/* Modal takes properties inside depicting its component state */}
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalBody>
						<Container>
							<div className="text-center">
								<img className="center-block" style={{ borderRadius: "0" }} width="50%" src={imageURL} />
							</div>

							<h3>{name}</h3>
							<h4>{author}</h4>
							<h4>{"$" + price.$numberDecimal + " CDN"}</h4>
							<h5>{edition}</h5>
							<h5>{courses}</h5>
							<h6>{qualityDict[quality]}</h6>
						</Container>
					</ModalBody>
				</Modal>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	//root reducer key for this componentsReducer or is it the value
	book: state.book,
});

//mapping function, {actions to be executed},, component name
export default connect(mapStateToProps, { getBooks, deleteBook })(BookView);
