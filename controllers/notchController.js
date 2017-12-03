let express = require('express');
let router = new express.Router();
let path = require('path');
let actions = require('../models/actions.js');
var session = require('express-session');
let User = require('../models/user.js');
let bcrypt = require('bcrypt');
let Notch = require('../models/notch.js');
let multer = require('multer');
let fs = require('fs');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
},
filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+'JPG')
}
})
var upload = multer({ storage: storage }).single('imageKey');

router.post('/uploadnotch', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      // An error occurred when uploading+
      return
  }
  res.json("success")

    // Everything went fine
})
})




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
    console.log("adding notch")
    // console.log(req)
    // file = req.body.img
    // console.log(file)

    let notchObj = new Notch ({
        title:req.body.title,
        category:req.body.category,
        userId:req.session.userId,
        description:req.body.description,
        latitude:req.body.latitude,
        longitude:req.body.longitude,
        img:req.body.img

    })
    // notchObj.img.data= fs.readFileSync(imgPath);
    // notchObj.img.contentType='image/JPG'
    //console.log(notchObj.i)
    console.log("============================================================")
    notchObj.save(function (err, notchObj) {
      if (err) throw err;

      console.error('saved img to mongo');
  });
    console.log(notchObj)

    notch.img.contentType = 'jpg';

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