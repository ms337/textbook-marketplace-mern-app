import React from "react";
import AppNavbar from "./components/AppNavbar";
import BooksList from "./components/BooksList";
import BookModal from "./components/BookModal";
import { Container } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Provider } from "react-redux";
import store from "./store";

function App() {
	return (
		<Provider store={store}>
			<div className="App">
				<AppNavbar />
				<Container>
					<BookModal />
					<BooksList />
				</Container>
			</div>
		</Provider>
	);
}

export default App;
