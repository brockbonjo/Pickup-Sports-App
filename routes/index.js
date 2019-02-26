var express = require('express');
var router = express.Router();
var passport = require('passport');
var pickupsController = require('../controllers/pickups');

/* GET home page. */

router.get('/', pickupsController.allSports);

router.get('/new', pickupsController.newForm);

router.get('/soccer', pickupsController.showSport);

router.post('/soccer', isLoggedIn, pickupsController.createNew);


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/google');
}


//All google/passport below

router.get('/auth/google', passport.authenticate(
  'google',
  {
    scope: ['profile', 'email'],
  }

));

router.get('/oauth2callback', passport.authenticate('google',
{
  successRedirect: '/',
  failureRedirect: '/',
}
));

//log out Routes
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
