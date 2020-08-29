import React, { Component, Fragment } from "react";
import {
	Container,
	Label,
	Form,
	FormGroup,
	InputGroup,
	Input,
	InputGroupAddon,
	ListGroup,
	ListGroupItem,
	Button,
	Row,
	Col,
} from "reactstrap";

import { CSSTransition, TransitionGroup } from "react-transition-group";

import { connect } from "react-redux"; //allows us to get state from redux into a react component
import { getBooks, deleteBook } from "../actions/bookActions"; //import action

import PropTypes from "prop-types";

class Header extends Component {
	static propTypes = {
		//action from redux is store as a prop
		getBooks: PropTypes.func.isRequired,
		book: PropTypes.object.isRequired, //represent a state
	};

	//TODO; Need to capture state of input and then pass it to onListBooksClick

	onListBooksClick = (search) => {
		console.log(search);
		this.props.getBooks(search);
		window.scrollBy(0, 400);
	};

	handleKeyPress(event) {
		if (event.key === "Enter") {
			this.onListBooksClick(event.target.value);
		}
	}

	// onDeleteClick = id => {
	// 	this.props.deleteBook(id);
	// };

	render() {
		let pageHeader = React.createRef();
		var func = () => {
			if (window.innerWidth > 991) {
				const updateScroll = () => {
					let windowScrollTop = window.pageYOffset / 3;
					pageHeader.current.style.transform = "translate3d(0," + windowScrollTop + "px,0)";
				};
				window.addEventListener("scroll", updateScroll);
				return function cleanup() {
					window.removeEventListener("scroll", updateScroll);
				};
			}
		};
		//book represent our entire state object, books represents the array
		// const { books } = this.props.book;
		return (
			//make search bar here using forms and then bind to this button

			<Fragment>
				{/* <div className=header></div> */}
				<div className="page-header clear-filter" filter-color="blue">
					<div
						className="page-header-image"
						style={{
							backgroundImage: "url(" + require("../assets/bg.jpg") + ")",
						}}
					></div>
					<Container>
						<Row>
							<Col className="col-md-10">
								<br></br>
								<br></br>

								<h1
									className="title"
									style={{ color: "white", fontWeight: "400", fontSize: "60px", textAlign: "left" }}
								>
									Personalized Textbook Trading.
								</h1>
								<h1 style={{ fontWeight: "200", fontSize: "40px", textAlign: "left" }}>For students, by students.</h1>

								<br />
							</Col>
						</Row>
						<br></br>
						<Row>
							<Col>
								<div className="">
									<div>
										<InputGroup>
											<Input
												className="form-control"
												type="text"
												name="search"
												id="searchQuery"
												placeholder="Search for textbooks here..."
												style={{ color: "black", borderRadius: "0.5rem 0rem 0rem O.5rem" }}
												onKeyPress={this.handleKeyPress.bind(this)} //added support for pressing enterkey
											/>
											<InputGroupAddon addonType="append">
												<Button
													color="primary"
													style={{
														height: "auto",
														margin: "0rem",
														border: "1px solid",
														borderColor: "#680383",
														borderRadius: "0rem 0.5rem O.5rem 0rem",
													}}
													onClick={this.onListBooksClick.bind(this)}
												>
													Search
												</Button>
											</InputGroupAddon>
										</InputGroup>
									</div>
								</div>
							</Col>
						</Row>
					</Container>
				</div>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	//root reducer key for this componentsReducer or is it the value
	book: state.book,
});

//mapping function, {actions to be executed},, component name
export default connect(mapStateToProps, { getBooks })(Header);
