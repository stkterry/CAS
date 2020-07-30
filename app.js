const express = require("express");
const http = require("http");
const socketIo = require('socket.io');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

const app = express();
const db = require("./server/config/keys").mongoURI;
console.log(db);
const port = process.env.PORT || 5001;
const socketPort = 5002;
const users = require("./server/routes/api/users");
const games = require("./server/routes/api/games");
const cardPacks = require("./server/routes/api/cardPacks");
const cards = require("./server/routes/api/cards");
const messages = require("./server/routes/api/messages");

// Sockets ===============================================
const socketIndex = require("./server/routes/sockets/index");
const server = http.createServer(app);
const io = socketIo(server);

app.use(socketIndex);

let interval;

io.on("connection", socket => {
  console.log("New client picked up");
  if (interval) clearInterval(interval);
  interval = setInterval(() => getApiAndEmit(socket), 1000);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = socket => {
  const response = new Date();
  socket.emit("FromAPI", response);
}

//------------------------------------------------------------

// Database ===============================================
mongoose
  .set('debug', true)
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
server.listen(socketPort, () => console.log(`Socket listening on port ${socketPort}`));
app.listen(port, () => console.log(`Server is running on port ${port}`));
//------------------------------------------------------------
