var mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema defines how chat messages will be stored in MongoDB
var ChatSchema = new mongoose.Schema(
	{
		from: {
			type: Schema.Types.ObjectId,
			required: true
		},
		to: {
			type: Schema.Types.ObjectId,
			required: true
		},
		messageArray: [{ type: String, required: true }],
		fromName: {
			type: Schema.Types.String,
			required: true
		},
		seenByRec: {
			type: Schema.Types.Boolean,
			required: true
		}
	},
	{
		timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
	}
);

module.exports = mongoose.model("Chat", ChatSchema);
