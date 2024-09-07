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

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is listen on port: ${PORT}`);
});
