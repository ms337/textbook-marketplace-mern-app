const mongoose = require("mongoose");
const bcrypt = requrie("brcypt");
SALT_WORK_FACTOR = 10; //to defeat rainbow table attack and resist brute-force attacks

const Schema = mongoose.Schema;

//Create schema

const UserSchema = new Schema({
	email: { type: String, required: true, index: { unique: true } },
	password: { type: String, required: true },
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: false
	}
});

UserSchema.pre("save", () => {
	var user = this;

	//do not hash the password if it is not modified
	if (!user.isModified("password")) return next();

	//generate a salt

	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if (err) return next(err);

		//hash the password + new salt
		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) return next(err);

			user.password = hash;
			next();
		});
	});
});

// "There are a couple things to be aware of though: Because passwords are not hashed until the document is saved, be careful if you’re interacting with documents that were not retrieved from the database, as any passwords will still be in cleartext. Mongoose middleware is not invoked on update() operations, so you must use a save() if you want to update user passwords."

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

// creating model to use schema and export it

module.exports = User = mongoose.model(User, UserSchema);
