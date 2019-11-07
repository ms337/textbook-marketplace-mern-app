const express = require("express");

const router = express.Router();

//Book Model

const Book = require("../../models/Book");

//@route GET api/books
//@desc Get all books
//@access Public
router.get("/", (req, res) => {
	Book.find().then(items => res.json(items));
});

//@route POST api/books
//@desc  Create a Book
//@access Public
router.post("/", (req, res) => {
	let newBook = new Book({
		name: req.body.name,
		author: req.body.author,
		courses: req.body.courses,
		price: req.body.price,
		quality: req.body.quality
	});
	newBook.save().then(book => res.json(book)); //saving to DB
});

//@route POST api/books
//@desc  Create a Book
//@access SHOULD BE PRIVATE

//NEED TO FIX THIS
router.delete("/:id", (req, res) => {
	Book.findById(req.params.id) //gives promise back
		.then(book => book.remove().then(() => res.json({ success: true })))
		.catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
