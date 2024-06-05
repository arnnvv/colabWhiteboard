import http from "http";
import express from "express";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const port: number = 8080;

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on(
    "draw-line",
    ({ previousPoint, currentPoint, color }: DrawLineProps): void => {
      socket.broadcast.emit("draw-line", {
        previousPoint,
        currentPoint,
        color,
      });
    },
  );

  socket.on("clear", (): boolean => io.emit("clear"));
});

server.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
