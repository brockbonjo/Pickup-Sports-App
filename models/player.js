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
  currentGame: [], /*WANT TO ADD FUNCTION THAT PUSHES CURRENTGAME INTO PASTGAMES*/
  pastGames: [],
  timestamps: { type: Date },
});

module.exports = mongoose.model('Player', playerSchema);
