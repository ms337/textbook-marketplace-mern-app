import React, { Component, Fragment } from "react";

import { Modal, ModalHeader, ModalBody, ModalFooter, NavLink, Button } from "reactstrap";

import { connect } from "react-redux"; //allows us to get state from redux into a react component

import { getProfile, deleteUser } from "../actions/profileActions"; //import action

import PropTypes from "prop-types";

class ProfileModal extends Component {
	//will have a Component state value to denote whether modal is open or not
	//whenever form, form input pieces needs to have pieces of state in component
	state = {
		modal: false,
		deleteModal: false,
	};

	componentDidMount() {
		this.props.getProfile();
	}

	//to toggle to modal view
	toggle = () => {
		this.setState({
			//modifies state
			modal: !this.state.modal,
		});
	};

	toggleDeleteModal = () => {
		this.setState({
			deleteModal: !this.state.deleteModal,
		});
	};

	deleteAcc = () => {
		this.props.deleteUser();
	};

	static propTypes = {
		isLoading: PropTypes.bool,
		profile: PropTypes.object,
	};

	render() {
		console.log(this.props.profile);
		return (
			<div>
				<Fragment>
					<NavLink style={{ color: "black" }} onClick={this.toggle}>
						Profile
					</NavLink>
				</Fragment>

				{/* Modal takes properties inside depicting its component state */}
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Profile</ModalHeader>
					<ModalBody>
						<h3>Hi {this.props.profile.user.name}!</h3>
						<h5>Your saved books: </h5>
						<ul>
							{this.props.profile.user.toBuy.map((item, index) => (
								<li>{item}</li>
							))}
						</ul>
						<br></br>
						{/* <h5>Books posted by you: </h5>
						<ul>
							{this.props.profile.user.toSell.map((item2, index) => (
								<li>{item2}</li>
							))}
						</ul> */}
						<Button color="primary" onClick={this.toggleDeleteModal}>
							Delete Account
						</Button>
					</ModalBody>
				</Modal>

				<Modal isOpen={this.state.deleteModal} toggle={this.toggleDeleteModal}>
					<ModalHeader toggle={this.toggleDeleteModal}>Inbox</ModalHeader>
					<ModalBody style={{ padding: "5% 10%" }}>
						<p>Are you sure you want to delete your account?</p>
					</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={this.deleteAcc}>
							Delete
						</Button>
						<Button color="secondary" onClick={this.toggleDeleteModal}>
							Cancel
						</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}

//can also do this as static proptypes?

const mapStateToProps = (state) => ({
	//root reducer key for this componentsReducer or is it the value
	profile: state.profile,
	isLoading: state.profile.isLoading,
});

//mapping function, {actions to be executed},, component name
export default connect(mapStateToProps, { getProfile, deleteUser })(ProfileModal);
