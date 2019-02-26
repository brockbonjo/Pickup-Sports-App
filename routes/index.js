var express = require('express');
var router = express.Router();
var passport = require('passport');
var pickupsController = require('../controllers/pickups');

/* GET home page. */

router.get('/', pickupsController.allSports);

router.get('/new', pickupsController.newForm);

router.get('/sport', pickupsController.showSport);
// router.get('/sport/:id', function (req, res, next) {
//   res.render('pickups/:id/')
// })

router.post('/sport', pickupsController.newGame);





//All google/passport below

router.get('/auth/google', passport.authenticate(
  'google',
  {
    scope: ['profile', 'email'],
  }

));

router.get('/oauth2callback', passport.authenticate('google',
{
  successRedirect: '/soccer',
  failureRedirect: '/soccer',
}
));

//log out Routes
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
