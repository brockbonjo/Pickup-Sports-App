var mongoose = require('mongoose');
var Schema = mongoose.Schema;




var pickUpSchema = new mongoose.Schema({
  sport: { type: String, required: true },
  location: { type: String, required: true },
  host: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
  hostComments: { type: String },
  otherComments: [],
  numOriginalPlayers: { type: Number, required: true, default: 1 },
  rsvp: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
/*  Need to add location (DD or Gmaps)*/
}, {
  timestamps: true,
});

// var playerSchema = new mongoose.Schema({
  //   name: {
    //     type: String,
    //     required: true,
    //   },
    //   email: {
      //     type: String,
      //     required: true,
      //   },
      //   // avatar: String,
      //   googleId: {
        //     type: String,
        //     required: true,
        //   },
        //   currentGame: [pickUpSchema], /*WANT TO ADD FUNCTION THAT PUSHES CURRENTGAME INTO PASTGAMES*/
        //   pastGames: [],
        // }, {
          //   timestamps: true,
          // });
module.exports = mongoose.model('pickUp', pickUpSchema);
