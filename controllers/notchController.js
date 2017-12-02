let express = require('express');
let router = new express.Router();
let path = require('path');
let actions = require('../models/actions.js');
var session = require('express-session');
let User = require('../models/user.js');
let bcrypt = require('bcrypt');
let Notch = require('../models/notch.js');



//Routes
router.get('/', function (req, res) {
    res.send(path.join(__dirname + './public/index.html'));
})




// Receives and authenticates login information from existing users
router.post('/existinguser', function(req,res){
	User.findOne({ 'username': req.body.username }, function (err, user) {
            if (err) {
                console.log(err);
                res.send('unsuccessful');
            } else if (user == null) {
                // console.log('no user');
                res.send('unsuccessful');
            } else {
                // console.log(user);
                var savedHash = user.password;
                bcrypt.compare(req.body.password, savedHash, function (err, status) {
                    // console.log(status);
                    if(status === true){
                        req.session.userId = user._id
                        console.log(req.session.userId)
                        res.json(user)
                    } else{
                        res.json('unsuccessful');
                    } 
                });
            }
        })
    }

);
router.get('/logout',function(req,res){
    res.clearCookie('user_sid')
    res.json("success")
    console.log("logout",req.session.userId)
})

// Accepts login information from new users, checks if the username exists, and saves the user if unique
router.post('/newuser', actions.newUser);

router.post('/newNotch', function (req, res) {
         console.log(req.session.userId);
        //let categories = req.body.category.split('|');
        let notch = {
            title:req.body.title,
            category:req.body.category,
            userId:req.session.userId,
            description:req.body.description,
            latitude:req.body.latitude,
            longitude:req.body.longitude,
            img:req.body.img
            
        }
         console.log(req.body.img);
         var image = req.body.img.split("fakepath").pop()
         console.log(image)
        Notch.create(notch).then(data => {
            // console.log(data);
            res.send('success');
        }).catch(err => {
            console.log(err);
            res.send('unsuccessful');
        })
    });

router.post('/getNotches', actions.getNotches);
router.get('/notches', actions.getAllNotches);

router.post('/findone', actions.findOne);

router.post('/userNotches', actions.userNotches);

router.post('/deleteNotch', actions.deleteNotch);

module.exports = router;