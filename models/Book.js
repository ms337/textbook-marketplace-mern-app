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
	seller: { type: Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Book", BookSchema);
