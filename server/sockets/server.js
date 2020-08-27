const http = require("http");
const socketIo = require('socket.io');
const Game = require("../models/Game");

// const socketIndex = require("./server/routes/sockets/index");
// app.use(socketIndex);

const socketPort = 5002;

module.exports = socketServer = app => {

  const server = http.createServer(app);
  const io = socketIo(server);

  io.on("connection", (socket) => {
    console.log('Client connected');
    socket.on('join', room => {
      socket.join(room);
      console.log(`Connected client to room : ${room}`);
    })

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });

    socket.on("sendMessage", ({message, room}, cb) => {
      Message.addNew(message)
        .then(() => 
          socket.to(room).emit("receiveMessage", message)
        )
      
      cb('received');
    });

    socket.on("addToCardsInPlay", ({card, room, userId}, cb) => {
      const newCardDat = {
        playerId: userId,
        card: card._id
      }
      Game.updateCardsInPlay(room, newCardDat)
      socket.to(room).emit("receiveCardInPlay", { playerId: userId, card: card })
    })
  });

  server.listen(socketPort, () => console.log(`Socket listening on port ${socketPort}`)); 
}