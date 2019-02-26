var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  // avatar: String,
  googleId: {
    type: String,
    required: true,
  },
  currentGame: [pickUpsSchema], /*WANT TO ADD FUNCTION THAT PUSHES CURRENTGAME INTO PASTGAMES*/
  pastGames: [],
}, {
  timestamps: true,
});

var pickUpsSchema = new mongoose.Schema({
  sport: { type: String },
  host: [playerSchema.name],
  hostComments: { type: String },
  numOriginalPlayers: { type: Number },
  rsvp: [playerSchema.name],
/*  Need to add location (DD or Gmaps)*/
}, {
  timestamps: true,
});

module.exports = mongoose.model('pickUps', pickUpsSchema);
