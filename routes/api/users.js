const express = require("express");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");

const router = express.Router();

//User Model

const User = require("../../models/User");

//Registering New Users
//@route GET api/users
//$desc Registering a new user
//@access Public

router.post("/", (req, res) => {
	const { firstName, email, password } = req.body;

	//Validation
	if (!firstName || !email || !password) {
		return res.status(400).json({ message: "Please enter all the fields" }); //bad request
	}
	//Check for existing user
	User.findOne({ email }).then(user => {
		if (user) return res.status(400).json({ message: "User already exists" });

		const newUser = new User({
			firstName,
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
								firstName: user.firstName,
								email: user.email
							}
						});
					});
				});
			});
		});
	});
});

module.exports = router;
