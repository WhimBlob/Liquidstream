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
const app = require('../server.js');
var JWT_SECRET = 'shuebfosnefihnepmrgn"àrubzçisub::;(§è!çàhtisbofgnspf';

/* Connect one User. */
router.post('/login', async (req, res, next) => {
  console.log(req.header("token"));
    var {username, password} = req.body
    var user = await User.findOne({username, password}).lean();
    console.log(user);

    const token = jwt.sign(
      {
          id: user._id,
          username: user.username
      },
      JWT_SECRET,
      {expiresIn: '1d'}
    )

    res.json({
      message: 'Successful log in',
      data: token});

    if (!user) {
      return res.json({status: 'error', error: 'Invalid username/password'})
    }
});

module.exports = router;