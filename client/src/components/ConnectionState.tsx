type ConnectionStateProps = {
  isConnected: boolean
}
export function ConnectionState({ isConnected }: ConnectionStateProps) {
  
  return <p className="mt-5">Estado da conexão: 
    {isConnected && (<> <span className="badge rounded-pill text-bg-success">Conectado</span> </>)}
    {!isConnected && (<> <span className="badge rounded-pill text-bg-warning">Desconectado</span> </>)}
  </p>;
}