let express = require('express');
let router = new express.Router();
let path = require('path');
let actions = require('../models/actions.js');
var session = require('express-session');
let User = require('../models/user.js');
let bcrypt = require('bcrypt');
let Notch = require('../models/notch.js');
let multer = require('multer');



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

var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
        }
    });


router.post('/newNotch', function (req, res) {
    console.log("adding notch")
    var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, 'C:/output/image/uploads/')
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
        }
    });
    var upload = multer({ //multer settings
                    storage: storage
                }).single(req.body.img);
    //console.log("upload : ",upload);
    router.post('/newNotch', function(req, res) {
        upload(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
             res.json({error_code:0,err_desc:null});
        })
         
    });
        
        let notch = {
            title:req.body.title,
            category:req.body.category,
            userId:req.session.userId,
            description:req.body.description,
            latitude:req.body.latitude,
            longitude:req.body.longitude,
            img:req.body.img
            
        }
         
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