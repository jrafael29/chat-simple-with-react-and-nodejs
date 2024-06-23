import { FormEvent, useState } from 'react';
import { socket } from '../socket';

type RoomChatFormProps = {
  room: string
}
export function RoomChatForm({room}: RoomChatFormProps) {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTimeout(() => {
      setIsLoading(false);
      setMessage("");
    },1000)
    setIsLoading(true);

    socket.timeout(1000).emit('room-message', room, message);
  }

  return (
    <form className='p-5' onSubmit={ onSubmit }>
      {
        room !== "" && (
          <>
            <label htmlFor=""><small>Envie uma mensagem para o chat {room}</small></label>
            <textarea rows={3} className='form-control' disabled={ isLoading } placeholder={`Digite sua mensagem`} value={message} onChange={ e => setMessage(e.target.value) } />
            <button className='w-100 btn btn-outline-dark' type="submit" disabled={ isLoading }>Enviar mensagem!</button>
          </>
        )
      }

    </form>
  );
}