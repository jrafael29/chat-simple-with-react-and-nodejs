import { socket } from '../socket';

type ConnectionManagerProps = {
  isConnected: boolean
  setIsConnected: (c: boolean) => void
}
export function ConnectionManager({isConnected, setIsConnected}: ConnectionManagerProps) {

  function toggle(){
    if(isConnected){
      socket.disconnect();
    }else{
      socket.connect();
    }
    setIsConnected(!isConnected)
  }


  return (
    <>
      <div className=''>
      <button onClick={toggle} type="button" className={ (!isConnected ? "btn-outline-success " : "btn-outline-warning ") + " btn position-relative text-black"}>
        {isConnected ? "Desconectar" : "Conectar"}
      </button>
      </div>
    </>
  );
}