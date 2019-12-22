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

import { connect } from "react-redux"; //allows us to get state from redux into a react component
// import { getBooks, deleteBook } from "../actions/bookActions"; //import action

import PropTypes from "prop-types";

class About extends Component {
	static propTypes = {
		//action from redux is store as a prop
		book: PropTypes.object.isRequired //represent a state
	};

	//Lifecycle method: api requests, actions happen here
	componentDidMount() {
		// this.props.getBooks();
	}

	// onListBooksClick = search => {
	// 	this.props.getBooks();
	// };

	// onDeleteClick = id => {
	// 	this.props.deleteBook(id);
	// };

	render() {
		//book represent our entire state object, books represents the array
		const { books } = this.props.book;
		console.log(books);
		const aboutSection = (
			<Fragment>
				<Container>
					<div className="section text-center" style={{ padding: "2rem 2rem 2rem 2rem" }}>
						<Row>
							<div className="col-md-8 ml-auto mr-auto">
								<h2 className="title" style={{ fontWeight: "600" }}>
									Courses are hard enough, buying textbooks for them shouldn't be.
								</h2>
								<h5 className="description" style={{ color: "#3C4858" }}>
									Every semester students pay hundreds to thousands of dollars on required textbooks. Resale of these is
									broken, with incomplete information, posts buried under hundreds of others, and groups everywhere with
									only portions of what’s being sold. Welcome to the free centralized textbook trading platform of the
									future.
								</h5>
							</div>
						</Row>
						<div className="features">
							<Row>
								<Col md="4" style={{ paddingRight: "15px", paddingLeft: "15px" }}>
									<div className="info">
										<div className="icon icon-info">
											<i className="material-icons">search</i>
										</div>
										<h4 className="info-title">Personalized, Powerful Search</h4>
										<p>
											Leave behind the pain of searching on Facebook groups. Search and save your searches to get
											updated when the books are available.
										</p>
									</div>
								</Col>
								<Col md="4" style={{ paddingRight: "15px", paddingLeft: "15px" }}>
									<div className="info">
										<div className="icon icon-success">
											<i className="material-icons">verified_user</i>
										</div>
										<h4 className="info-title">Secure and Reliable</h4>
										<p>
											Closed to Western students only. No phishing, no spamming, get your books and get studying without
											any worries.
										</p>
									</div>
								</Col>

								<Col md="4" style={{ paddingRight: "15px", paddingLeft: "15px" }}>
									<div className="info">
										<div className="icon icon-danger">
											<i className="material-icons">money_off</i>
										</div>
										<h4 className="info-title">Free</h4>
										<p>
											Totally free: no transaction fees, no commission, nothing. Find a listing, message seller through
											the platform, and get your book.
										</p>
									</div>
								</Col>
							</Row>
						</div>
					</div>
				</Container>
			</Fragment>
		);
		return (
			//make search bar here using forms and then bind to this button
			<Fragment>{books.length === 0 ? aboutSection : null}</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	//root reducer key for this componentsReducer or is it the value
	book: state.book
});

//mapping function, {actions to be executed},, component name
export default connect(mapStateToProps, {})(About);
