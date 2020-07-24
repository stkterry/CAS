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

  cardPacks: [{
    type: Schema.Types.ObjectId,
    ref: "CardPack"
  }],

  white: [{
    type: Schema.Types.ObjectId,
    ref: "Card"
  }],

  black: [{
    type: Schema.Types.ObjectId,
    ref: "Card"
  }],

  discardedWhite: [{
    type: Schema.Types.ObjectId,
    ref: "Card"
  }],

  name: {
    type: String,
    default: ""
  },

  game_state: {
    type: {
      playerStates: [{
        _id: {type: Schema.Types.ObjectId, ref: "User"},
        white: [{ type: Schema.Types.ObjectId, ref: "Card" }],
        black: [{ type: Schema.Types.ObjectId, ref: "Card" }],
        score: { type: Number } 
      }, {_id: false}],
      currentTurn: { type: Schema.Types.ObjectId, ref: "User" },
      cardsInPlay: {
        white: [{ type: Schema.Types.ObjectId, ref: "Card" }],
        black: { type: Schema.Types.ObjectId, ref: "Card" }
      }
    },
    _id: false,
    default: {
      playerStates: {},
      currentTurn: null,
      cardsInPlay: {
        white: [],
        black: null
      }
    },
  },

  messages: [{
    type: Schema.Types.ObjectId,
    ref: "Message"
  }],

  date: {
    type: Date,
    default: Date.now
  }
}, { typePojoToMixed: false })

const playerPop = {
  path: 'host players', select: 'handle _id'
}
const cardPop = {
  path: 'white black', select: '-date -__v'
}
const packPop = {
  path: 'cardPacks', select: 'name _id quantity'
}

GameSchema.statics.getAll = function() {
  
  return this.find()
    .sort({ date: -1 })
    .populate(playerPop)
    .populate(packPop)
}

GameSchema.statics.getUserGames = function(user_id) {

  return mongoose.model('User').findById(user_id, 'game_ids')
    .then(userDat => (this.find({ '_id': {$in: userDat.game_ids }} )))


}

GameSchema.statics.getGame = function(game_id) {

  return this.findById(game_id)
    .populate(playerPop)
    .populate(packPop)
}

GameSchema.statics.getPlayerState = function(game_id, user_id, res) {

  // return this.findById(game_id, (err, game) => {
  //   if (err) return err;
  //   res.json(game.game_state.playerStates.id(user_id));
  // })

  return this.findById(game_id)
    .then(game => game.select({
      path: 'game_state'
    }))
    // .select({
    //   path: 'game_state.playerStates', select: { '_id' : user_id }
    // })
}

// GameSchema.methods.getPlayerState = function (user_id, res) {
//   console.log(this.model('Game').find({ 'games_state.playerStates': user_id }))
//   return res.json({get: 'lost'})

// }

GameSchema.statics.getActive = function(game_id, res) {

  return this.findById(game_id, '__v')
    .populate(playerPop)
    .populate(cardPop)
    .then(game => res.json(game))
}

module.exports = Game = mongoose.model("Game", GameSchema);