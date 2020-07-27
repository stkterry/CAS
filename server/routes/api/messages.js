const passport = require("passport");
const express = require('express');
const router = express.Router();


const Message = require("../../models/Message");
const { eRes } = require("../../validation/validation-util");
const validateMessageInput = require("../../validation/message");


const ERRORS = {

}


const messageObj = req => ({
  user_id: req.body.user_id,
  game_id: req.body.game_id,
  content: req.body.content
});

// TEST
router.get("/test", (req, res) => res.json({ msg: "This is the messages route!" }));


// GET =======================================================================
router.get("/", (req, res) => {
  Message.getAll()
    .then(messages => res.json(messages))
    .catch(err => console.log(err));
})


//************************************************ */
// These are the same.  Still working on which is technically better...
// /game/:game_id - Get all messages for a game
router.get("/game/:game_id", (req, res) => {
  Message.getGameMessages(req.params.game_id)
    .then(messages => res.json(messages))
    .catch(err => console.log(err));
})
// /game/game_id/:game_id Get all messages for a game
router.get("/game_id/:game_id", (req, res) => {
  Message.getMessagesByGameId(req.params.game_id)
    .then(messages => res.json(messages))
    .catch(err => console.log(err));
})
//************************************************ */

// Get single message
router.get("/:_id", (req, res) => {
  Message.getOne(req.params._id)
    .then(message => res.json(message))
    .catch(err => console.log(err));
})

// POST ======================================================================

router.post("/", passport.authenticate("jwt", { session: false }),
  (req, res) => {

    const { errors, isValid } = validateMessageInput(req.body);
    if (!isValid) eRes(res, 400, errors);

    Message.addNew(req.body)
      .then(message => res.json(message))
      .catch(err => console.log(err));
})



module.exports = router;