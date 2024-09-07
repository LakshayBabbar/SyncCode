import express from "express";
import http from "http";
import { Server } from "socket.io";
import router from "./routes/index.js";
import bodyParser from "body-parser";

const app = express();
app.use(router);
app.use(bodyParser.json());
const server = http.createServer(app);
const io = new Server(server);

const userSocketMap = {};
const getAllConnectedClients = (roomId) => {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      };
    }
  );
};

io.on("connection", (socket) => {
  // console.log('Socket connected', socket.id);
  socket.on("join", ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);
    const clients = getAllConnectedClients(roomId);
    // notify that new user join
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit("joined", {
        clients,
        username,
        socketId: socket.id,
      });
    });
  });

  // sync the code
  socket.on("code_change", ({ roomId, code }) => {
    socket.in(roomId).emit("code_change", { code });
  });
  // when new user join the room all the code which are there are also shows on that persons editor
  socket.on("sync_code", ({ socketId, code }) => {
    io.to(socketId).emit("code_change", { code });
  });

  // leave room
  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    // leave all the room
    rooms.forEach((roomId) => {
      socket.in(roomId).emit("disconnected", {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });

    delete userSocketMap[socket.id];
    socket.leave();
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is listen on port: ${PORT}`);
});
