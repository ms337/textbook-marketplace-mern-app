var mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema defines how chat messages will be stored in MongoDB
var VerificationSchema = new mongoose.Schema(
	{
		token: { type: Schema.Types.String, required: true },
		userId: { type: Schema.Types.ObjectId, required: true }
	},
	{
		timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
	}
);

module.exports = mongoose.model("Verification", VerificationSchema);
