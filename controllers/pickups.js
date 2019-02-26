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
  };
  //making new pickup from model
  var pickup = new Pickup(req.body);
  pickup.save(function (err) {
    if (err) return res.redirect('/new');
    console.log(pickup + ' pickup');
    res.render('pickups/soccer', { user: req.user });
  });
  adding pickup to host playerShcema
  Player.findById(req.user, function (err, player) {
    console.log(player);
    player.currentGame.push(pickup);
    player.save(function (err) {
      res.redirect('pickups/new', { user: req.user }); /*Need different redirect*/
    });
  });
};

function showSport(req, res) {
  res.render('pickups/soccer', { user: req.user});
};
