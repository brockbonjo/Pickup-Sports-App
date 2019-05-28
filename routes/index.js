var express = require('express');
var router = express.Router();
var passport = require('passport');
var pickupsController = require('../controllers/pickups');

/* GET home page. */

router.get('/', pickupsController.allSports);

router.get('/new', pickupsController.newForm);

router.get('/soccer', pickupsController.showSoccer);
router.get('/ultimate', pickupsController.showUltimate);
router.get('/football', pickupsController.showFootball);

router.get('/show/:id', pickupsController.showGame);

router.post('/soccer', isLoggedIn, pickupsController.createNew);

router.delete('/show/:id', pickupsController.deleteGame);

router.get('/user/', pickupsController.showProfile)

router.post('/show/:id', pickupsController.joinGame);
router.post('/show/:id/unjoin', pickupsController.unjoinGame);

router.post('/show/:id/comment',  pickupsController.addComment);

router.get('/profile/:id', pickupsController.showProfile);


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
  console.log(req.logout);
  req.logout();
  res.redirect('/');
});

module.exports = router;
