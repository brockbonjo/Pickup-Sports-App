var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET users listing. */
router.get('/new', function(req, res, next) {
  res.render('respond with a resource');
});

router.get('/sport/:id', function (req, res, next) {
  res.render('')
})

module.exports = router;
