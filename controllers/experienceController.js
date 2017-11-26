let express = require('express');
let router = new express.Router();
let path = require('path');
let actions = require('../models/actions.js');

//Routes
router.get('/', function (req, res) {
    res.send(path.join(__dirname + './public/index.html'));
})

router.post('/autocomplete', actions.autocomplete);

router.post('/getcoordinates', actions.getCoordinates);

router.post('/googleplaces', actions.googlePlaces);

router.post('/placedetails', actions.placeDetails);

// Receives and authenticates login information from existing users
router.post('/existinguser', actions.existingUser);

// Accepts login information from new users, checks if the username exists, and saves the user if unique
router.post('/newuser', actions.newUser);

router.post('/newExperience', actions.newExperience);

router.post('/getExperiences', actions.getExperiences);

router.post('/findone', actions.findOne);

router.post('/userExperiences', actions.userExperiences);

router.post('/deleteExperience', actions.deleteExperience);

module.exports = router;