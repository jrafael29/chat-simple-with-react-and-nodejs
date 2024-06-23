import inMemoryPersonRepository from "../repository/InMemoryPersonRepository.js";
import inMemoryRoomRepository from "../repository/InMemoryRoomRepository.js";


export const onConnect = (io, socket) => {
  inMemoryPersonRepository.add({
    id: socket.id
  })
  setTimeout(() => {
    const persons = inMemoryPersonRepository.getAll();
    io.emit("all-users", persons);
  }, 0)
}

export const onRoomJoin = (io, socket, room) => {
  if(!room) return false;
  socket.join(room);
  const roomObj = inMemoryRoomRepository.getRoom(room);
  if(roomObj){
    socket.emit("room-messages", roomObj.messages);
  }
}
export const onRoomLeft = (io, socket, room) => {
  if(!room) return false;
  socket.leave(room);
}
export const onDisconnect = (io, socket) => {
  inMemoryPersonRepository.remove(socket.id);
  io.emit("all-users", inMemoryPersonRepository.getAll());
  console.log("socket has disconnected", socket.id);
}
export const onRoomMessage = (io, socket, room, message) => {
  if(!room || !message) return false;
  inMemoryRoomRepository.addRoomMessage(room, message, socket.id)
  const roomObj = inMemoryRoomRepository.getRoom(room);
  io.to(room).emit("room-messages", roomObj.messages);
}