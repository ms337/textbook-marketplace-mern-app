const express = require("express");

const router = express.Router();

const auth = require("../../middleware/auth");

//Book Model
const Book = require("../../models/Book");
const User = require("../../models/User");

//CDN librarires
const cloudinary = require("cloudinary");
const multer = require("multer");
const cloudinaryStorage = require("multer-storage-cloudinary");

//text is query : cf> https://stackoverflow.com/questions/38421664/fuzzy-searching-with-mongodb
function escapeRegex(text) {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

//Cloudinary Config
cloudinary.config({
	cloud_name: "texchange",
	api_key: 852474873596592,
	api_secret: "Jb2scvfgedVSMn17DphW05GJFQc",
});

const storage = cloudinaryStorage({
	cloudinary: cloudinary,
	folder: "demo",
	allowedFormats: ["jpg", "png"],
	transformation: [{ width: 480, height: 640, crop: "limit" }],
});
const parser = multer({ storage: storage });

//@route GET api/books
//@desc Get all books
//@access Publicxw

//NEEEEED TO PUT BACK auth middle argument
router.get("/", (req, res) => {
	if (req.query.search) {
		// escapeRegex(req.query.search);
		const regex = new RegExp(escapeRegex(req.query.search), "gi"); //gi are flags

		Book.find({ $or: [{ name: regex }, { author: regex }] }).then((books) => res.json(books));
	} else {
		Book.find().then((books) => res.json(books));
	}
});

//Case 1: add to toSell, and Books Db
//@route POST api/books
//@desc  Create a Book
//@access private, will find user calling the function, i.e. creating the posting to sell the book and add to his to Sell books

//NEEEEED TO PUT BACK auth middle argument
router.post("/", auth, parser.single("file"), (req, res) => {
	console.log(req.file);
	let newBook = new Book({
		name: req.body.name,
		author: req.body.author,
		courses: req.body.courses,
		price: req.body.price,
		quality: req.body.quality,
		edition: req.body.edition,
		seller: req.user.id,
		imageURL: req.file.url,
	});
	newBook
		.save()
		.then((book) => {
			User.findByIdAndUpdate(req.user.id, { $push: { toSell: book._id } })
				.then(() => res.json(book))
				.catch((err) => {
					res.status(404).json({ success: false });
				});
		})
		.catch((err) => res.status(404).json({ success: false, message: err }));
	//saving to DB
});

//@route POST api/books
//@desc  Create a Book
//@access SHOULD BE PRIVATE : now done through tokens

//NEED TO FIX THIS
router.delete("/:id", auth, (req, res) => {
	Book.findById(req.params.id) //gives promise back
		.then((book) =>
			book
				.remove()
				.catch((err) => {
					console.log(err);
					res.status(404).json({ success: false });
				})
				.then(() => res.json({ success: true }))
		);
});

module.exports = router;
