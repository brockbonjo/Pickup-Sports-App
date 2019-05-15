var mongoose = require('mongoose');
var Schema = mongoose.Schema;




var pickUpSchema = new mongoose.Schema({
  sport: { type: String, required: true },
  /*location: { type: String, required: true },*/
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
  host: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
  hostComments: { type: String },
  otherComments: [],
  numOriginalPlayers: { type: Number, required: true, default: 1 },
  rsvp: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
  // started: { type: String, default: function () {
  //     var daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  //     var d = new Date();
  //     var n = d.getDay();
  //     var day = daysOfWeek[n];
  //     var hour = d.getHours();
  //     var minute = d.getMinutes();
  //     var time = new Date(day, hour, minute);
  //     return time;
  //   },
  // },
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
