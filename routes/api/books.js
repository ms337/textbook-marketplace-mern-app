const express = require("express");

const router = express.Router();

const auth = require("../../middleware/auth");

//Book Model
const Book = require("../../models/Book");
const User = require("../../models/User");

//text is query : cf> https://stackoverflow.com/questions/38421664/fuzzy-searching-with-mongodb
function escapeRegex(text) {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

//@route GET api/books
//@desc Get all books
//@access Publicxw

//NEEEEED TO PUT BACK auth middle argument
router.get("/", (req, res) => {
	if (req.query.search) {
		// escapeRegex(req.query.search);
		const regex = new RegExp(escapeRegex(req.query.search), "gi"); //gi are flags

		Book.find({ $or: [{ name: regex }, { author: regex }] })
			.explain(1)
			.then(items => res.json(items));
	} else {
		Book.find().then(items => res.json(items));
	}
});

//Case 1: add to toSell, and Books Db
//@route POST api/books
//@desc  Create a Book
//@access private, will find user calling the function, i.e. creating the posting to sell the book and add to his to Sell books

//NEEEEED TO PUT BACK auth middle argument
router.post("/", auth, (req, res) => {
	let newBook = new Book({
		name: req.body.name,
		author: req.body.author,
		courses: req.body.courses,
		price: req.body.price,
		quality: req.body.quality,
		seller: req.user.id
	});
	newBook
		.save()
		.then(book => {
			User.findByIdAndUpdate(req.user.id, { $push: { toSell: book._id } })
				.then(() => res.json(book))
				.catch(err => {
					res.status(404).json({ success: false });
				});
		})
		.catch(err => res.status(404).json({ success: false, message: err }));
	//saving to DB
});

//@route POST api/books
//@desc  Create a Book
//@access SHOULD BE PRIVATE : now done through tokens

//NEED TO FIX THIS
router.delete("/:id", auth, (req, res) => {
	Book.findById(req.params.id) //gives promise back
		.then(book => book.remove().then(() => res.json({ success: true })))
		.catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
