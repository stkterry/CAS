const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Game = require("./Game");

const UserSchema = new Schema({
  handle: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  games: [{
    type: Schema.Types.ObjectId,
    ref: "Game"
  }],
  date: {
    type: Date,
    default: Date.now
  },
});

UserSchema.statics.addGame = function (userId, gameId) {
  const uAdd = this.findByIdAndUpdate(
    userId,
    { $addToSet: { games: gameId }},
    { new: true }
  )

  const gAdd = Game.findByIdAndUpdate(
    gameId,
    { $addToSet: { players: userId }},
    { new: true }
  )

  return (uAdd, gAdd);
};

UserSchema.statics.removeGame = function (userId, gameId) {
  const uRemove = this.findByIdAndUpdate(
    userId,
    { $pull: { games: gameId } },
    { new: true }
  )

  const gRemove = Game.findByIdAndUpdate(
    gameId,
    { $pull: { players: userId } },
    { new: true }
  )

  return (uRemove, gRemove);
};

module.exports = User = mongoose.model("User", UserSchema);