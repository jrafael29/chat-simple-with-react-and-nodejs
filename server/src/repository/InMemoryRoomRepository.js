import crypto from 'crypto';

export default new (class InMemoryRoomRepository {
  rooms = []
  id = 0;

  add(room){
    this.rooms.push({
      ...room
    });
    return true;
  }

  getRoom(room){
    const roomObj = this.rooms.find(roomO => roomO.id === room)
    return roomObj; 
  }

  addRoomMessage(roomId, message, from) {
    const roomIndex = this.rooms.findIndex(room => room.id === roomId);
  
    if (roomIndex !== -1) {
      // se a sala existir, atualiza as mensagens
      let updatedRoom = {
        ...this.rooms[roomIndex],
        messages: [
          ...this.rooms[roomIndex].messages,
          {id: crypto.randomUUID(), message, from}
        ]
      };
      this.rooms = [ 
        ...this.rooms.slice(0, roomIndex),
        updatedRoom,
        ...this.rooms.slice(roomIndex + 1)
      ];
    } else {
      // se a sala não existir, adiciona uma nova sala
      const newRoom = {
        id: roomId,
        messages: [{id: crypto.randomUUID(), message, from}]
      };
      this.rooms = [...this.rooms, newRoom];
    }
  
    return true;
  }
  


})()