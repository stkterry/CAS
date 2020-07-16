const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  host: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  players: [{
    type: Schema.Types.ObjectId,
    ref: "users"
  }],
  rules: {
    type: Array,
    default: []
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Game = mongoose.model("Game", GameSchema);