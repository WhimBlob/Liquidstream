var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require("../models/user.js")
var jwt = require('jsonwebtoken');
var JWT_SECRET = 'shuebfosnefihnepmrgn"àrubzçisub::;(§è!çàhtisbofgnspf';

/* GET users listing. */
router.get('/', async (req, res, next) => {
  res.json(await mongoose.model('User').find({})) //SELECT *
});

// Create One User
router.post('/signup', async (req, res, next) => {
  res.json(await mongoose.model('User').create(req.body));
});

// Proven
router.put('/:id', async (req, res, next) => {
  res.json(await mongoose.model('User').findByIdAndUpdate(req.params.id, req.body)); //SELECT req.body
});

router.delete('/:id', async (req, res, next) => {
  res.json(await mongoose.model('User').findByIdAndRemove(req.params.id,)); //SELECT req.body
});

router.get('/:id', async (req, res, next) => {
  res.json(await mongoose.model('User').findById(req.params.id,)); //SELECT req.body
});

// Cryptage pour un temps plein d'espoir
// var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var JWT_SECRET = 'shuebfosnefihnepmrgn"àrubzçisub::;(§è!çàhtisbofgnspf';

/* Connect one User. */
router.post('/login', async (req, res, next) => {
  var {logusername, logpassword} = req.body
  var user = await mongoose.model('User').findOne({logusername, logpassword}).lean();
  console.log(user);

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username
    },
    JWT_SECRET
  )
  console.log(token);
  console.log(user._id);
  res.json({token});

  if (!user) {
    return res.json({status: 'error', error: 'Invalid username/password'})
  }
});

// GET LOGGED USER
const auth = function(req, res, next) {
  const token = req.header("token");
  if (!token) return res.status(401).json({ message: "Auth Error" });

  try {
    const decoded = jwt.verify(token, "randomString");
    req.user = decoded.user;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Invalid Token" });
  }
};

router.get("/me", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});

module.exports = router;
