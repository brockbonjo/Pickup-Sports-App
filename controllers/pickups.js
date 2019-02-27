const Pickup = require('../models/pickup');
const Player = require('../models/player');

module.exports = {
  allSports,
  newForm,
  createNew,
  showSport,
  showGame,
  deleteGame,
};

function deleteGame(req, res) {
  Pickup.findOne({'_id': req.params.id},
  function (err, pickup) {
    player.id(req.params.id).remove();
    player.save(function (err) {
      res.render('/pickups/soccer');
    });
  });
}

function allSports(req, res, next) {
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
  console.log(req.user._id)
  player.currentGame.push(req.body);
  player.save(function (err) {
    showSport();
    /*Pickup.find({}, function (err, pickup) {
      res.render('pickups/soccer', { user: req.user, pickup: pickup });*/
    /*Need different redirect*/
  });
  pickup.host = player;
  }
)}

function showSport(req, res) {
  Pickup.find({}).sort('-createdAt').exec(function (err, pickup) {
    res.render('pickups/soccer', { user: req.user, pickup: pickup });
  });
};

function showGame(req, res) {
  Pickup.findById(req.params.id)
  .populate('rsvp').exec(function(err, pickup) {
    // Performer.find({}).where('_id').nin(movie.cast)
      console.log(pickup);
      res.render('pickups/show', {
        user: req.user,
        pickup: pickup,
      });
    });
}

/*function showGame(req, res) {
  Pickup.findById(req.params.id)
  .populate('rsvp').exec(function(err, pickup) {
    // Performer.find({}).where('_id').nin(movie.cast)
      console.log(pickup);
      res.render('pickups/show', {
        pickup
      });
    });
  });
}*/
