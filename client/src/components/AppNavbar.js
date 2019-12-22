import React, { Component, Fragment } from "react";

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container } from "reactstrap";
import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";
import Logout from "./auth/Logout";
import BookModal from "./BookModal";
import ChatModal from "./ChatModal";

import { connect } from "react-redux"; //import connect to connect this component to state
import PropTypes from "prop-types";

import logo from "../assets/logo.png";

class AppNavbar extends Component {
	state = {
		isOpen: false
	};
	toggle = () => {
		this.setState({
			isOpen: !this.state.isOpen //toggling state
		});
	};

	static propTypes = {
		auth: PropTypes.object.isRequired
	};

	render() {
		const { isAuthenticated, user } = this.props.auth; //destructuring from props connected and mapped to by Redux

		const authLinks = (
			<Fragment>
				<NavItem>
					<NavLink>{user ? `Welcome, ${user.name.split(" ")[0]}!` : ""}</NavLink>
				</NavItem>
				<NavItem>
					<BookModal />
				</NavItem>
				<NavItem>
					<ChatModal />
				</NavItem>
				<NavItem>
					<Logout />
				</NavItem>
			</Fragment>
		);
		const guestLinks = (
			<Fragment>
				<NavItem>
					<NavLink href="./">About</NavLink>
				</NavItem>
				<NavItem>
					<RegisterModal />
				</NavItem>
				<NavItem>
					<LoginModal />
				</NavItem>
			</Fragment>
		);

		return (
			<div>
				<Navbar expand="sm">
					<Container>
						<NavbarBrand href="#">
							<img
								src={logo}
								style={{
									width: "48px",
									height: "48px",
									borderRadius: "50%",
									overflow: "hidden",
									marginTop: "-6px",
									marginLeft: "0.5rem",
									marginRight: "0.5rem"
								}}
							></img>
							TexChange
						</NavbarBrand>
						<NavbarToggler onClick={this.toggle} />
						<Collapse isOpen={this.state.isOpen} navbar>
							<Nav className="ml-auto" navbar>
								{isAuthenticated ? authLinks : guestLinks}
							</Nav>
						</Collapse>
					</Container>
				</Navbar>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth
});

//null here? b/c not calling action defined in any of the actions file
export default connect(mapStateToProps, null)(AppNavbar);
