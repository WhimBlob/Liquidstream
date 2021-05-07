var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var session = require('express-session');


// Cryptage et Token, pour un temps plein d'espoir
// var bcrypt = require('bcryptjs');
// var jwt = require('jsonwebtoken');
// var JWT_SECRET = 'shuebfosnefihnepmrgn"àrubzçisub::;(§è!çàhtisbofgnspf';

/* Connect one User. */
router.post('/', async (req, res, next) => {
  var {logusername, logpassword} = req.body
  var user = await mongoose.model('User').findOne({logusername, logpassword}).lean();
  console.log(user);
  if (!user) {
    return res.json({status: 'error', error: 'Invalid username/password'})
  }

});


// TROLOLOL, gros souvenir de quand j'ai oublié de modifier le getElementById et que j'aie tourné pendant 6h alors que j'avais déjà la logique



module.exports = router;