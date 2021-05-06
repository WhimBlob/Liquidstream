var express = require('express');
var router = express.Router();

/* GET userlist. */
// router.get('/userlist', function(req, res) {
//   var db = req.db;
//   var collection = db.get('userlist');
//   collection.find({},{},function(e,docs){
//     res.json(docs);
//   });
// });
router.get('/userlist', function(req, res) {
  findUser(client, req.body.username)
});

/* POST to adduser. */
// router.post('/adduser', function(req, res) {
//   var db = req.db;
//   var collection = db.get('userlist');
//   collection.insert(req.body, function(err, result){
//     res.send(
//       (err === null) ? { msg: '' } : { msg: err }
//     );
//   });
// });

router.post('/adduser', function(req, res) {
  addUser(client,
    {

    })
});

module.exports = router;
