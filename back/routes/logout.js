var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


// Cryptage et Token, pour un temps plein d'espoir
// var bcrypt = require('bcryptjs');
// var jwt = require('jsonwebtoken');
// var JWT_SECRET = 'shuebfosnefihnepmrgn"àrubzçisub::;(§è!çàhtisbofgnspf';

/* Connect one User. */
router.post('/', async (req, res, next) => {
  if(req.sess.user) {
    delete req.sess.user;
  }
});


// TROLOLOL, gros souvenir de quand j'ai oublié de modifier le getElementById et que j'aie tourné pendant 6h alors que j'avais déjà la logique



module.exports = router;