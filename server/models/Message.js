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


////////// Statics //////////////

MessageSchema.statics.getAll = function () {
  return this.find()
    .sort({ date: -1 })
    .populate({
      path: 'user_id', select: 'handle'
    })
}


MessageSchema.statics.addNew = function (dat) {
  
  const newMessage = new this({
    user_id: dat.user_id,
    game_id: dat.game_id,
    content: dat.content
  });

  return newMessage.save()
    .then(message => {
      mongoose.model("Game").updateOne(
        { _id: dat.game_id },
        { $push: { messages: message._id }}
      ).catch(err => console.log(err));

      return message;
    })
}

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

module.exports = Message = mongoose.model("Message", MessageSchema);