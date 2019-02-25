var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var Player = require('../models/player');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK,
}, function (accessToken, refresh, profile, cb) {
  Player.findOne({googleId: profile.id}, function (err, player) {
    if (err) return cb(err);
    if (player) {
      //has logged in before with google
      cb(null, player);
    } else {
      //new user/not logged in before
      var Player = new Player({
        name: profile.displayName,
        email: profile.emails[0].value,
        googleId: profile.id,
      });
      newPlayer.save(function(err) {
        if (err) return cb(err);
        return cb(null, newPlayer);
      })
    };
  });
}));

passport.serializeUser(function (player, done) {
  done(null, player.id);
});

passport.deserializeUser(function (id, done) {
  Player.findById(id, function (err, player) {
    done(err, player);
  })
});
