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
  game_ids: [{
    type: Schema.Types.ObjectId,
    ref: "games"
  }],
  date: {
    type: Date,
    default: Date.now
  },
});

UserSchema.statics.addGame = function (user_id, game_id) {
  const uAdd = this.findByIdAndUpdate(
    user_id,
    { $addToSet: { game_ids: game_id }},
    { new: true }
  )

  const gAdd = Game.findByIdAndUpdate(
    game_id,
    { $addToSet: { players: user_id }},
    { new: true }
  )

  return (uAdd, gAdd);
};

UserSchema.statics.removeGame = function (user_id, game_id) {
  const uRemove = this.findByIdAndUpdate(
    user_id,
    { $pull: { game_ids: game_id } },
    { new: true }
  )

  const gRemove = Game.findByIdAndUpdate(
    game_id,
    { $pull: { players: user_id } },
    { new: true }
  )

  return (uRemove, gRemove);
};

UserSchema.statics.addRemoveGame = function (command, user_id, game_id) {
  command = function(command) {
    switch (command) {
      case "add":
        return "$addToSet";
      case "remove":
        return "$pull";
      default:
        return null;
    }
  }(command);

  const user = this.findByIdAndUpdate(
    user_id,
    { [command]: { game_ids: game_id } },
    { new: true }
  )

  const game = Game.findByIdAndUpdate(
    game_id,
    { [command]: { players: user_id } },
    { new: true }
  )

  return user, game;

}

module.exports = User = mongoose.model("User", UserSchema);