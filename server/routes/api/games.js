const passport = require("passport");
const express = require("express");
const router = express.Router();

const Game = require("../../models/Game");
const { eRes } = require("../../validation/validation-util");

// ERRORS ====================================================================
const ERRORS = {
  noGamesFound: { game: "No games found" },
  noUserGames: { game: "No games found from that user"},
  noIDGames: { game: "No games found with that ID" },
  noPlayerState: { game: "No player state found for that user"}
};

// Game Creation =============================================================

const gameObj = req => ({
  host: req.body.id,
  rules: req.body.rules ? req.body.rules : [],
  name: req.body.name
});

// TEST
router.get("/test", (req, res) => res.json({ msg: "This is the games route!" }));

// GET =======================================================================

// /
router.get("/", (req, res) => {
  Game.getAll()
    .then(games => res.json(games))
    .catch(err => console.log(err))
})

// /user/:user_id
router.get("/user/:user_id", (req, res) => {
  Game.getUserGames(req.params.user_id)
    .then(games => res.json(games))
    .catch(err => eRes(res, 404, ERRORS.noUserGames))
})

// /:id
router.get("/:game_id", (req, res) => {
  Game.getGame(req.params.game_id)
    .then(game => res.json(game))
    .catch(err => eRes(res, 404, ERRORS.noIDgames))
})

// /active/:game_id
router.get("/active/:game_id/:user_id", (req, res) => {
    Game.getActive(req.params.game_id, req.params.user_id)
    .then(game => res.json(game))
    .catch(err => eRes(res, 404, ERRORS.noIDgames))
})

// /getPlayerState/:game_id/:user_id
router.get("/playerState/:game_id/:user_id", (req, res) => {
  const {game_id, user_id} = req.params;

  Game.getPlayerState(game_id, user_id, res)
    .then(playerState => res.json(playerState))
    .catch(err => console.log(err))
    // .catch(err => eRes(res, 404, ERRORS.noPlayerState))
    
})

// Games POST ================================================================

// /
router.post("/", passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // const { errors, isValid } = validateGameInput(req.body);
    // if (!isValid) eRes(res, 400, errors);

    const newGame = new Game(gameObj(req));
    newGame.save()
      .then(game => res.json(game));
  }
)

// drop messages from game
// drop all messages in a game!!!
router.post("/dropmessages/:game_id", passport.authenticate("jwt", { session: false }),
  (req, res) => Game.dropMessages(req.params.game_id)
    .then(dat => res.json(dat))
    .catch(err => console.log(err))
)


module.exports = router;






