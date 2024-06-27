import { FormEvent, useContext, useState } from 'react';
import { socket } from '../socket';
import { AppContext } from '../contexts/AppContext';


export function RoomChatForm() {

  const appCtx = useContext(AppContext);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTimeout(() => {
      setIsLoading(false);
      setMessage("");
    },1000)
    setIsLoading(true);

    socket.timeout(1000).emit('room-message', appCtx?.selectedRoom, message);
  }

  return (
    <form className='p-5' onSubmit={ onSubmit }>
      {
        appCtx?.selectedRoom !== "" && (
          <>
            <label htmlFor=""><small>Envie uma mensagem para o chat {appCtx?.selectedRoom}</small></label>
            <textarea rows={3} className='form-control' disabled={ isLoading } placeholder={`Digite sua mensagem`} value={message} onChange={ e => setMessage(e.target.value) } />
            <button className='w-100 btn btn-outline-dark' type="submit" disabled={ isLoading }>Enviar mensagem!</button>
          </>
        )
      }

    </form>
  );
}