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
})

module.exports = User = mongoose.model("User", UserSchema);