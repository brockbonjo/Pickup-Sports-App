const Pickup = require('../models/pickup');
const Player = require('../models/player');

module.exports = {
  allSports,
  newForm,
  createNew,
  showSport,
  showGame,
  deleteGame,
  showProfile,
  joinGame,
};

function joinGame(req, res) {
  var player = req.user;
  /*var pickup = Pickup.findOne({_id: 'req.params'});*/
  Pickup.findById(req.params.id, function (err, pickup) {
    pickup.rsvp.push(player);
    pickup.save(function () {

    });
    player.pastGames = [0];
    player.currentGame = [0];
    player.pastGames.push(player.currentGame);
    player.currentGame.push(pickup);
    player.save(function () {

    });
    console.log(player.currentGame);
    console.log('new instance');
    console.log(player.pastGames);
    res.render('pickups/show', {
      pickup: pickup,
      user: req.params.id,
    });
  });
}

function showProfile(req, res) {
  Player.findById(req.user._id)
  console.log(req.user._id);
  res.render('pickups/profile', {
    user: req.user._id
  })
}


function allSports(req, res, next) {
  res.render('pickups/landingPage', { user: req.user });
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
  var player = req.user;
  console.log(req.user._id)
  player.currentGame.push(req.body);
  player.save(function (err) {
    pickup.host = player;
    Pickup.find({}).sort('-createdAt').exec(function (err, pickup) {
      res.render('pickups/soccer', { user: req.user, pickup: pickup });
    /*Pickup.find({}, function (err, pickup) {
      res.render('pickups/soccer', { user: req.user, pickup: pickup });*/
    /*Need different redirect*/
    });
  });
}


function showSport(req, res) {
  Pickup.find({}).sort('-createdAt').exec(function (err, pickup) {
    res.render('pickups/soccer', { user: req.user, pickup: pickup });
  });
};

function newForm(req, res, next) {
  //need to hide if not logged in
  console.log(req.use);
  Player.findById(req.user._id).exec(function (err, player) {
    console.log(player);
    res.render('pickups/new', { user: req.user, player: player });
  });
};

function showGame(req, res) {
  //need to add player find by id to allow for rsvp
  Pickup.findById(req.params.id)
  .populate('rsvp').exec(function(err, pickup, guy) {
    // Performer.find({}).where('_id').nin(movie.cast)
      res.render('pickups/show', {
        pickup: pickup,
        user: req.params.id,
        /*playerName: guy,*/
      });
    });
}



//probably delete this
function deleteGame(req, res) {
  Pickup.findOne({'_id': req.params.id},
  function (err, pickup) {
    player.id(req.params.id).remove();
    player.save(function (err) {
      res.render('/pickups/soccer');
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
