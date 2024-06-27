import { useContext, useEffect } from "react";
import { AppContext } from "../contexts/AppContext"
import { ConnectionState } from "../components/ConnectionState";
import { ConnectionManager } from "../components/ConnectionManager";
import { Connections } from "../components/Connections";
import RoomChat from "../components/RoomChat";
import { RoomChatForm } from "../components/RoomChatForm";
import Rooms from "../components/Rooms";
import { socket } from "../socket";
import { Person } from "../types/Person";

export default function HomePage() {

  const appCtx = useContext(AppContext)

  useEffect(() => {
    socket.emit('join-room', appCtx?.selectedRoom)
  }, [appCtx?.selectedRoom])

  useEffect(() => {
    appCtx?.setSelectedRoom("");
  }, [appCtx?.isConnected])


  useEffect(() => {
    function onConnect() {
      appCtx?.setIsConnected(true);
      appCtx?.setId(socket.id ?? '');
    }

    function onDisconnect() {
      appCtx?.setIsConnected(false);
    }

    function onAllUserEvent(value: Person[]) {
      appCtx?.setPersons(value);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('all-users', onAllUserEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('all-users', onAllUserEvent);
    };
  }, []);

  return (
    <>
    <div className="App container">
      <div className='d-flex'>

        <div className='col-sm-6'>
          <ConnectionState />
          <ConnectionManager />
        </div>
        { appCtx?.isConnected && (
            <>
              <div className='col-sm-6'>
              <Connections />
              </div>
          </>
        )}
      </div>
      <div>
      { appCtx?.isConnected && (
        <>
          <div className='d-flex flex-wrap'>
            <div className='col-12 col-sm-6'>
              <RoomChat />
            </div>
            <div className='col-12 col-sm-6'>
              <RoomChatForm />
            </div>
          </div>
          <div>
            <h1 className='text-center'>Salas</h1>
            <div className='d-flex justify-content-center'>
              <Rooms />
            </div>
          </div>
        </>
      )}
      </div>
    </div>

    </>
  )
}