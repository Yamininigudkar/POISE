const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notchSchema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  userId:{ type:Schema.Types.ObjectId, ref:"User" },
  description:{ type: String, required: true },
  latitude:{ type: Number, required: true },
  longitude:{ type:Number, required: true },
  img: {type: String,data:Buffer,default:"http://www.wiu.edu/student_services/housing/residence_halls/images/furniture/no-image-available.png"},
  date: { type: Date, default: Date.now }
});

const Notch = mongoose.model("Notch", notchSchema);

module.exports = Notch;
