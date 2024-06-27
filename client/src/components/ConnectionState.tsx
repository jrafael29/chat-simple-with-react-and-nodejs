import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

export function ConnectionState() {
  const appCtx = useContext(AppContext);

  return (
    <p className="mt-5">Estado da conexão: 
      {appCtx?.isConnected && (<> <span className="badge rounded-pill text-bg-success">Conectado</span> </>)}
      {!appCtx?.isConnected && (<> <span className="badge rounded-pill text-bg-warning">Desconectado</span> </>)}
    </p>
  );
}