const mongoose = require("mongoose");
const Chance = require("chance");
const User = require("../models/User");
const Game = require("../models/Game");
const Message = require("../models/Message");
chance = new Chance();

require("../models/model_index");
const db = require("../config/keys").mongoURI;


// requires a pre seed of users and probably playerstates...
const seedMessages = async (min, max) => {

  // const users = await User.find();
  const games = await Game.find();

  for (let game of games) {
    let numMessages = chance.integer({min: min, max: max});
    for (let i = 0; i < numMessages; i++) {
      await Message.addNew({
        game: game.game_id,
        user: chance.pickone(game.players)['_id'],
        content: chance.sentence(),
      })
    }
  }
}

const deleteMessages = () => {
  mongoose 
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async db =>{
      console.log("Dropping messages...")
      await Message.deleteMany()
        .then(res => console.log(res))
        .catch(err => console.log(err))

      await Game.updateMany({}, {$set: {"messages": []}} )
        .then(res => console.log(res))
        .catch(err => console.log(err))

      db.connection.close();
    })
};

module.exports = {
  deleteMessages
}