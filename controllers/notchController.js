let express = require('express');
let router = new express.Router();
let path = require('path');
let actions = require('../models/actions.js');
var session = require('express-session');
let User = require('../models/user.js');
let bcrypt = require('bcrypt');
let Notch = require('../models/notch.js');
let fs = require('fs');
var multer = require('multer');

//Routes
router.get('/', function (req, res) {
  res.send(path.join(__dirname + './public/index.html'));
})


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+'JPG')
  }
})
var upload = multer({ storage: storage });

router.post('/uploadnotch', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return
    }
    res.json("success")
    
  })
})
router.post('/newNotch',upload.any() ,function (req, res) {
  var imgPath = req.files[0].path

  let notchObj = new Notch ({
    title:req.body.title,
    category:req.body.category,
    userId:req.session.userId,
    description:req.body.description,
    latitude:req.body.latitude,
    longitude:req.body.longitude,

  })
  notchObj.img.data= fs.readFileSync(imgPath);
  notchObj.img.contentType='image/JPG'

  notchObj.save(function (err, notchObj) {
    if (err) throw err;

  });

});


// Receives and authenticates login information from existing users
router.post('/existinguser', function(req,res){
  User.findOne({ 'username': req.body.username }, function (err, user) {
    if (err) {
      console.log(err);
      res.send('unsuccessful');
    } else if (user == null) {
      res.send('unsuccessful');
    } else {
      var savedHash = user.password;
      bcrypt.compare(req.body.password, savedHash, function (err, status) {
                    // console.log(status);
                    if(status === true){
                      req.session.userId = user._id
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
})

// Accepts login information from new users, checks if the username exists, and saves the user if unique
router.post('/newuser', actions.newUser);
router.post('/getNotches', actions.getNotches);
router.get('/notches', actions.getAllNotches);
router.get('/findone/:id', actions.findOne);
router.get('/findoneimage/:id', actions.findOneImage);
router.get('/userNotches', actions.userNotches);
router.post('/deleteNotch', actions.deleteNotch);
router.get('/notches/list_by_category/:category', actions.searchNotches);

module.exports = router;