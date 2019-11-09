import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";

import { CSSTransition, TransitionGroup } from "react-transition-group";

import uuid from "uuid"; //just for testing

class BooksList extends Component {
	state = {
		books: [
			{ id: uuid(), name: "Book1" },
			{ id: uuid(), name: "Book2" },
			{ id: uuid(), name: "Book3" },
			{ id: uuid(), name: "Book4" }
		]
	};

	render() {
		const { books } = this.state;
		return (
			<Container>
				<Button
					color="dark"
					style={{ marginBottom: "2rem" }}
					onClick={() => {
						const name = prompt("Enter Item");
						if (name) {
							this.setState(state => ({
								books: [...state.books, { id: uuid(), name }]
							}));
						}
					}}
				>
					Add Item
				</Button>
				<ListGroup>
					<TransitionGroup className="books-list">
						{books.map(({ id, name }) => (
							<CSSTransition key={id} timeout={500} classNames="fade">
								<ListGroupItem>
									<Button
										className="remove-btn"
										color="danger"
										size="sm"
										onClick={() => {
											this.setState(state => ({
												books: state.books.filter(item => item.id != id)
											}));
										}}
									>
										&times;
									</Button>
									{name}
								</ListGroupItem>
							</CSSTransition>
						))}
					</TransitionGroup>
				</ListGroup>
			</Container>
		);
	}
}
export default BooksList;
