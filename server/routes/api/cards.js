const passport = require("passport");
const express = require("express");
const router = express.Router();

const Card = require("../../models/Card");
const CardPack = require("../../models/CardPack");
const { eRes } = require("../../validation/validation-util");


const ERRORS = {

};

// TEST
router.get("/test", (req, res) => res.json({ msg: "This is the Card route!" }));

// GET =======================================================================

// /
router.get("/", (req, res) => {
  Card.find()
    .then(cards => res.json(cards))
    .catch(err => console.log(err))
});

// /:_id
router.get("/:_id", (req, res) => {
  Card.findById(req.params._id)
    .then(card => res.json(card))
    .catch(err => eRes(res, 404, ERRORS.noIDCard))
});

// /pack/:pack_id
router.get("/pack/:pack_id", (req, res) => {
  CardPack.findById(req.params.pack_id, 'white black')
    .populate('white black')
    .then(cards => res.json(cards))
    .catch(err => console.log(err));
})

module.exports = router;