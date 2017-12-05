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

                        User.create(newUser).then(data => {
                            res.send('success');
                        }).catch(err => {
                            console.log(err);
                        })
                    });
                });
            } else {
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

    console.log("this is the req")
    Notch.findOne({_id:req.params.id}).then(notch => {

        console.log("yeeessss")
        res.send(notch)
        
    })
},
findOneImage: function (req, res) {
    console.log("this is the req")
    res.contentType('image/jpg')
    Notch.findOne({_id:req.params.id}).then(notch => {

        console.log("yeeessss")
        res.send(notch.img.data)


    })
},


userNotches: function(req, res) {
    console.log(req.body);
    Notch.find({"userId": req.session.userId}, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log('user Notches');
            res.send(data);
        }
    })
},

deleteNotch: function(req, res) {
    console.log(req.body, "this is the req body")
    Notch.findByIdAndRemove(req.body.id, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            res.send('success');
        }
    })
},
searchNotches: function(req, res) {
    let category = req.params.category
    Notch.find({"category": category}, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log('search Notches');
            res.json(data);
        }
    })

},
searchNotchesKeyWord: function(req, res) {
    let keyWord = req.params.keyWord
   // db.products.find( { sku: { $regex: /^ABC/i } } )
   Notch.find({ title: { $regex: `/${keyWord}/`} }, function(err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log('search Notches');
        res.json(data);
    }
})

}



}