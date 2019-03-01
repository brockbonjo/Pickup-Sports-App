var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var commentSchema = new mongoose.Schema({
  player: { type: Schema.Types.ObjectId, ref: 'Player' },
  pickup: { type: Schema.Types.ObjectId, ref: 'pickUp' },
  info: String,
}, {
  timestamps: true,
});

module.exports = mongoose.model('comment', commentSchema);
