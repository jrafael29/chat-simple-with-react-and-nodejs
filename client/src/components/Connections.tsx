import { useContext } from "react"
import { AppContext } from "../contexts/AppContext"

export function Connections() {

  const appCtx = useContext(AppContext);

  return (
    <div>
      <h1>Conexões</h1>
      {appCtx?.persons && appCtx?.persons.length > 0 && (
          <ul className="list-group">
            {appCtx?.persons.map((person: {id: string}) => (
              <li key={person.id} className="list-group-item">{person.id}</li>
            ))}
          </ul>
        )
      }
    </div>
  )
}