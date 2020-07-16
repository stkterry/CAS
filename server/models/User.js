const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  return this.findByIdAndUpdate(
    user_id,
    { $addToSet: { game_ids: game_id }},
    { new: true }
  )
};

UserSchema.statics.removeGame = function (user_id, game_id) {
  return this.findByIdAndUpdate(
    user_id,
    { $pull: { game_ids: game_id }},
    { new: true }
  )
};

module.exports = User = mongoose.model("User", UserSchema);