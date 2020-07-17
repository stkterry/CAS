const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  host: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  players: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  rules: {
    type: Array,
    default: []
  },
  name: {
    type: String,
    default: ""
  },
  game_state: {
    type: Schema.Types.Mixed,
    default: {}
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Game = mongoose.model("Game", GameSchema);