const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const colors = require("colors");

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

// App =======================================================================
const app = express();
const port = process.env.PORT || 5001;
//------------------------------------------------------------



// Sockets ===============================================
require("./server/sockets/server")(app);
//------------------------------------------------------------

// Database ===============================================
const db = require("./server/config/keys").mongoURI;
const users = require("./server/routes/api/users");
const games = require("./server/routes/api/games");
const cardPacks = require("./server/routes/api/cardPacks");
const cards = require("./server/routes/api/cards");
const messages = require("./server/routes/api/messages");

mongoose
  .set('debug', function (collectionName, method, query, doc) {
    console.log(
      'Mongoose: '.cyan +
      collectionName.blue +
      '.' +
      method.green +
      ' (' +
      JSON.stringify(query, null, 2) + ')');
  })
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

mongoose.Promise = global.Promise;

app.use(passport.initialize());
require('./server/config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// API routes
app.use("/api/users", users);
app.use("/api/games", games);
app.use("/api/cardPacks", cardPacks);
app.use("/api/cards", cards);
app.use("/api/messages", messages);
//------------------------------------------------------------


// Listeners =================================================================
app.listen(port, () => console.log(`Server is running on port ${port}`));
//------------------------------------------------------------
