const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardPackSchema = new Schema({
  
  url_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Schema.Types.Mixed,
    default: {
      black: 0, white: 0, total: 0
    },
    required: true
  },
  white: [{
    type: Schema.Types.ObjectId,
    ref: 'Card',
  }],
  black: [{
    type: Schema.Types.ObjectId,
    ref: 'Card',
  }],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = CardPack = mongoose.model("CardPack", CardPackSchema);