const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//Getting Book model to embed in UserSchema as a document

const Schema = mongoose.Schema;

//Create schema

var UserSchema = new Schema(
	{
		email: { type: String, required: true, index: { unique: true } },
		hashed_password: { type: String, required: true },
		salt: { type: String },
		updated: { type: Date },
		confirmed: {
			type: Schema.Types.Boolean,
			required: true,
		},
		created: {
			type: Date,
			default: Date.now,
		},

		name: {
			type: String,
			trim: true,
			required: true,
		},

		//Profile related fields tracking User behaviour on the platform
		toBuy: [{ type: Schema.Types.ObjectId, ref: "Book" }],
		toSell: [{ type: Schema.Types.ObjectId, ref: "Book" }],
		offers: [
			{
				book: { type: Schema.Types.ObjectId, ref: "Book" },
				buyer: { type: Schema.Types.ObjectId, ref: "User" },
			},
		],
		sold: [
			{
				book: { type: Schema.Types.ObjectId, ref: "Book" },
				buyer: { type: Schema.Types.ObjectId, ref: "User" },
			},
		],
	},
	{ timestamps: true }
);

UserSchema.methods = {
	authenticate: function (password) {
		bcrypt
			.compare(password, this.hashed_password)
			.then(() => true)
			.catch(() => false);
	},

	makeSalt: function () {
		bcrypt
			.genSalt(10)
			.then((salt) => {
				return salt;
			})
			.catch((err) => {
				throw Error("Could not generate salt");
			});
	},

	encryptPassword: function (password) {
		if (!password) throw err;
		bcrypt
			.hash(password, this.salt)
			.then((hash) => (this.hashed_password = hash))
			.catch((err) => {
				console.log(err);
				throw Error("Could not encrypt password");
			});
	},
};

UserSchema.virtual("password")
	.set(function (password) {
		this._password = password;
		this.salt = this.makeSalt();
		this.hashed_password = this.encryptPassword(password);
	})
	.get(function () {
		return this._password;
	});

UserSchema.path("hashed_password").validate(function (v) {
	if (this._password && this._password.length < 6) {
		this.invalidate("password", "Password must be at least 6 characters.");
	}
	if (this.isNew && this._password) {
		this.invalidate("password", "Password is required.");
	}
}, null);

// creating model to use schema and export it

module.exports = mongoose.model("User", UserSchema);
