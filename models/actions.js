let bodyParser = require('body-parser');
let axios = require('axios');
let bcrypt = require('bcrypt');
var session = require('express-session');

let User = require('./user.js');
let Notch = require('./notch.js');


module.exports = {

  
   
    newUser: function (req, res) {
        console.log(req);
        User.findOne({ 'username': req.body.username }, function (err, user) {
            if (err) {
                console.log(err);
                res.send('unsuccessful');
            } else if (user == null) {
                // console.log('no user');
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(req.body.password, salt, function (err, hash) {
                        let newUser = {
                            firstName:req.body.firstName,
                            lastName:req.body.lastName,
                            username: req.body.username,
                            password: hash
                            
                        }
                        // console.log(newUser);
                        User.create(newUser).then(data => {
                            // console.log(data);
                            res.send('success');
                        }).catch(err => {
                            console.log(err);
                        })
                    });
                });
            } else {
                // console.log(user);
                res.send('unsuccessful');
            }
        });
    },

    

    getNotches: function (req, res) {
        // console.log(req.body);
        // console.log('finding notches');
        let lng = req.body.lng;
        let lat = req.body.lat;
        if (req.body.category != 'All') {
            let category = req.body.category.split("|");
            var parent = category[0].trim();
            var child = category[1].trim();
        } else {
            var parent = { $exists: true }
            var child = { $exists: true }
        }
        Notch.find({
            "geometry": {
                $near: {
                    $geometry: { type: "Point", coordinates: [lng, lat] },
                    $maxDistance: 160000
                }
            },
            "properties.category_parent": parent,
            "properties.category_child": child
        }
        ).then(data => {
            // console.log('found notches');
            // console.log(data);
            res.send(data);
        }).catch(err => {
            console.log('Error: ' + err);
        })
    },

    findOne: function (req, res) {
        // console.log(req.body);
        Notch.findById(req.body.id, function (err, data) {
            if (err) {
                console.log(err);
                res.send('unsuccessful');
            } else {
                // console.log('found one');
                // console.log(data);
                res.send(data);
            }
        })
    },

    userNotches: function(req, res) {
        console.log(req.body);
        Notch.find({"userId": req.session.userId}, function(err, data) {
            if (err) {
                console.log(err);
            } else {
                console.log('user Notches');
                console.log(data);
                res.send(data);
            }
        })
    },

    deleteNotch: function(req, res) {
        Notch.findByIdAndRemove(req.body.id, function(err, data) {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
                res.send('success');
            }
        })
    }
}