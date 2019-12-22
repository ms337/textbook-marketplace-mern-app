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

class BooksList extends Component {
	static propTypes = {
		//action from redux is store as a prop
		getBooks: PropTypes.func.isRequired,
		deleteBook: PropTypes.func.isRequired,
		book: PropTypes.object.isRequired //represent a state
	};

	//Lifecycle method: api requests, actions happen here
	componentDidMount() {
		// this.props.getBooks();
	}

	onListBooksClick = search => {
		this.props.getBooks();
	};

	onDeleteClick = id => {
		this.props.deleteBook(id);
	};
	render() {
		//book represent our entire state object, books represents the array
		const { books } = this.props.book;

		const rowUnit = books.length / 4;
		console.log(rowUnit);
		const bookLayout = books.map(({ _id, name, author, price, imageURL }) => (
			<Col lg="3" md="4" sm="4" xs="6">
				<Card className="m-2">
					{/*Need to control size of image*/}
					<Container style={{ padding: "10% 10% 2% 10%" }}>
						<CardImg style={{ borderRadius: "0" }} width="100%" src={imageURL} />
					</Container>
					<CardBody style={{ padding: "2.5% 12.5%" }}>
						<CardTitle>{"$" + price.$numberDecimal + " CDN"}</CardTitle>
						<CardSubtitle>{author}</CardSubtitle>
					</CardBody>

					{/* <CardText>{_id}</CardText> */}
				</Card>
			</Col>
		));

		return (
			//make search bar here using forms and then bind to this button

			<Fragment>
				<div>
					<h3>Search Results: </h3>
				</div>
				<div>
					<Container>
						<Row>
							<Col lg="3" md="4" sm="4" xs="6">
								<Button>Filter</Button>
							</Col>
						</Row>

						<Container>
							<Row>{bookLayout}</Row>
						</Container>
					</Container>
				</div>
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	//root reducer key for this componentsReducer or is it the value
	book: state.book
});

//mapping function, {actions to be executed},, component name
export default connect(mapStateToProps, { getBooks, deleteBook })(BooksList);
