const Pickup = require('../models/pickup');
const Player = require('../models/player');

module.exports = {
  allSports,
  newForm,
  createNew,
  showSport,
};

function allSports(req, res, next) {
  console.log(req.user + 'hey');
  res.render('pickups/landingPage', { user: req.user });
};

function newForm(req, res, next) {
  res.render('pickups/new', { user: req.user });
};

function createNew(req, res) {
  //delting empty keys
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  //making new pickup from model
  var pickup = new Pickup(req.body);
  pickup.save(function (err) {

  });
  // adding pickup to host playerShcema
  var player = new Player(req.user);
  player.currentGame.push(req.body);
  player.save(function (err) {

    console.log(pickup + ' pickup');
    Pickup.find({}, function (err, pickup) {
      res.render('pickups/soccer', { user: req.user, pickup: pickup });
    /*Need different redirect*/
  });
  pickup.host = player;
  }
)}

function showSport(req, res) {
  Pickup.find({}, function (err, pickup) {
    res.render('pickups/soccer', { user: req.user, pickup: pickup });
  });
};
