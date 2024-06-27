import { ReactNode, createContext, useEffect, useState } from "react"
import { Person } from "../types/Person";


type AppContextProps = {
  children: ReactNode
}

type AppStateType = {
  isConnected: boolean;
  setIsConnected: (i: boolean) => void;
  selectedRoom: string;
  setSelectedRoom: (s: string) => void;
  id: string,
  setId: (i: string) => void;
  persons: Person[]
  setPersons: (p: Person[]) => void;
}
type AppContextType = AppStateType | null;

export const AppContext = createContext<AppContextType>(null)
export const AppProvider = ({children}: AppContextProps) => {

  const [isConnected, setIsConnected] = useState(false);
  const [persons, setPersons] = useState<Person[]>([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [id, setId] = useState("");

  const ctxValue = {
    isConnected,
    setIsConnected,
    selectedRoom,
    setSelectedRoom,
    id,
    setId,
    persons,
    setPersons
  }
  return (
    <>
      <AppContext.Provider value={ctxValue} >
        {children}
      </AppContext.Provider>
    </>
  )
}