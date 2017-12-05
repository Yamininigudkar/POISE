const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var path = require("path");
var session = require('express-session');
const app = express();
let routes = require('./controllers/notchController.js');
const debug = require ("debug")
const PORT = process.env.PORT || 3001;

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));
app.use(session({ 
	secret: 'poise',
	key: 'user_sid',
	resave: false,
	saveUninitialized: false, cookie: { maxAge: 6000000 }
}))

//Requiring the routes from the controllers.js file
app.use('/', routes);

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
	process.env.MONGODB_URI || "mongodb://localhost/poiseDb",
	{
		useMongoClient: true
	}
	);

const Notch = require('./models/notch')
app.get('/notch/123/img', (req, res) => {
	res.contentType('image/jpg')
	Notch.findOne({_id: "5a25a0c32db4d241108cb43f"}).then(notch => res.send(notch.img.data))
})

// Start the API server
app.listen(PORT, function() {
	console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
