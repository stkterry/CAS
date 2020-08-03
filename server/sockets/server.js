const http = require("http");
const socketIo = require('socket.io');

// const socketIndex = require("./server/routes/sockets/index");
// app.use(socketIndex);

const socketPort = 5002;

module.exports = socketServer = app => {

  const server = http.createServer(app);
  const io = socketIo(server);

  io.on("connection", (socket) => {

    socket.on('join', room => socket.join(room));

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

  });

  server.listen(socketPort, () => console.log(`Socket listening on port ${socketPort}`)); 
}