const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
SALT_WORK_FACTOR = 10; //to defeat rainbow table attack and resist brute-force attacks

//Getting Book model to embed in UserSchema as a document
const Book = require("./Book");

const Schema = mongoose.Schema;

//Create schema

var UserSchema = new Schema({
	email: { type: String, required: true, index: { unique: true } },
	password: { type: String, required: true },
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: false
	},
	toBuy: [{ type: Schema.Types.ObjectId, ref: "Book" }],
	toSell: [{ type: Schema.Types.ObjectId, ref: "Book" }],
	offers: [{ book: { type: Schema.Types.ObjectId, ref: "Book" }, buyer: { type: Schema.Types.ObjectId, ref: "User" } }],
	sold: [{ book: { type: Schema.Types.ObjectId, ref: "Book" }, buyer: { type: Schema.Types.ObjectId, ref: "User" } }]
});

// creating model to use schema and export it

module.exports = mongoose.model("User", UserSchema);
