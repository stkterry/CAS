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
  },
  rounds: { type: Number },


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
};
const cardPop = {
  path: 'white black', select: '-date -__v'
};
const packPop = {
  path: 'cardPacks', select: 'name _id quantity'
};

const playerStatesPop = {
  path: 'playerStates', select: '-white -black'
}

const cardsInPlayPop = {
  path: 'cardsInPlay.white cardsInPlay.black', select: '-date -__v'
}

const activeGameSelect = 'players rules cardPacks name messages _id host cardsInPlay rounds currentTurn'

// populate replacement...
GameSchema.statics.lookup = function({ path, query }) {
  let rel = mongoose.model(this.schema.path(path).caster.options.ref);

  // $lookup with sub-pipeline
  let pipeline = [
    { "$lookup": {
      "from": rel.collection.name,
      "as": path,
      "let": { [path]: `$${path}` },
      "pipeline": [
        {"$match": {
          ...query,
          "$expr": { "$in": [ "$_id", `$$${path}` ] }
        }}
      ]
    }}
  ]

  return this.aggregate(pipeline).exec().then(res => res.map(m => 
    this({ ...m, [path]: m[path].map(res => rel(res)) })
  ));
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

GameSchema.statics.getPlayerState = function(game_id, user_id) {

  return this.findById(game_id, 'playerStates')
    .populate({
      path: 'playerStates.white playerStates.black', select: '-date -__v'
    }).then(game => game.playerStates.id(user_id))

    
}

GameSchema.statics.getActive = function(game_id, user_id) {

  return this.findById(game_id, activeGameSelect)
    .populate(playerPop)
    .populate(packPop)
    .populate(cardsInPlayPop)
    .populate({
      path: 'playerStates', select: '-_id -score'
    })
}


GameSchema.statics.dropMessages = function (game_id = null) {

  return this.findById(game_id, 'messages')
    .then(async game => {
      await mongoose.model('Message').deleteMany({ _id: { $in: game.messages }});
      await game.updateOne({$set : { messages: [] }} );
      return game;
    })

}




module.exports = Game = mongoose.model("Game", GameSchema);