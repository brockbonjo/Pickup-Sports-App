var mongoose = require('mongoose');

// There is no model and no 'facts' collection

var playerSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatar: String,
  googleId: String,
  currentGame: {},
  pastGames: {},
}, {
  timestamps: true,
});

module.exports = mongoose.model('Player', playerSchema);
