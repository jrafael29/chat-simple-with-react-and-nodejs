import { useContext } from "react"
import { rooms } from "../rooms"
import { socket } from "../socket"
import { Room } from "../types/Room"
import { AppContext } from "../contexts/AppContext"


export default function Rooms() {
  const appCtx = useContext(AppContext);
  const joinRoom = (room: string) => {
    socket.emit("join-room", room);
    appCtx?.setSelectedRoom(room)
  }
  const leaveRoom = (room: string) => {
    socket.emit("left-room", room);
    appCtx?.setSelectedRoom("")
  }

  return (
    <>
      <div className="d-flex gap-5 my-3">
        {rooms.map((room: Room) => (
          <div key={room.id}>
            {
              room.id === appCtx?.selectedRoom && (
                <>
                  <div className="card" >
                    <div className="card-body">
                      <h5 className="card-title">[Entrou] {room.name}</h5>
                      <button className="btn btn-warning" onClick={e => leaveRoom(room.id)}>Sair da Sala {appCtx?.selectedRoom}</button>
                    </div>
                  </div>
                </>
              )
            }
            {
              room.id !== appCtx?.selectedRoom && (
                <>
                  <div className="card" >
                    <div className="card-body">
                      <h5 className="card-title">{room.name}</h5>
                      <button className="btn btn-success" onClick={e => joinRoom(room.id)}>Entrar na {room.name}</button>
                    </div>
                  </div>
                </>
              )
            }
          </div>
          ))}
      </div>
    </>
  );
}