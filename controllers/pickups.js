const Pickup = require('../models/pickup');
const Player = require('../models/player');
const Comment = require('../models/comment');

module.exports = {
  allSports,
  newForm,
  createNew,
  showSoccer,
  showUltimate,
  showFootball,
  showGame,
  deleteGame,
  showProfile,
  joinGame,
  addComment,
};

function addMap() {

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

function showSoccer(req, res) {
  console.log(req.params.sport);
  Pickup.find({ sport: 'soccer' }).sort('-createdAt').exec(function (err, pickup) {
    res.render('pickups/soccer', { user: req.user, pickup: pickup });
  });
};

function showUltimate(req, res) {
  console.log(req.params.sport);
  Pickup.find({ sport: 'frisbee' }).sort('-createdAt').exec(function (err, pickup) {
    res.render('pickups/ultimate', { user: req.user, pickup: pickup });
  });
};

function showFootball(req, res) {
  console.log(req.params.sport);
  Pickup.find({ sport: 'football' }).sort('-createdAt').exec(function (err, pickup) {
    res.render('pickups/football', { user: req.user, pickup: pickup });
  });
};

function showProfile(req, res) {
  Player.findById(req.user._id, function(err, player) {
    console.log(player.avatar);
    res.render('pickups/profile', {
      user: req.user._id,
      player,
    });
  });
}


function addComment(req, res) {
  var comment = new Comment(req.body);
  comment.info = req.body;
  comment.player = req.user.id;
  comment.pickup = req.params.id;
  comment.save;
  console.log(comment);
  Pickup.findById(req.params.id, function (err, pickup) {
    // console.log(req.params.id);
    // console.log(comment + ' after find');
    pickup.otherComments.push(comment);
    pickup.save;
    req.user.save;
    console.log(pickup.otherComments);
    res.render(`pickups/show`, {
      pickup,
      user: req.user.id,
    }
  );
  });
}

// function addComment(req, res) {
//   var comment = new Comment(req.body);
//   comment.info = req.body;
//   comment.player = req.user.id;
//   comment.pickup = req.params.id;
//   comment.save;
//   console.log(comment);
//
//   Pickup.findByIdAndUpdate(req.params.id, function (pickup) {
//     pickup.otherComments.push(comment);
//     console.log(pickup.otherComments);
//     res.render('pickups/show', {
//       pickup,
//       user: req.user.id,
//     });
//   });
// }

function joinGame(req, res) {
  var player = req.user;
  Pickup.findById(req.params.id, function (err, pickup) {
    pickup.rsvp.push(player);
    pickup.save(function () {

    });

    player.currentGame = [0];
    player.pastGames.push(player.currentGame);
    player.currentGame.push(pickup);
    player.save(function () {

    });
    res.render('pickups/show', {
      pickup: pickup,
      user: req.params.id,
    });
  });
}





function allSports(req, res, next) {
  res.render('pickups/landingPage', { user: req.user });
};


function createNew(req, res) {
  //deleting empty keys
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  //making new pickup from model
  var pickup = new Pickup(req.body);
  pickup.save(function (err) {

  });
  // adding pickup to host playerShcema
  var player = req.user;
  player.currentGame.push(req.body);
  player.save(function (err) {
      pickup.host = player;
      if (pickup.sport == 'frisbee') {
        Pickup.find({ sport: pickup.sport }).sort('-createdAt').exec(function (err, pickup) {
          res.render('pickups/ultimate', { user: req.user, pickup: pickup });
        });} else if (pickup.sport == 'football') {
        Pickup.find({ sport: pickup.sport }).sort('-createdAt').exec(function (err, pickup) {
          res.render('pickups/football', { user:   req.user, pickup: pickup });
        });} else if (pickup.sport == 'soccer') {
        Pickup.find({ sport: pickup.sport }).sort('-createdAt').exec(function (err, pickup) {
          res.render('pickups/soccer', { user:   req.user, pickup: pickup });
        });}
    });
}

function showGame(req, res) {
  //need to add player find by id to allow for rsvp
  Pickup.findById(req.params.id)
  .populate('rsvp').exec(function(err, pickup, guy) {
    // Performer.find({}).where('_id').nin(movie.cast)
    res.render(`pickups/show`, {
      pickup: pickup,
      user: req.params.id,
      /*playerName: guy,*/
    });
  });
}



function newForm(req, res, next) {
  //need to hide if not logged in
  Player.findById(req.user._id).exec(function (err, player) {
    res.render('pickups/new', { user: req.user,
      player: player,
      pickup: req.body });
  });
};
