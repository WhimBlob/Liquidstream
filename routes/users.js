var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require("../models/user.js")

/* GET users listing. */
router.get('/', async (req, res, next) => {
  res.json(await mongoose.model('User').find({})) //SELECT *
});

// Create One User
router.post('/', async (req, res, next) => {
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

module.exports = router;
