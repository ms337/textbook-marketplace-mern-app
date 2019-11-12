import React, { Component } from "react";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from "reactstrap";

//Redux related things
import { connect } from "react-redux";
import PropTypes from "prop-types";

//when submitted, register action needs to be called

import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

class LoginModal extends Component {
  //will have a Component state value to denote whether modal is open or not
  //whenever form, form input pieces needs to have pieces of state in component
  state = {
    modal: false,
    email: "",
    password: "",
    //Show a msg if error, some message to be shown
    message: null
  };

  //
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error != prevProps.error) {
      //Check for login error
      if (error.id === "LOGIN_FAIL") {
        this.setState({
          message: error.message.message
        });
      } else {
        this.setState({
          message: null
        });
      }
    }

    //If authenticated, close modal
    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle();
      }
    }
  }

  //to toggle to modal view
  toggle = () => {
    this.props.clearErrors();
    this.setState({
      //modifies state
      modal: !this.state.modal
    });
  };

  //onChange function declared below in form so that whenever something is form is changed, that is some input is given, the components state is updated"
  //e is event parameter, could get e.target.value, using [e.target.name] refers to name prop and set it to value for whenever something else is typed in
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  //tag called functions have an event parameter e
  onSubmit = e => {
    e.preventDefault();

    //if error, display in Modal
    const { email, password } = this.state;

    const user = {
      email,
      password
    };
    //Attempt to Login
    this.props.login(user);
  };
  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Login
        </NavLink>

        {/* Modal takes properties inside depicting its component state */}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          <ModalBody>
            {this.state.message ? (
              <Alert color="danger">{this.state.message} </Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={this.onChange}
                  className="mb-3"
                />
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={this.onChange}
                  className="mb-3"
                />
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Add Item
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  //root reducer key for this componentsReducer or is it the value
  //getting these from the reducer
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

//mapping function, {actions to be executed},, component name
export default connect(
  mapStateToProps,
  { login, clearErrors } //any action we want to use from Redux gets put here
)(LoginModal);
