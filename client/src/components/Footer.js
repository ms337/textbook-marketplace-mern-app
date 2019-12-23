import React, { Component, Fragment } from "react";
import { Container, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class Footer extends Component {
	state = {
		modal: false
	};

	toggle = () => {
		this.setState({
			modal: !this.state.modal
		});
	};

	render() {
		return (
			<Fragment>
				<div className="footer" style={{ color: "#fff", backgroundColor: "#680383" }}>
					<Container className="text-center text-md-left mt-5">
						<div className="row mt-3">
							<div className="col-md-4 col-lg-4 col-xl-4 mx-auto mb-md-0 mb-4">
								<h6 className="text-uppercase font-weight-bold">Disclaimer</h6>

								<p style={{ fontSize: "0.8rem" }}>
									We are not affiliated, associated, authorized, endorsed by, or in any way officially connected with
									the University of Western Ontario, or any of its subsidiaries or its affiliates.
								</p>
							</div>

							<div className="col-md-4 col-lg-2 col-xl-4 mx-auto mb-md-0 mb-4">
								<h6 className="text-uppercase font-weight-bold" onClick={this.toggle}>
									<a>Privacy Policy</a>
								</h6>
								<br></br>
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
				</div>

				<Modal
					isOpen={this.state.modal}
					toggle={this.toggle}
					size="lg"
					// onClosed={closeAll ? toggle : undefined}
				>
					<ModalHeader></ModalHeader>
					<ModalBody style={{ padding: "5% 10%" }}>
						<h2 className="text-center">Data Privacy Policy</h2>

						<p>
							This policy explains the information we process, collect, and share personal user information to support
							Texchange. TexChange works diligently and responsibly to protect your private information.
						</p>
						<p>
							<strong>Contact Us</strong>
						</p>
						<p>
							For more info and any inquiries, please contact us at{" "}
							<a href="mailto:texchangeuwo@gmail.com">texchangeuwo@gmail.com</a>.
						</p>
						<p>
							<strong>What information do we collect?</strong>
						</p>
						<p>
							TexChange collects and processes information in order to facilitate the communication and trading of
							textbooks over it&rsquo;s platform. This may include personal information provided by the user.
						</p>
						<h6>Account data</h6>
						<p>
							TexChange collects provided user data to facilitate the creation, maintain, and provide services to an
							account. This data is limited to a user&rsquo;s account name, associated email, username and
							password.&nbsp;
						</p>
						<h6>Web analytics</h6>
						<p>
							TexChange may use a third party web trend analytics service for the purpose of collecting metadata on an
							anonymous basis. Information gathered may include cookies and visitor information related to behavior
							during access to services provided by TexChange. For further information about Google Analytics, and for
							links to Google&rsquo;s Privacy Policy and an opt-out tool for Google Analytics, go to
							<a href="http://www.google.com/intl/en/analytics/privacyoverview.html">
								http://www.google.com/intl/en/analytics/privacyoverview.html
							</a>
						</p>
						<h6>Community/ forum/ web postings</h6>
						<p>
							Information listed in postings are public to the TexChange community and are visible to all users on the
							website. TexChange is not responsible for further disclosure of information not requested when a post is
							created or the use of provided information by other entities who are recipients or have access access to
							public information.
						</p>
						<p>
							<strong>How do we use this information?</strong>
						</p>
						<p>
							We collect and access the information mentioned above to manage and improve our services provided to you
							in these ways:
						</p>
						<h6>Personalize and improve our services</h6>
						<p>
							Data collected may be used for administrative purposes including the identification of crashes and
							functionality problems.&nbsp;
						</p>
						<h6>Maximize safety and security of users</h6>
						<p>
							TexChange collects data in order to verify creation of accounts, prevent spam and harmful conduct, and to
							promote overall safety and security when using the services provided.
						</p>
						<h6>Communicate with users</h6>
						<p>
							Data collected allows TexChange to communicate important information with users, including notifications
							related to security, terms of service changes, and policy changes. This data also allows Texchange to
							respond to users when contacted.
						</p>
						<p>
							<strong>How is this information shared?</strong>
						</p>
						<p>The information mentioned previously is shared in the following ways:</p>
						<h6>People and accounts you communicate with</h6>
						<p>
							All information posted on TexChange is public information and can be seen by anyone with access to our
							services. When communicating through chat on the website you are choosing who to share the information
							provided in the chat with.
						</p>
						<p>
							<strong>How is this information protected and what security do we use?</strong>
						</p>
						<p>
							To protect Personal Information from unauthorized access, use and disclosure, we use authorization tokens
							to authenticate users and requests to our API. Passwords are encrypted. Note that messages sent on the
							platform are not encrypted and may be read.&nbsp;
						</p>
						<p>
							<strong>How can I manage or delete personal information about me?</strong>
						</p>
						<p>
							All users have the ability to access, amend, and delete any provided info through their profile
							settings.&nbsp;
						</p>
						<p>
							Data provided by the user is stored until a user deletes their account, or the information is no longer
							necessary for TexChange to provide services to the user. The extent to which this information is necessary
							depends on the use of the data in question and varies depending on its nature.&nbsp;
						</p>
						<p>
							Upon deletion of your account all posts originating from the account will be deleted. To delete your
							account at any time access TexChange&rsquo;s profile settings.
						</p>
						<p>
							<strong>User Responsibilities</strong>
						</p>
						<p>
							To protect personal user information, TexChange highly suggests never sharing your password, only
							accessing TexChange through secure networks, maintaining updated security and virus protection software,
							and in the event of a suspected account breach, or a privacy concern arises immediately changing your
							password and contacting TexChange.
						</p>
						<p>
							<strong>How will we notify you of changes to our policy?</strong>
						</p>
						<p>
							We may revise this policy from time to time. The most current version of the policy will be listed at{" "}
							<a href="http://www.tex-change.com">www.tex-change.com</a>. We will notify you of any changes through a
							notification to your account. By continuing to access our services after these changes become effective,
							you agree to be bound by the revised terms.
						</p>
						<p>
							The best{" "}
							<a href="https://geekprank.com/" target="_blank">
								geek prank collection
							</a>{" "}
							can be found at GeekPrank.com. Play with the Windows simulator, the fake upgrade screens, the fake disk
							formatter and other pranks.
						</p>
					</ModalBody>
				</Modal>
			</Fragment>
		);
	}
}

export default Footer;
