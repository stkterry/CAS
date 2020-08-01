const http = require("http");
const socketIo = require('socket.io');

// const socketIndex = require("./server/routes/sockets/index");
// app.use(socketIndex);

const socketPort = 5002;

module.exports = socketServer = app => {

  const server = http.createServer(app);
  const io = socketIo(server);

  io.on("connection", (socket) => {
    // console.log("New client picked up");

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });

    socket.on("game_message", msg => {
      console.log(msg);
    })

    socket.on("sendMessage", (msg, cb) => {
      Message.addNew(msg)
        .then(() => 
          socket.broadcast.emit("receiveMessage", msg)
        )
      
      cb('received');
    });

  });


  server.listen(socketPort, () => console.log(`Socket listening on port ${socketPort}`)); 
}