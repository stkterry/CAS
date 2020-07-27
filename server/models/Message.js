const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const MessageSchema = new Schema({

  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  game_id: {
    type: Schema.Types.ObjectId,
    ref: "Game",
    required: true
  },

  content: {
    type: String,
    maxlength: 256,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  }

})

/// PRE ////////////

// MessageSchema.pre('deleteOne', async function() {
//   const messageId = await this.getQuery()["_id"];
//   const message = this;
//   await message.model('Game').updateOne({ $pull: { messages: messageId }});
// })

MessageSchema.pre("save", async function() {
  await mongoose.model("Game")
    .updateOne(
      { _id: this.game_id },
      { $push: { messages: this._id }}
    )
    .catch(err => {throw new Error("Couldn't save to game messages")})
})

////////// Statics //////////////

MessageSchema.statics.getAll = function () {
  return this.find()
    .sort({ date: -1 })
    .populate({
      path: 'user_id', select: 'handle'
    })
}

MessageSchema.statics.addNew = function (message) {
  return Message.create({
    user_id: message.user_id,
    game_id: message.game_id,
    content: message.content   
  })
}


//*************************** */
MessageSchema.statics.getGameMessages = function (game_id) {
  return mongoose.model("Game").findById(game_id, 'messages')
    .populate({
      path: 'messages', populate: {
        path: 'user_id', model: 'User', select: 'handle'
      }, select: 'user_id content date'
    })
}

MessageSchema.statics.getMessagesByGameId = function (game_id) {
  return this.find({ game_id: game_id }, 'user_id content date')
    .populate({
      path: 'user_id', model: 'User', select: 'handle'
    })
}
//*************************** */

MessageSchema.statics.getOne = function (_id) {
  return this.findById(_id, '-__v')
    .populate({
      path: 'user_id', model: 'User', select: '_id handle'
    })
}

module.exports = Message = mongoose.model("Message", MessageSchema);