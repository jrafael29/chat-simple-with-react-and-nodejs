import { useContext } from 'react';
import { socket } from '../socket';
import { AppContext } from '../contexts/AppContext';

export function ConnectionManager() {

  const appCtx = useContext(AppContext);

  function toggle(){
    if(appCtx?.isConnected){
      socket.disconnect();
    }else{
      socket.connect();
    }
    console.log("opa", appCtx)

  }

  return (
    <>
      <div className=''>
      <button onClick={toggle} type="button" className={ (!appCtx?.isConnected ? "btn-outline-success " : "btn-outline-warning ") + " btn position-relative text-black"}>
        {appCtx?.isConnected ? "Desconectar" : "Conectar"}
      </button>
      </div>
    </>
  );
}