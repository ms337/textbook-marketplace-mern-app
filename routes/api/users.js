const express = require("express");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");

const auth = require("../../middleware/auth"); //To include authentication when transacting books

const router = express.Router();

//User Model

const User = require("../../models/User");
const Book = require("../../models/Book");

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
	//Check for existing user
	User.findOne({ email }).then(user => {
		if (user) return res.status(400).json({ message: "User already exists" });

		const newUser = new User({
			name,
			email,
			password
		});

		//Create salt & hash
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newUser.password, salt, (err, hash) => {
				if (err) throw err; //err NEED HANDLING FUNCTIONALITY?
				newUser.password = hash; //save password as hash
				newUser.save().then(user => {
					//payload can be anything, *****
					jwt.sign({ id: user.id }, config.get("jwtSecret"), { expiresIn: 7200 }, (err, token) => {
						if (err) throw err;
						res.json({
							token, //same as token = token
							user: {
								id: user.id,
								name: user.name,
								email: user.email
							}
						});
					});
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
