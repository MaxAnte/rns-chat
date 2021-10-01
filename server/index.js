import { createServer } from "http";
import { Server } from "socket.io";
import registerMessageHandlers from "./handlers/messageHandlers.js";
import registerUserHandlers from "./handlers/userHandlers.js";

const server = createServer();
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const log = console.log;

// const registerMessageHandlers = require("./handlers/messageHandlers");
// const registerUserHandlers = require("./handlers/userHandlers");

const onConnection = (socket) => {
  log("User connected");
  const { roomId } = socket.handshake.query;
  socket.roomId = roomId;
  socket.join(roomId);

  registerMessageHandlers(io, socket);
  registerUserHandlers(io, socket);

  socket.on("disconnect", () => {
    log("User disconnected");
    socket.leave(roomId);
  });
};

io.on("connection", onConnection);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  log(`Server ready. Port: ${PORT}`);
});
