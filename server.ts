import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

import { Server } from "socket.io";
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on(
    "draw-line",
    ({ prevPoint, currentPoint, color }: DrawLineProps) => {
      socket.broadcast.emit("draw-line", { prevPoint, currentPoint, color });
    },
  );
});
