var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/todos', function(req, res) {
  var db = req.db;
  db.find(function(err, todos) {
  	#
  })
});

module.exports = router;
