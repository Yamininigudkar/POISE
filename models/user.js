let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    firstName:String,
    lastName: String,
    username: {
        type: String,
        index: {
            unique: true
        }
    },
    password: String,
    zipcode: String,
    created: {
        type: Date,
        default: Date.now
    }
});

let User = mongoose.model('User', userSchema);

module.exports = User;