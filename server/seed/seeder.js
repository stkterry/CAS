const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Chance = require("chance");
chance = new Chance();

const { STATIC_USERS } = require("./static_seeds");
const User = require("../models/User");
const Game = require("../models/Game");
require("../models/model_index");
const db = require("../config/keys").mongoURI;

const dropDB = async (db) => {
  await db.connection.dropDatabase();
  console.log("Dropping database")
}

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
    const { host, players } = data;
    const rules = data.rules ? data.rules : [];
    
    const game = new Game({
      host: host,
      players: players,
      rules: rules
    },
    err => {if (err) throw err});
    await game.save();
    return game;

  } catch (err) { throw err }
}

const seedUsers = async (amount) => {
  let tuser;
  for (let user of STATIC_USERS) {
    tuser = await registerUser(user)
      .catch(err => `Couldn't add user because ${err}`);
    console.log(`Successfully added user ${tuser._id}`);
  }

  for (let i = 0; i < amount; i++) {
    tuser = await registerUser({
      handle: chance.first() + " " + chance.last(),
      email: chance.email(),
      password: "password"
    })
    .catch(err => `Couldn't add user because ${err}`);
    console.log(`Added user ${tuser._id}`);
  }

  console.log(`Added ${STATIC_USERS.length} static and ${amount} random users`);
};

const seedGames = async (amount) => {
  const users = await User.find();

  let host_player, numPlayers, players, player_ids, tempPlayer, game;
  for (let i = 0; i < amount; i++) {
    host_player = chance.pickone(users);
    players = [host_player];
    player_ids = [host_player._id];

    numPlayers = chance.integer({min: 2, max: 7}); // Range excludes host_player
    while (players.length < numPlayers) {
      tempPlayer = chance.pickone(users);
      if (tempPlayer._id !== player_ids[0]) {
        players.push(tempPlayer);
        player_ids.push(tempPlayer._id);
      }
    }

    game = await registerGame({ 
      host: host_player, 
      players: player_ids 
    })
    .then(game => `Added game ${game._id}`)
    .catch(err => `Couldn't add game because ${err}`);

    // If the game was successfully added, update players
    if (game) {
      for (let player of players) {

      }
    }



  
  }
}