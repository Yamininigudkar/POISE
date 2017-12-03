const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notchSchema = new Schema({
	title: { type: String, required: true },
	category: { type: String, required: true },
	userId:{ type:Schema.Types.ObjectId, ref:"User",required: true },
	description:{ type: String, required: true },
	latitude:{ type: Number, required: true },
	longitude:{ type:Number, required: true },
	img: {contentType: String,data:Buffer},
	date: { type: Date, default: Date.now }
});

const Notch = mongoose.model("Notch", notchSchema);

module.exports = Notch;
