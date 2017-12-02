const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notchSchema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  userId:{ type:Schema.Types.ObjectId, ref:"User",required: true },
  description:{ type: String, required: true },
  latitude:{ type: Number, required: true },
  longitude:{ type:Number, required: true },
  img: {type: String,data:Buffer,default:"https://www.jtelectrical.com/content/images/thumbs/0003253_erra31542_strate_line_receptacle_300.jpeg"},
  date: { type: Date, default: Date.now }
});

const Notch = mongoose.model("Notch", notchSchema);

module.exports = Notch;
