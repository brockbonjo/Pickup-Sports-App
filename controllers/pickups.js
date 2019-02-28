const Pickup = require('../models/pickup');
const Player = require('../models/player');
const Comment = require('../models/comment');

module.exports = {
  allSports,
  newForm,
  createNew,
  showSoccer,
  showGame,
  deleteGame,
  showProfile,
  joinGame,
  addComment,
  showProfile,
};

function addMap() {

}

function showSoccer(req, res) {
  console.log(req.params.sport);
  Pickup.find({ }).sort('-createdAt').exec(function (err, pickup) {
    res.render('pickups/soccer', { user: req.user, pickup: pickup });
  });
};

function showProfile(req, res) {
  Player.findById(req.user._id, function(err, player) {
    console.log(player.pastGames);
    res.render('pickups/profile', {
      user: req.user._id,
      player,
    });
  });
}

// function showProfile(req, res) {
//   Player.findById(req.user._id)
//   res.render('pickups/profile', {
//     user: req.user._id
//   })
// }

function addComment(req, res) {
  // console.log(req.body);
  // console.log(req.user);
  // console.log(req.params.id);
  // var comment = new Comment({
  //   content: req.body,
  //   player: req.user._id,
  //   pickup: req.params.id,
  // });
  // comment.save(function (err) {});
  var comment = new Comment(req.body);
  comment.info = req.body;
  comment.player = req.user.id;
  comment.pickup = req.params.id;
  comment.save;

  Pickup.findById(req.params.id, function (err, pickup) {
    Comment.find({ _id: '5c7784c5344f1100ccfb2518' }, function (err, comments) {
      /*console.log(comment);*/
      console.log(comments + ' after find');
      res.render('pickups/show', {
        pickup,
        user: req.params.id,
        comments,
      });

    });
  });
}

  // Comment.findById(req.params.id, function (err, pickup) {
  //     res.render('pickups/show', {
  //       pickup: pickup,
  //       user: req.params.id,
  //     });
  //   });


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
    Pickup.find({}).sort('-createdAt').exec(function (err, pickup) {
      res.render('pickups/soccer', { user: req.user, pickup: pickup });
    });
  });
}

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



function newForm(req, res, next) {
  //need to hide if not logged in
  Player.findById(req.user._id).exec(function (err, player) {
    res.render('pickups/new', { user: req.user, player: player });
  });
};




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
