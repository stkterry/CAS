const passport = require("passport");
const express = require("express");
const router = express.Router();

const CardPack = require("../../models/CardPack");
const { eRes } = require("../../validation/validation-util");

// ERRORS ====================================================================
const ERRORS = {
  noCardPacksFound: { cardPack: "No CardPacks found" },
  noUserCardPacks: { cardPack: "No CardPacks found from that user" },
  noIDCardPacks: { cardPack: "No CardPacks found with that ID" }
};

// TEST
router.get("/test", (req, res) => res.json({msg: "This is the CardPack route! "}));

// GET =======================================================================

// /
router.get("/", (req, res) => {
  CardPack.find()
    .then(cardPacks => res.json(cardPacks))
    .catch(err => eRes(res, 404, ERRORS.noCardPacksFound))
});

// /popall
router.get("/popall", (req, res) => {
  CardPack.find()
    .populate('white black')
    .then(cardPacks => res.json(cardPacks))
    .catch(err => eRes(res, 404, ERRORS.noCardPacksFound))
});

// popone/:id
router.get("/popone/:_id", (req, res) => {
  CardPack.findById(req.params._id)
    .populate('white black')
    .then(cardPack => res.json(cardPack))
    .catch(err => eRes(res, 404, ERRORS.noIDCardPacks))
});

// /:_id
router.get("/:_id", (req, res) => {
  CardPack.findById(req.params._id)
    .then(cardPack => res.json(cardPack))
    .catch(err => eRes(res, 404, ERRORS.noIDCardPacks));
})

module.exports = router;