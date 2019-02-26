var express = require('express');
var router = express.Router();
var passport = require('passport');
var sportsController = require('../controllers/sports');

/* GET users listing. */

router.get('/:id/:id', sportsController.showSport);

router.get('/:id', sportsController.showGame);

module.exports = router;
