const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Create schema

const BookSchema = new Schema({
	name: { type: String, required: true, index: { unique: false } },
	author: { type: String, required: true },
	edition: { type: String, required: false },
	courses: { type: [String], required: true },
	price: { type: mongoose.Decimal128, required: true },
	program: { type: String, required: false },
	quality: { type: Number, required: true },
	seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
	imageURL: { type: String, required: false }
});

BookSchema.index({ name: "text", author: "text" });
module.exports = mongoose.model("Book", BookSchema);

// Book.find({ $text: { $search: req.query.search } }, { score: { $meta: "textScore" } })
// 	.sort({ score: { $meta: "textScore" } })
// 	.limit(100)
// 	.then(items => res.json(items));
