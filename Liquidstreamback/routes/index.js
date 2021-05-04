var express = require('express');
const User = require('../models/User');
const { route } = require('./users');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// /* GET Userlist page. */
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('users');
  collection.find({},{},function(e,docs){
      res.render('userlist', {
          "userlist" : docs
      });
  });
});

// GET New user page
router.get('/newuser', function(req,res) {
  res.render('newuser', {title: 'Add New User'});
});

/* POST to Add User Service */
router.post('/', function(req, res, next) {
  // Set our internal DB variable
  var db = req.db;
  // Get the password to hash 
  // Pour hasher le mdp
  var crypto = require('crypto');
  var hash = crypto.createHash('md5').update(req.body.usermdp).digest('hex');
  // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userMdp = hash;
  // Set our collection
  var userCollection = db.get('users');
  sess=req.session;
  sess.user = userCollection;
  // Submit to the DB
  userCollection.insert({
      "username" : userName,
      "mdp" : userMdp
  }, function (err, doc) {
      if (err) {
          // If it failed, return error
          res.send("There was a problem adding the information to the database.");
      }
      else {
          // And forward to success page
          res.redirect("/");
      }
  });
});

module.exports = router;






// THE LAND OF THE FORGOTTEN HOPES

// router.get('/newuser', function(req,res) {
//   res.render('newuser', {title: 'Add New User'});
// });
// /* POST to Add User Service */
// router.post('/', function(req, res, next) {
//   // Pour hasher le mdp
//   var crypto = require('crypto');
//   var hash = crypto.createHash('md5').update(req.body.usermdp).digest('hex');
//   // Get our form values. These rely on the "name" attributes
//   var user = new User({
//     username: req.body.username,
//     userMdp: hash
//   })
//   user.save().then(
//     () => {
//       res.status(201).json({
//         message: 'Post saved successfully!'
//       });
//     }
//   ).catch(
//     (error) => {
//       res.status(400).json({
//         error: error
//       });
//     }
//   );
// });



// // Get one user
// router.get('/userlist', (req, res, next) => {
//   User.findOne({
//     _id: req.params.id
//   }).then(
//     (user) => {
//       res.status(200).json(user);
//     }
//   ).catch(
//     (error) => {
//       res.status(404).json({
//         error: error
//       });
//     }
//   );
// });