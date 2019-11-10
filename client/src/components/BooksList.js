import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";

import { CSSTransition, TransitionGroup } from "react-transition-group";

import { connect } from "react-redux"; //allows us to get state from redux into a react component
import { getBooks, deleteBook } from "../actions/bookActions"; //import action

import PropTypes from "prop-types";

class BooksList extends Component {
	//Lifecycle method: api requests, actions happen here
	componentDidMount() {
		this.props.getBooks();
	}

	onDeleteClick = id => {
		this.props.deleteBook(id);
	};
	render() {
		//book represent our entire state object, books represents the array
		const { books } = this.props.book;
		return (
			<Container>
				<ListGroup>
					<TransitionGroup className="books-list">
						{books.map(({ id, name, author }) => (
							<CSSTransition key={id} timeout={500} classNames="fade">
								<ListGroupItem>
									<Button
										className="remove-btn"
										color="danger"
										size="sm"
										onClick={this.onDeleteClick.bind(this, id)} //
									>
										&times;
									</Button>
									{name}
									<br />
									{author}
								</ListGroupItem>
							</CSSTransition>
						))}
					</TransitionGroup>
				</ListGroup>
			</Container>
		);
	}
}

BooksList.propTypes = {
	//action from redux is store as a prop
	getBooks: PropTypes.func.isRequired,
	deleteBook: PropTypes.func.isRequired,
	book: PropTypes.object.isRequired //represent a state
};

const mapStateToProps = state => ({
	//root reducer key for this componentsReducer or is it the value
	book: state.book
});

//mapping function, {actions to be executed},, component name
export default connect(
	mapStateToProps,
	{ getBooks, deleteBook }
)(BooksList);
