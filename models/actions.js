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
    getAllNotches: function(req,res){
        Notch.find({}).then(data => {
            res.send(data);
        }).catch(err => {
            console.log('Error: ' + err);
        })
    },

    

    getNotches: function (req, res) {

        if (req.body.category) 
        {
         
         Notch.find({"category":req.body.category}, function (err, data){
            if (err) {
                console.log(err);
                res.send('unsuccessful');
            } else {

              res.send(data);
          }

      } ).then(data => {
        res.send(data);
    }).catch(err => {
        console.log('Error: ' + err);
    })
} else if(req.body.userId)
{

    Notch.find(req.body.userId, function (err, data){
        if (err) {
            console.log(err);
            res.send('unsuccessful');
        } else {

            res.send(data);
        }
    }
    ).then(data => {
        res.send(data);
    }).catch(err => {
        console.log('Error: ' + err);
    })
}

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
                //console.log(data);
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