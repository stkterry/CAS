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
  const tina = await User.findOne({ 'handle' : 'Tina Careena' }).exec();


  const range = {
    min: cardPacks.length ? 3 : 0,
    max: cardPacks.length ? cardPacks.length : 0
  };

  for (let i = 0; i < amount; i++) {

    let players = chance.shuffle([...users]);
    let numPlayers = chance.integer({ min: 3, max: 7 });
    players.splice(numPlayers);
    if (!players.filter(player => String(player._id) == String(tina._id)).length) {
      players.push(tina);
    }
    let host_player = chance.pickone(players);

    // Lets setup player states...
    let playerStates = players.map(player => ({
      playerId: player._id,
      white: [],
      black: [],
      score:0
    }));
    
    await registerGame({ 
        host: host_player._id, 
        players: players.map(player => player._id),
        name: host_player.handle + "'s Game",
        cardPacks: chance.pickset(cardPacks, chance.integer(range)),
        playerStates: playerStates,
        cardsInPlay: { white: [], black: null },
        currentTurn: null,
        rounds: 0
      })
      .then(async game => {

        for (let pack of game.cardPacks) {
          game.white.push(...pack.white);
          game.black.push(...pack.black);
        }
        game.white = chance.shuffle(game.white);
        game.black = chance.shuffle(game.black);
        game.playerStates = chance.shuffle(game.playerStates);

        // Lets add some cards to the game_state.playerStates!
        game.playerStates = game.playerStates.map(playerState => {

          playerState.white = game.white.splice(0, 10);

          let numRoundsWon = chance.integer({ min: 0, max: 7 });
          playerState.score = numRoundsWon;
          playerState.black = game.black.splice(0, numRoundsWon);

          return playerState;
        })

        // Now lets fill up the cards in play...
        // First the white cards... we'll take from the player states' cards
        const numCardsInPlay = chance.integer({min: 2, max: game.players.length - 1}) // Exclude whoever is current player...
        game.cardsInPlay.white = Array.from(
          { length: numCardsInPlay },
          (_, idx) => {
            let card = game.playerStates[idx].white.pop();
            let playerId = game.playerStates[idx]['playerId'];
            return { playerId: playerId, card: card };
          }
        )
 
        // Now lets get a random black card to be the one in play, also assign a person to currentTurn
        game.cardsInPlay.black = game.black.pop();
        game.currentTurn = game.playerStates[numCardsInPlay]['playerId'];

        // Lastly, lets look at the total number of rounds played, and discard the appropriate number of cards
        game.rounds = game.playerStates
          .map(playerState => playerState.score)
          .reduce((score, cur) => score + cur);


        // We are just going to assume all players present for every round and no special draw x play y black cards
        let totalCardsDiscarded = game.rounds * (game.players.length - 1);
        game.discardedWhite = game.white.splice(0, totalCardsDiscarded);

        await game.save();

        console.log(`Added Game - Host : ${host_player.handle}, Players: ${game.players.length}`);
        for (let player of players) {
          player.games.push(game._id);
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