const mongoose = require("mongoose");
const Chance = require("chance");
const User = require("../models/User");
const Game = require("../models/Game");
const Message = require("../models/Message");
chance = new Chance();

require("../models/model_index");
const db = require("../config/keys").mongoURI;


// requires a pre seed of users and probably playerstates...
const seeder= async (min=5, max=20) => {

  const games = await Game.find();
  let count = 0;
  for (let game of games) {
    let numMessages = chance.integer({min: min, max: max});
    let messages = new Array(numMessages);
    for (let i = 0; i < numMessages; i++) {
      messages[i] = new Message({
        game: game._id,
        user: chance.pickone(game.players)['_id'],
        content: chance.sentence(),
      })

    }
    
    await Message.insertMany(messages)
      .catch(err => err);
    game.messages = messages.map(message => message._id);
    await game.save();
    console.log(`Game : ${game._id} : ${messages.length} messages `);
  }
  
}

const seedMessages = () => {
  mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async db => {
      console.log("Seeding messages...");
      await seeder()
        .catch(err => console.log(err));
        
    db.connection.close();
  })
}

const dropMessages = () => {
  mongoose 
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async db =>{
      console.log("Dropping messages...")
      await Message.deleteMany()
        .catch(err => console.log(err))

      await Game.updateMany({}, {$set: {"messages": []}} )
        .catch(err => console.log(err))

      db.connection.close();
    })
};

module.exports = {
  dropMessages,
  seedMessages
}