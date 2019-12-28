const express = require("express");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");

const auth = require("../../middleware/auth"); //To include authentication when transacting books

const router = express.Router();

//User Model

const User = require("../../models/User");
const Book = require("../../models/Book");
const Verification = require("../../models/Verification");

//Nodemailer
const nodemailer = require("nodemailer");
const email = config.get("gmailId");
const gPassword = config.get("gmailPassword");
const transporter = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		user: email,
		pass: gPassword
	}
});

//Registering New Users
//@route GET api/users
//$desc Registering a new user
//@access Public

router.post("/", (req, res) => {
	const { name, email, password } = req.body;

	//Validation
	if (!name || !email || !password) {
		return res.status(400).json({ message: "Please enter all the fields" }); //bad request
	}

	//Email validation for UWO only
	validDomains = ["uwo.ca"];

	var splt = email.split("@");
	if (!validDomains.includes(splt[1])) {
		return res.status(400).json({ message: "Only @uwo.ca email addresses allowed." });
	}

	//Check for existing user
	User.findOne({ email }).then(user => {
		if (user) return res.status(400).json({ message: "A user account with the email already exists." });

		const newUser = new User({
			name,
			email,
			password,
			confirmed: false
		});

		//Create salt & hash
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newUser.password, salt, (err, hash) => {
				if (err) throw err; //err NEED HANDLING FUNCTIONALITY?
				newUser.password = hash; //save password as hash
				newUser.save().then(user => {
					jwt.sign(
						{
							user: user.id
						},
						config.get("emailJWTSecret"),
						{
							expiresIn: "1d"
						},
						(err, emailToken) => {
							if (err) return res.status(400).json({ message: "Verification token could not be created." });
							const url = "http://" + req.get("host") + "/api/verify/" + `${emailToken}`;
							let newVerificationObj = new Verification({
								token: emailToken,
								userId: user.id
							});
							newVerificationObj.save().catch(err => {
								res
									.status(404)
									.json({ success: false, message: "Could not save verification object to DB, backend problem." });
							});

							transporter.sendMail(
								{
									to: user.email,
									subject: "Confirm you TexChange Account Registration",
									html: `Hi, <br> Thank you for signing up for TexChange! Please click this link to confirm your email: <a href= "${url}">Verify: ${url}</a>`
								},
								(err, info) => {
									if (err) {
										console.log(err);
										//RESPONSE OBJECT DOES NOT EXIST
										return res.status(400).json({ message: "Could not send verification email." });
									} else {
										console.log("WOOORKS");
										res.json({ message: "Please check your email for verification." });
									}
								}
							);
						}
					);
				});
			});
		});
	});
});

//Making offer to buy a book
//@route PUT /api/users/id
//$desc
//@access Private

router.put("/:id", auth, (req, res) => {
	try {
		if (req.params.id != req.user.id) {
			throw e;
		}

		if (req.body.action == "buying") {
			//Making offer to Buy

			User.findByIdAndUpdate(req.params.id, { $push: { toBuy: req.body.bookId } }).catch(err => {
				return res.json({ success: false, message: "Cannot add the book to buyer's toBuys", err: err });
			});

			User.findByIdAndUpdate(req.body.sellerId, {
				$push: { offers: { book: req.body.bookId, buyer: req.body.buyerId } }
			})
				.then(() => res.json({ success: true }))
				.catch(err => {
					return res.json({
						success: false,
						message: "Cannot make offer to seller: cannot add to seller's offers[]",
						err: err
					});
				});
		} else if (req.body.action == "selling") {
			//Confirming offer to Sell

			User.findByIdAndUpdate(req.params.id, {
				$pull: { toSell: req.body.bookId, offers: { book: req.body.bookId, buyer: req.body.buyerId } },
				$push: { sold: { book: req.body.bookId, buyer: req.body.buyerId } }
			}).catch(err => {
				return res.status(404).json({
					success: false,
					message:
						"Could not update seller to 1. remove the book from toSell[], 2. remove from offers[], 3. add to sold[]"
				});
			});

			User.findByIdAndUpdate(req.body.buyerId, { $pull: { toBuy: req.body.bookId } }) //Remove from toBuy
				.catch(err => {
					return res
						.status(404)
						.json({ success: false, message: "Could not update buyer to remove the book from toBuy" });
				});

			Book.findByIdAndDelete(req.body.bookId) //Delete book from DB
				.then(res.json({ success: true }))
				.catch(err => {
					return res.status(404).json({ success: false, message: "Book could not be deleted from DB" });
				});
		}
	} catch (e) {
		res.status(404).json({
			success: false,
			message: "User modifying is not authenticated by token"
		});
	}
});

module.exports = router;
