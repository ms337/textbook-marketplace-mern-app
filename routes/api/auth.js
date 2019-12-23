const express = require("express");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

const router = express.Router();

//User Model

const User = require("../../models/User");

//Login
//@route POST api/auth
//$desc Authenticate user
//@access Public

router.post("/", (req, res) => {
	const { email, password } = req.body;

	//Validation
	if (!email || !password) {
		return res.status(400).json({ message: "Please enter all the fields" }); //bad request
	}

	//Check for existing user
	User.findOne({ email }).then(user => {
		if (!user) return res.status(400).json({ message: "User does not exist." });

		if (!user.confirmed) {
			return res.status(400).json({ message: "Email needs to be verified before logging in." });
		}
		//Compare email and password
		//Validate password

		bcrypt.compare(password, user.password).then(isMatch => {
			//incorrect login
			if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

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

//Getting current activated user data
//@route GET api/auth/user
//@access Private, uses token in header

router.get("/user", auth, (req, res) => {
	User.findById(req.user.id)
		.select("-password")
		.then(user => res.json(user));
});

module.exports = router;
