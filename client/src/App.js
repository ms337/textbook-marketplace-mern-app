import React, { useEffect, useState } from "react";
import AppNavbar from "./components/AppNavbar";
import BooksList from "./components/BooksList";
import BookModal from "./components/BookModal";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { Container, Row, Col } from "reactstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";
import About from "./components/About";

function App() {
	//
	useEffect(() => {
		store.dispatch(loadUser()); //
	});

	return (
		<Provider store={store}>
			<div className="App">
				<AppNavbar />
				<Header />

				<Container>
					<Row className="mb-5"></Row>
					<About />
				</Container>
				<Row className="mb-5"></Row>
				<Row className="mb-5"></Row>
				<Footer />
			</div>
		</Provider>
	);
}

export default App;
