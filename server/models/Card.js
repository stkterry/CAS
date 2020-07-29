const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema({

  color: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true,
  },
  pick: {
    type: Number
  },
  draw: {
    type: Number
  },
  cardPack: {
    type: Schema.Types.ObjectId,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});


module.exports = Card = mongoose.model("Card", CardSchema);