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

import BookView from "./BookView";

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
		const bookLayout = books.map(({ _id, name, author, price, imageURL, courses, quality, seller }) => (
			<Col lg="3" md="4" sm="4" xs="6">
				<BookView
					key={_id}
					name={name}
					author={author}
					price={price}
					imageURL={imageURL}
					courses={courses}
					quality={quality}
					seller={seller}
				/>
			</Col>
		));

		return (
			//make search bar here using forms and then bind to this button

			<Fragment>
				<div>
					<Container>
						{/* <Row>
							<Col lg="3" md="4" sm="4" xs="6">
								<Button>Filter</Button>
							</Col>
						</Row> */}

						<Container>
							<Row>
								{books.length == 0
									? "Sorry! No textbooks have been posted matching this search. Please edit your search to find more books or try searching without any parameters to get all books available!"
									: bookLayout}
							</Row>
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
