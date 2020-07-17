const mongoose = require("mongoose");
const fetch = require("node-fetch");
const db = require("../config/keys").mongoURI;

const Card = require("../models/Card");
const CardPack = require("../models/CardPack");

// registerCard ==============================================================
const registerWhiteCard = async data => {
  try {
    const card = new Card(
      {
        color: 'white',
        content: data,
      },
      err => { if (err) throw err }
    );

    await card.save();
    return card;
  } catch (err) { throw err }
}

const registerBlackCard = async data => {
  try {
    let { content, draw, pick } = data;
    const card = new Card(
      {
        color: 'black',
        content: content,
        draw: draw,
        pick: pick
      },
      err => { if (err) throw err }
    );

    await card.save();
    return card;
  } catch (err) { throw err }
}

const registerCardPack = async data => {
  try {
    const { id, name, quantity } = data;

    const cardPack = new CardPack(
      {
        url_id: id,
        name: name,
        quantity: quantity
      },
      err => { if (err) throw err }
    );

    await cardPack.save();
    return cardPack;
  } catch (err) { throw err }
}

const fetchPacks = () => {
  return fetch("https://cah.greencoaststudios.com/api/v1/official/packs")
    .then(res => res.json())
    .then(async packDat => {
      //Here we go through each pack and fetch the cards data...
      for (let pack of packDat.packs) {
        await registerCardPack(pack)
          .then(card => console.log(`Added ${card.name}`))
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
}

const fetchCardsAndUpdatePacks = async () => {
  let cardPacks = await CardPack.find();
    
    for (let cardPack of cardPacks) {
      await fetch(`https://cah.greencoaststudios.com/api/v1/official/${cardPack.url_id}`)
        .then(res => res.json())
        .then(async pack => {
          // Get white cards???
          let whiteCards = [];
          let blackCards = [];
          for (let whiteCard of pack.white) {
            await registerWhiteCard(whiteCard)
              .then(card => { whiteCards.push(card._id) });
          }

          // Get black cards???
          for (let blackCard of pack.black) {
            await registerBlackCard(blackCard)
              .then(card => blackCards.push(card._id));
          }

          cardPack.white = whiteCards;
          cardPack.black = blackCards;
          await cardPack.save()
            .then(cardPack => {
              const white = cardPack.white.length;
              const black = cardPack.black.length;
              const total = white + black;
              const q = cardPack.quantity;
              console.log(`${cardPack.name}: ${white}/${q.white}w : ${black}/${q.black}b : ${total}/${q.total}T`)
            });
        })
        .catch(err => console.log(err));
    }
}

const seedCards = () =>
  mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async db => {
      console.log("Clearing collections...")
      await CardPack.deleteMany({})
        .then(() => console.log("Cleared CardPacks..."))
        .catch(err => console.log(err));
      await Card.deleteMany({})
        .then(() => console.log("Cleared Cards..."))
        .catch(err => console.log(err));
      await fetchPacks()
        .catch(err => console.log(err));
      await fetchCardsAndUpdatePacks()
        .catch(err => console.log(err));

      console.log("Done. Closing connection...");
      db.connection.close();
      console.log("Connection closed");
    });

module.exports = {
  seedCards
}