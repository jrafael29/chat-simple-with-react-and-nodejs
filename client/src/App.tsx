import { useState, useEffect } from 'react';
import { socket } from './socket';
import { ConnectionState } from './components/ConnectionState';
import { ConnectionManager } from './components/ConnectionManager';
import { RoomChatForm } from './components/RoomChatForm';
import "./App.css"
import Rooms from './components/Rooms';
import RoomChat from './components/RoomChat';
import { Connections } from './components/Connections';
import { Person } from './types/Person';

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [persons, setPersons] = useState<Person[]>([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selfId, setSelfId] = useState("");

  useEffect(() => {
    socket.emit('join-room', selectedRoom)
  }, [selectedRoom])

  useEffect(() => {
    setSelectedRoom("");
  }, [isConnected])


  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      setSelfId(socket.id ?? '');
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onAllUserEvent(value: Person[]) {
      setPersons(value);
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
    <div className='bg-dark-subtle'>
      <div className="App container">
        <div className='d-flex'>

          <div className='col-sm-6'>
            <ConnectionState isConnected={ isConnected } />
            <ConnectionManager isConnected={ isConnected } setIsConnected={ setIsConnected } />
          </div>
          { isConnected && (
              <>
                <div className='col-sm-6'>
                <Connections persons={persons} />
                </div>
            </>
          )}
        </div>
        <div>
        { isConnected && (
          <>
            <div className='d-flex flex-wrap'>
              <div className='col-12 col-sm-6'>
                <RoomChat selfId={selfId} room={selectedRoom} />
              </div>
              <div className='col-12 col-sm-6'>
                <RoomChatForm room={selectedRoom} />
              </div>
            </div>
            <div>
              <h1 className='text-center'>Salas</h1>
              <div className='d-flex justify-content-center'>
                <Rooms selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} />
              </div>
            </div>
          </>
        )}
        </div>
      </div>
    </div>
  );
}