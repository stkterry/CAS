const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const MessageSchema = new Schema({

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  game: {
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
      { _id: this.game },
      { $push: { messages: this._id }}
    )
    .catch(err => {throw new Error("Couldn't save to game messages")})
})

// MessageSchema.post("save", async function() {
//   await this.populate({
//     path: 'user', model: ''
//   })
// })

////////// Statics //////////////

MessageSchema.statics.getAll = function () {
  return this.find()
    .sort({ date: -1 })
    .populate({
      path: 'user', select: 'handle'
    })
}

MessageSchema.statics.addNew = function (messageDat) {
  let newMessage = {
    user: messageDat.user._id,
    game: messageDat.game,
    content: messageDat.content
  }
  return Message.create(newMessage)
    // .then(message => message.populate({
    //   path: 'user', model:'User', select: 'handle'
    // }).execPopulate())

}


//*************************** */
MessageSchema.statics.getGameMessages = function (gameId) {
  return mongoose.model("Game").findById(gameId, 'messages')
    .populate({
      path: 'messages', populate: {
        path: 'user', model: 'User', select: 'handle'
      }, select: 'user content date -_id'
    })
}

MessageSchema.statics.getMessagesByGameId = function (gameId) {
  return this.find({ game: gameId }, 'user content date -_id')
    .populate({
      path: 'user', model: 'User', select: 'handle'
    })
}
//*************************** */

MessageSchema.statics.getOne = function (_id) {
  return this.findById(_id, '-__v')
    .populate({
      path: 'user', model: 'User', select: '_id handle'
    })
}

module.exports = Message = mongoose.model("Message", MessageSchema);