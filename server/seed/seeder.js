const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Chance = require("chance");
chance = new Chance();

const { STATIC_USERS } = require("./static_seeds");
const User = require("../models/User");
const Game = require("../models/Game");
const CardPack = require("../models/CardPack");
require("../models/model_index");
const db = require("../config/keys").mongoURI;

const registerUser = async data => {
  try {
    const { handle, email, password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User(
      {
        handle: handle,
        email: email,
        password: hashedPassword
      },
      err => { if (err) throw err }
    );
    await user.save();
    return user;
  } catch (err) { throw err }
};

const registerGame = async data => {
  try {
    data.rules = data.rules ? data.rules : [];
    const game = new Game(
      data,
      err => {if (err) throw err}
    );
    // game.markModified('playerStates');
    await game.save();
    return game;
  } catch (err) { throw err }
}

const seedUsers = async (amount) => {
  let user;
  let staticCount = 0;
  let randomCount = 0;
  for (let user of STATIC_USERS) {
    user = await registerUser(user)
      .then(user => {
        staticCount++;
        console.log(`Added static user ${user.handle} : ${user._id}`);
      })
      .catch(err => `Couldn't add user because ${err}`);
  }

  for (let i = 0; i < amount; i++) {
    user = await registerUser({
      handle: chance.first() + " " + chance.last(),
      email: chance.email(),
      password: "password"
    })
      .then(user => {
        randomCount++;
        console.log(`Added random user ${user.handle} : ${user._id}`);
      })
    .catch(err => `Couldn't add user because ${err}`);
  }

  console.log(`Added ${staticCount} static and ${randomCount} random users`);
};

const seedGames = async (amount) => {
  const users = await User.find();
  const cardPacks = await CardPack.find();
  const range = {
    min: cardPacks.length ? 3 : 0,
    max: cardPacks.length ? cardPacks.length : 0
  };

  for (let i = 0; i < amount; i++) {
    let host_player = chance.pickone(users);
    let players = [host_player];

    let numPlayers = chance.integer({ min: 2, max: 7 }); // Range excludes host_player
    while (players.length <= numPlayers) {
      let tempPlayer = chance.pickone(users);
      if (String(tempPlayer._id) != String(host_player._id)) {
        players.push(tempPlayer);
      }
    }
    
    // I really can't figure out why this is necessary... maybe it's just that I'm really tired...
    players = [... new Set(players)];

    // Lets setup player states...
    let playerStates = players.map(player => ({
      _id: player._id,
      white: [],
      black: [],
      score:0
    }));
    
    await registerGame({ 
        host: host_player._id, 
        players: players.map(player => player._id),
        name: host_player.handle + "'s Game",
        cardPacks: chance.pickset(cardPacks, chance.integer(range)),
        game_state: {
          playerStates: playerStates,
          cardsInPlay: { white: [], black: null },
          currentTurn: null
        }
      })
      .then(async game => {

        for (let pack of game.cardPacks) {
          game.white.push(...pack.white);
          game.black.push(...pack.black);
        }

        // Lets add some cards to the game_state!
        game.game_state.playerStates = game.game_state.playerStates.map(playerState => {
          let randArr = Array.from({length: 10}, () => {
            let randIdx = Math.floor(Math.random() * game.white.length);
            return game.white.splice(randIdx, 1)[0];
          })
          playerState.white = randArr;

          randArr = Array.from({length: Math.floor(Math.random() * 7)}, () => {
            let randIdx = Math.floor(Math.random() * game.black.length);
            return game.black.splice(randIdx, 1)[0];
          })

          playerState.black = randArr;
          playerState.score = randArr.length;

          return playerState;
        })
        await game.save();

        console.log(`Added Game - Host : ${host_player.handle}, Players: ${game.players.length}`);
        for (let player of players) {
          player.game_ids.push(game._id);
          await player.save();
        }
      })
      .catch(err => console.log(`Couldn't add game because ${err}`));
  }


};

const dropDataBase = async (db) => {
  await db.connection.dropDatabase();
}

const dropCollection = async(db, collection) => 
  await db.connection.dropCollection(collection);

const dropDB = () =>
  mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async db => {
      console.log("Dropping database...")
      await dropDataBase(db)
        .then(() => console.log("...dropped"))
        .catch(err => console.log(err));

      db.connection.close();
    });

const dropDBC = (collections = null) => {
  collections = collections || ['users', 'games'];

  mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async db => {
      for (let collection of collections) {
        console.log(`Dropping ${collection} collection...`)
        await dropCollection(db, collection)
          .then(() => console.log("...dropped"))
          .catch(err => console.log(err));
      }

      db.connection.close();
    });
}

const seedDB = () => 
  mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true  })
    .then(async db => {
      await seedUsers(20)
        .catch(err => console.log(`Couldn't seed users because ${err}`));
      await seedGames(10)
        .catch(err => console.log(`Couldn't seed games because ${err}`));
      
      console.log("Done seeding, exiting.");

      db.connection.close();
    });

  const reseedDB = () => {
    dropDBC()
      .then(() => seedDB())
  }

module.exports = {
  dropDB,
  dropDBC,
  seedDB, 
  reseedDB
};