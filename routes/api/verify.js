const express = require("express");

const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

const router = express.Router();

//Models
const User = require("../../models/User");
const Verification = require("../../models/Verification");

router.get("/:token", (req, res) => {
	try {
		//Verify the token
		const decoded = jwt.verify(token.params.token, config.get("emailJWTSecret"));
		//Add user to request from paylod
		req.user = decoded;
		next();
	} catch (e) {
		res.status(400).json({ message: "Token is not valid." });
	}

	Verification.findOne({ token: req.params.token })
		.then(user => {
			User.findByIdAndUpdate(user.userId, { confirmed: true }).catch(err => {
				res.status(404).json({ success: false, message: "Cannot find user of the id, backend problem." });
			});
			res.json({ success: true, message: "Your email is verified. Log in again to continue." });
		})
		.catch(err => {
			res.status(40).json({ success: false, message: "Verification Link is invalid or has expired." });
		});
});

module.exports = router;
