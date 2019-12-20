import React, { Component } from "react";
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
		const bookLayout = books.map(({ _id, name, author, imageURL }) => (
			<Col xs="6" sm="auto">
				<Card className="m-2">
					{/*Need to control size of image*/}
					<CardImg top width="100px" src={imageURL} />
					<CardTitle>{name}</CardTitle>
					<br />
					<CardSubtitle>{author}</CardSubtitle>
					<br />
					{/* <CardText>{_id}</CardText> */}
				</Card>
			</Col>
		));

		return (
			//make search bar here using forms and then bind to this button
			<div>
				<Container>
					{/* <br />
				<CardColumns>
					<TransitionGroup className="books-list">
						{books.map(({ _id, name, author }) => (
							<CSSTransition key={_id} timeout={500} classNames="fade">
								<Card>
									<CardTitle>{name}</CardTitle>
									<br />
									<CardSubtitle>{author}</CardSubtitle>
									<br />
									<CardText>{_id}</CardText>
								</Card>
							</CSSTransition>
						))}
					</TransitionGroup>
				</CardColumns> */}
					<Row>{bookLayout}</Row>
				</Container>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	//root reducer key for this componentsReducer or is it the value
	book: state.book
});

//mapping function, {actions to be executed},, component name
export default connect(mapStateToProps, { getBooks, deleteBook })(BooksList);
