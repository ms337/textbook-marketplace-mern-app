import React, { Component, Fragment } from "react";
import { Container } from "reactstrap";

class Footer extends Component {
	render() {
		return (
			<div className="footer" style={{ color: "#fff", backgroundColor: "#680383" }}>
				<Container className="text-center text-md-left mt-5">
					<div className="row mt-3">
						<div className="col-md-4 col-lg-4 col-xl-4 mx-auto mb-md-0 mb-4">
							<h6 className="text-uppercase font-weight-bold">Disclaimer</h6>

							<p style={{ fontSize: "0.8rem" }}>
								We are not affiliated, associated, authorized, endorsed by, or in any way officially connected with the
								University of Western Ontario, or any of its subsidiaries or its affiliates.
							</p>
						</div>

						<div className="col-md-4 col-lg-2 col-xl-4 mx-auto mb-md-0 mb-4">
							<h6 className="text-uppercase font-weight-bold">Contact</h6>
							<p style={{ fontSize: "0.8rem" }}>
								<i className="fa fa-facebook mr-3"></i>
								<a href="https://www.facebook.com/txchng/" style={{ color: "#fff" }}>
									Message Us
								</a>
							</p>
							<p>
								<i className="fa fa-envelope mr-3"></i>texchangeuwo@gmail.com
							</p>
						</div>
					</div>

					<div className="copyright text-right">TexChange © 2019</div>
				</Container>
				<div className="container text-center text-md-left mt-5"></div>
			</div>
		);
	}
}

export default Footer;
