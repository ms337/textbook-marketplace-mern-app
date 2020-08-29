import React, { Component, Fragment, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, NavLink } from "reactstrap";

import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import PropTypes from "prop-types";

export class Logout extends Component {
	static propTypes = {
		logout: PropTypes.func.isRequired,
	};

	state = {
		modal: false,
	};

	toggle = () => {
		this.setState({
			modal: !this.state.modal,
		});
	};

	logOff = () => {
		this.props.logout();
		this.toggle();
	};

	render() {
		return (
			<Fragment>
				<NavLink onClick={this.toggle} href="#">
					Logout
				</NavLink>
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Confirm Logout</ModalHeader>
					<ModalBody>
						Are you sure you want to log out?
						<Button color="primary" onClick={this.logOff} style={{ marginTop: "2rem" }} block>
							Logout
						</Button>
					</ModalBody>
				</Modal>
			</Fragment>
		);
	}
}

export default connect(null, { logout })(Logout);
