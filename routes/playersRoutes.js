var express = require('express');
var router = express.Router();
var passport = require('passport');
var playersController = require('../controllers/players');

/* GET users listing. */
router.get('/', playersController.rsvp);

router.get('/', playersController.comment);

module.exports = router;
