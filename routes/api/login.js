const express = require("express");

const router = express.Router();

//User Model

const User = require("../../models/User");

router.post("/", (req, res) => {
	// const newUser = new User({
	// 	email: req.body.email,
	// 	password: req.body.password,
	// 	firstName: req.body.firstName,
	// 	lastName: req.body.lastName
	// });

	// newUser.save(err => {
	// 	if (err) throw err;
	// });

	// res.json(newUser);

	// User.findOne({ email: req.body.email }, function(err, user) {
	// 	if (err) throw err;

	// 	user.comparePassword(req.body.password, function(err, isMatch) {
	// 		if (err) {
	// 			console.log("Password incorrect");
	// 			throw err;
	// 		}
	// 		console.log("Password is matched: ", isMatch);
	// 	});
	// });

	var testUser = new User({
		email: "jmar777",
		password: "Password123",
		firstName: "j"
	});
	// save user to database
	testUser.save(function(err) {
		if (err) throw err;
		// fetch user and test password verification
		User.findOne({ email: "jmar777" }, function(err, user) {
			if (err) throw err;
			// test a matching password
			user.comparePassword("Password123", function(err, isMatch) {
				if (err) throw err;
				console.log("Password123:", isMatch); // -> Password123: true
			});
			// test a failing password
			user.comparePassword("123Password", function(err, isMatch) {
				if (err) throw err;
				console.log("123Password:", isMatch); // -> 123Password: false
			});
		});
	});
});

module.exports = router;
