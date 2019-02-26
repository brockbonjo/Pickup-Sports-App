const Player = require('../models/player');

module.exports = {
  allSports,
  newForm,
  showSport,
  newGame,
  rsvp,
  comment,
  createNew
};

function createNew(req, res) {
  res.redirect();
}

function comment(req, res) {
  res.redirect();
}

function rsvp(req, res) {
  res.redirect();
}

function allSports(req, res, next) {
  console.log(req.user + 'hey');
  res.render('pickups/landingPage', { user: req.user });
};

function newForm(req, res, next) {
  res.render('pickups/new', { user: req.user });
};

function showSport(req, res) {
  res.render('pickups/soccer', { user: req.user});
};

function newGame(req, res) {
  res.render('pickups/soccer', {user: req.user});
};
