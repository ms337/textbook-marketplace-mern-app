const mongoose = require("mongoose");

//Getting Book model to embed in UserSchema as a document

const Schema = mongoose.Schema;

//Create schema

var UserSchema = new Schema(
	{
		email: { type: String, required: true, index: { unique: true } },
		password: { type: String, required: true },
		name: {
			type: String,
			required: true
		},
		toBuy: [{ type: Schema.Types.ObjectId, ref: "Book" }],
		toSell: [{ type: Schema.Types.ObjectId, ref: "Book" }],
		offers: [
			{
				book: { type: Schema.Types.ObjectId, ref: "Book" },
				buyer: { type: Schema.Types.ObjectId, ref: "User" }
			}
		],
		sold: [
			{
				book: { type: Schema.Types.ObjectId, ref: "Book" },
				buyer: { type: Schema.Types.ObjectId, ref: "User" }
			}
		],
		confirmed: {
			type: Schema.Types.Boolean,
			required: true
		}
	},
	{ timestamps: true }
);

// creating model to use schema and export it

module.exports = mongoose.model("User", UserSchema);
