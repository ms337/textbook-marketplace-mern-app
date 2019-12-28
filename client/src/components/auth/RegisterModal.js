import React, { Component } from "react";

import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Form,
	FormGroup,
	Label,
	Input,
	NavLink,
	Alert,
	Container
} from "reactstrap";

//Redux related things
import { connect } from "react-redux";
import PropTypes from "prop-types";

//when submitted, register action needs to be called

import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

class RegisterModal extends Component {
	//will have a Component state value to denote whether modal is open or not
	//whenever form, form input pieces needs to have pieces of state in component
	state = {
		modal: false,
		nestedModal: false,
		agreedToTerms: false,
		name: "",
		email: "",
		password: "",
		//Show a msg if error, some message to be shown
		message: null,
		goToLoginMsg: false
	};

	//
	static propTypes = {
		isAuthenticated: PropTypes.bool,
		justRegistered: PropTypes.bool,
		error: PropTypes.object.isRequired,
		register: PropTypes.func.isRequired,
		clearErrors: PropTypes.func.isRequired
	};

	componentDidUpdate(prevProps) {
		const { error, isAuthenticated, justRegistered } = this.props;
		console.log(justRegistered);
		if (error != prevProps.error) {
			//Check for register error
			if (error.id === "REGISTER_FAIL") {
				this.setState({
					message: error.message.message
				});
			} else {
				this.setState({
					message: null
				});
			}
		}

		if (justRegistered != prevProps.justRegistered) {
			this.setState({
				goToLoginMsg: true
			});
		}
		if (this.state.modal) {
			// if (this.state.modal) {
			// 	if (justRegistered) {
			// 		this.setState({
			// 			goToLoginMsg: true
			// 		});
			// 	}
			// }

			//If authenticated, close modal
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
			modal: !this.state.modal,
			agreedToTerms: false
		});
	};

	toggleNested = () => {
		this.setState({
			nestedModal: !this.state.nestedModal
		});
	};

	toggleAll = () => {
		this.props.clearErrors();
		this.setState({
			nestedModal: false,
			modal: false,
			agreedToTerms: false
		});
	};

	agree = () => {
		this.setState({
			nestedModal: !this.state.nestedModal,
			agreedToTerms: true
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

		const { name, email, password } = this.state;

		//Create user object

		const newUser = {
			name,
			email,
			password
		};

		//Attempt to register
		this.props.register(newUser);

		//if error, display in Modal
	};
	render() {
		return (
			<div>
				<NavLink onClick={this.toggle} href="#">
					Register
				</NavLink>

				{/* Modal takes properties inside depicting its component state */}
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Register</ModalHeader>
					<ModalBody>
						{this.state.message ? <Alert color="danger">{this.state.message} </Alert> : null}
						{this.state.goToLoginMsg ? (
							<Alert color="success">A Verification email has been sent to your email </Alert>
						) : null}
						<Form onSubmit={this.onSubmit}>
							<FormGroup>
								<Label for="name">Name</Label>
								<Input
									type="text"
									name="name"
									id="name"
									placeholder="Your Name"
									onChange={this.onChange}
									className="mb-3"
								/>
								<Label for="email">UWO Email</Label>
								<Input
									type="email"
									name="email"
									id="email"
									placeholder="Your @uwo.ca email"
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

								<Label check style={{ paddingLeft: "25px" }}>
									<a onClick={this.toggleNested}>
										<Input type="checkbox" checked={this.state.agreedToTerms} required />I have read and agree to the
										terms and conditions.
									</a>
								</Label>
								<Modal
									isOpen={this.state.nestedModal}
									toggle={this.toggleNested}
									size="lg"
									// onClosed={closeAll ? toggle : undefined}
								>
									<ModalHeader></ModalHeader>
									<ModalBody style={{ padding: "5% 10%" }}>
										<h3 className="text-center">
											TERMS AND CONDITIONS OF
											<a href="http://www.tex-change.com"> WWW.TEX-CHANGE.COM</a>
										</h3>
										<p>Last Revision: December 22, 2019</p>
										<p>
											<strong>PLEASE READ THESE TERMS OF USE CAREFULLY BEFORE USING THIS WEBSITE.</strong>
										</p>
										<p>
											The following Terms and Conditions govern and apply to your use of or reliance upon this website
											maintained by Texchange, (the &ldquo;Website&rdquo;)
										</p>
										<p>
											Your access or use of the Website indicates that you have read, understand and agree to be bound
											by these Terms and Conditions and any other applicable laws, statutes and/or regulations.&nbsp;
										</p>
										<ol>
											<li>
												<strong> INTELLECTUAL PROPERTY</strong>
											</li>
										</ol>
										<p>
											All intellectual property on the Website (except for User Generated Content, as defined below) is
											owned by us or our licensors, which includes materials protected by copyright, trademark, or
											patent laws. All trademarks, service marks and trade names are owned, registered and/or licensed
											by us. All content on the Website (except for User Generated Content, as defined below), including
											but not limited to text, software, code, designs, graphics, photos, sounds, music, videos,
											applications, interactive features and all other content is a collective work under Canadian and
											other copyright laws and is the proprietary property of the Company; All rights reserved.
										</p>
										<ol start="2">
											<li>
												<strong> USE OF COMPANY MATERIALS</strong>
											</li>
										</ol>
										<p>
											We may provide you with certain information as a result of your use of the Website including, but
											not limited to, documentation, data, or information developed by us, and other materials which may
											assist in the use of the Website or Services ("Company Materials"). The Company Materials may not
											be used for any other purpose than the use of this Website and the services offered on the
											Website. Nothing in these Terms of Use may be interpreted as granting any license of intellectual
											property rights to you.&nbsp;
										</p>
										<ol start="3">
											<li>
												<strong> USER GENERATED CONTENT</strong>
											</li>
										</ol>
										<p>
											"User Generated Content" is communications, materials, information, data, opinions, photos,
											profiles, messages, notes, website links, text information, music, videos, designs, graphics,
											sounds, and any other content that you and/or other Website users post or otherwise make available
											on or through the Website, except to the extent the content is owned by us.
										</p>
										<ol start="4">
											<li>
												<strong> ACCOUNT AND ACCOUNT USE</strong>
											</li>
										</ol>
										<p>
											If your use of the Website requires an account identifying you as a user of the Website (an
											"Account"):
										</p>
										<ol>
											<li>
												a) you are solely responsible for your Account and the maintenance, confidentiality and security
												of your Account and all passwords related to your Account, and any and all activities that occur
												under your Account, including all activities of any persons who gain access to your Account with
												or without your permission;
											</li>
											<li>
												b) you agree to immediately notify us of any unauthorized use of your Account, any service
												provided through your Account or any password related to your Account, or any other breach of
												security with respect to your Account or any service provided through it, and you agree to
												provide assistance to us, as requested, to stop or remedy any breach of security related to your
												Account, and
											</li>
											<li>
												c) you agree to provide true, current, accurate and complete customer information as requested
												by us from time to time and you agree to promptly notify us of any changes to this information
												as required to keep such information held by us current, complete and accurate.&nbsp;
											</li>
										</ol>
										<ol start="5">
											<li>
												<strong> SALE OF GOODS AND SERVICES</strong>
											</li>
										</ol>
										<p>
											We may sell goods or services or allow third parties to sell goods or services on the Website. We
											undertake to be as accurate as possible with all information regarding the goods and services,
											including product descriptions and images. However, we do not guarantee the accuracy or
											reliability of any product information and you acknowledge and agree that you purchase such
											products at your own risk.&nbsp;
										</p>
										<ol start="6">
											<li>
												<strong> SHIPPING, DELIVERY AND RETURN POLICY</strong>
											</li>
										</ol>
										<p>
											You agree to ensure payment for any items you may purchase from us or a third party and you
											acknowledge and affirm that prices are subject to change.&nbsp;
										</p>
										<p>
											For any questions, concerns, or disputes, you agree to contact us in a timely manner at the
											following: <a href="mailto:texchangeuwo@gmail.com">texchangeuwo@gmail.com</a>
										</p>
										<ol start="7">
											<li>
												<strong> ACCEPTABLE USE</strong>
											</li>
										</ol>
										<p>
											You agree not to use the Website for any unlawful purpose or any purpose prohibited under this
											clause. You agree not to use the Website in any way that could damage the Website, the services or
											the general business of TexChange
										</p>
										<p>You further agree not to use and/or access the Website:</p>
										<ol>
											<li>a) To harass, abuse, or threaten others or otherwise violate any person's legal rights;</li>
											<li>b) To violate any intellectual property rights of us or any third party;</li>
											<li>
												c) To upload or otherwise disseminate any computer viruses or other software that may damage the
												property of another;
											</li>
											<li>d) To perpetrate any fraud;</li>
											<li>e) To engage in or create any unlawful gambling, sweepstakes, or pyramid scheme;</li>
											<li>f) To publish or distribute any obscene or defamatory material;</li>
											<li>
												g) To publish or distribute any material that incites violence, hate or discrimination towards
												any group;
											</li>
											<li>h) To unlawfully gather information about others.</li>
										</ol>
										<ol start="8">
											<li>
												<strong> PROTECTION OF PRIVACY</strong>
											</li>
										</ol>
										<p>
											Through your use of the Website, you may provide us with certain information. By using the
											Website, you authorize us to use your information in Canada and any other country where We may
											operate.
										</p>
										<p>
											When you register for an account, you provide us with a valid email address and may provide us
											with additional information, such as your name. Depending on how you use our Website, we may also
											receive information from external applications you use to access our Website, or we may receive
											information through various web technologies, such as cookies, log files, clear gifs, web beacons
											or others.
										</p>
										<p>
											We use the information gathered from you to ensure your continued good experience on our website,
											including through email communication. We may also track certain of the passive information
											received to improve our marketing and analytics, and for this, we may work with third-party
											providers.
										</p>
										<p>
											If you would like to disable our access to any passive information we receive from the use of
											various technologies, you may choose to disable cookies in your web browser. Please be aware that
											we will still receive information about you that you have provided, such as your email address.
										</p>
										<ol start="9">
											<li>
												<strong> REVERSE ENGINEERING &amp; SECURITY</strong>
											</li>
										</ol>
										<p>You may not undertake any of the following actions:</p>
										<ol>
											<li>
												a) Reverse engineer, or attempt to reverse engineer or disassemble any code or software from or
												on the Website;
											</li>
											<li>
												b) Violate the security of the Website through any unauthorized access, circumvention of
												encryption or other security tools, data mining or interference to any host, user or network.
											</li>
										</ol>
										<ol start="10">
											<li>
												<strong> DATA LOSS</strong>
											</li>
										</ol>
										<p>
											Texchange will use reasonable efforts to protect your personal information. We are not responsible
											for the security of your Account or Content. Your use of the Website is at your own risk. Please
											contact us in a timely manner if any questions about our Privacy Policy arises.
										</p>
										<ol start="11">
											<li>
												<strong> INDEMNIFICATION</strong>
											</li>
										</ol>
										<p>
											You defend and indemnify TexChange and any of its affiliates and hold us harmless against any and
											all legal claims and demands, including reasonable attorney's fees, which may arise from or relate
											to your use or misuse of the Website, your breach of these Terms and Conditions, or your conduct
											or actions. We will select our own legal counsel and may participate in our own defence, if we
											wish to do so.
										</p>
										<ol start="12">
											<li>
												<strong> ADVERTISING CONTENT</strong>
											</li>
										</ol>
										<p>
											The services may present advertisements or links connected to third party websites, products
											and/or services (&ldquo;Third Party Ads&rdquo;). We are not responsible for the availability of
											these Third Party Ads, or the material contained therein. Texchange will not be liable for any
											errors in content or omissions in any Third Party Ads, nor responsible for losses or damages
											incurred as a result of your participation with, use of, or reliance on the Third Party Ads
											including any goods, products, or services offered by such Third Party Ads.
										</p>
										<ol start="13">
											<li>
												<strong> SERVICE INTERRUPTIONS</strong>
											</li>
										</ol>
										<p>
											We may need to interrupt your access to the Website to perform maintenance or emergency services
											on a scheduled or unscheduled basis. You agree that your access to the Website may be affected by
											unanticipated or unscheduled downtime, for any reason, but that we will have no liability for any
											damage or loss caused as a result of such downtime.
										</p>
										<ol start="14">
											<li>
												<strong> TERMINATION OF ACCOUNT</strong>
											</li>
										</ol>
										<p>
											We may, in our sole discretion, suspend, restrict or terminate your Account and your use of the
											Website, effective at any time, without notice to you, for any reason, including because the
											operation or efficiency of the Website or our or any third party's equipment or network is
											impaired by your use of the Website, any amount is past due from you to us, we have received a
											third party complaint which relates to your use or misuse of the Website, or you have been or are
											in breach of any term or condition of these Terms and Conditions. We will have no responsibility
											to notify any third party, including any third party providers of services, merchandise or
											information, of any suspension, restriction or termination of your access to the Website.
										</p>
										<ol start="15">
											<li>
												<strong> NO WARRANTIES</strong>
											</li>
										</ol>
										<p>
											Your use of the Website is at your sole and exclusive risk and any services provided by us are on
											an "as is" basis. We disclaim any and all express or implied warranties of any kind, including,
											but not limited to the implied warranty of fitness for a particular purpose and the implied
											warranty of merchantability. We make no warranties that the Website will meet your needs or that
											the Website will be uninterrupted, error-free, or secure. We also make no warranties as to the
											reliability or accuracy of any information on the Website or obtained through the Services. Any
											damage that may occur to you, through your computer system, or as a result of loss of your data
											from your use of the Website is your sole responsibility and we are not liable for any such damage
											or loss.
										</p>
										<ol start="16">
											<li>
												<strong> PRIVACY</strong>
											</li>
										</ol>
										<p>
											Internet communications are subject to interception, loss or alteration and, as a consequence, you
											acknowledge that information or data you provide by electronic means by accessing or using this
											Website are not confidential or exclusive, except to the extent required by the applicable laws,
											and that communications by email may be intercepted, altered or lost.&nbsp;
										</p>
										<p>For more information, please refer to our Privacy Policy, available on the Website.</p>
										<ol start="17">
											<li>
												<strong> LIMITATION ON LIABILITY</strong>
											</li>
										</ol>
										<p>
											We are not liable for any damages that may occur to you as a result of your use of the Website, to
											the fullest extent permitted by law. The maximum liability of TexChange arising from your use of
											the Website is limited to the greater of one hundred ($100) Canadian Dollars. This applies to any
											and all claims by you, including, but not limited to, lost profits or revenues, consequential or
											punitive damages, negligence, strict liability, fraud, or torts of any kind.
										</p>
										<ol start="18">
											<li>
												<strong> NOTIFICATION OF CHANGES</strong>
											</li>
										</ol>
										<p>
											We may revise these terms from time to time. These changes will not be retroactive and the most
											current version of the terms listed at <a href="http://www.tex-change.com">www.tex-change.com</a>,
											will govern our relationship with you. We will attempt to notify you of related material
											provisions via a service notification to your account. By continuing to access our services after
											these revisions become effective, you agree to be bound by the revised terms.
										</p>
									</ModalBody>
									<ModalFooter>
										<Button color="primary" onClick={this.agree}>
											Agree
										</Button>{" "}
										<Button color="secondary" onClick={this.toggleAll}>
											Disagree
										</Button>
									</ModalFooter>
								</Modal>

								<Button color="dark" style={{ marginTop: "2rem" }} block>
									Register
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
	justRegistered: state.auth.justRegistered,
	isAuthenticated: state.auth.isAuthenticated,
	error: state.error
});

//mapping function, {actions to be executed},, component name
export default connect(
	mapStateToProps,
	{ register, clearErrors } //any action we want to use from Redux gets put here
)(RegisterModal);
