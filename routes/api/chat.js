const express = require("express");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");

const router = express.Router();

const Chat = require("../../models/Chat");

router.get("/", auth, (req, res) => {
	const { id } = req.user;
	// console.log(id);
	Chat.find({ $or: [{ to: id }, { from: id }] }, function(err, messages) {
		if (err) res.send(err);
		res.json(messages);
	});
});

router.post("/", auth, (req, res) => {
	const userIdFrom = req.user.id;
	// console.log(req);
	const { userIdTo, message, fromName } = req.body;
	var chat = new Chat();
	chat.from = userIdFrom;
	chat.to = userIdTo;
	chat.messageArray = [message];
	chat.seenByRec = false;
	chat.fromName = fromName;

	chat
		.save()
		.then(messageArray => res.json(messageArray))
		.catch(err => res.status(404).json({ success: false, message: err }));
});

// PUT to update a message the authenticated user sent
router.put("/:chatId", auth, function(req, res) {
	Chat.findByIdAndUpdate(req.params.chatId, { $push: { messageArray: req.body.message } })
		.then(messageArray => res.json(messageArray))
		.catch(err => res.status(404).json({ success: false, message: err }));

	// if (err) res.send(err);

	// // Save the updates to the message
	// else res.json({ message: "Message edited!" });
});
//Delete a message

router.delete("/:chatId", auth, (req, res) => {
	const userIdFrom = req.user.id;
	Chat.findOneAndRemove({ $and: [{ _id: req.params.chatId }, { from: userIdFrom }] }, function(err) {
		if (err) {
			console.log(err);
			res.send(err);
		} else res.json({ message: "Message removed!" });
	});
});

module.exports = router;
