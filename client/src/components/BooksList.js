import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";

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
		return (
			//make search bar here using forms and then bind to this button
			<Container>
				<br />
				<ListGroup>
					<TransitionGroup className="books-list">
						{books.map(({ _id, name, author }) => (
							<CSSTransition key={_id} timeout={500} classNames="fade">
								<ListGroupItem>
									{name}
									<br />
									{author}
									<br />
									{_id}
								</ListGroupItem>
							</CSSTransition>
						))}
					</TransitionGroup>
				</ListGroup>
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	//root reducer key for this componentsReducer or is it the value
	book: state.book
});

//mapping function, {actions to be executed},, component name
export default connect(mapStateToProps, { getBooks, deleteBook })(BooksList);
