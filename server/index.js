import http from 'http';
import {Server} from 'socket.io';
import { 
  onConnect, 
  onDisconnect, 
  onRoomJoin, 
  onRoomLeft, 
  onRoomMessage 
} from './src/events/roomEvents.js';

const server = http.createServer();
const io =  new Server(server, {
  cors: {
    origin: "http://localhost:5173"
  }
});

io.on("connection", (socket) => {
  onConnect(io, socket);

  socket.on('join-room', (room) => onRoomJoin(io, socket, room));
  socket.on("left-room", (room) => onRoomLeft(io, socket, room));
  socket.on("room-message", (room, message) => onRoomMessage(io, socket, room, message));
  socket.on("disconnect", () => onDisconnect(io, socket));
})


server.listen(3000);