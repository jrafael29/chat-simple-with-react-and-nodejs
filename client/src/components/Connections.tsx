import { Person } from "../types/Person"

type ConnectionsProps = {
  persons: Person[]
}

export function Connections({persons}: ConnectionsProps) {
  return (
    <div>
      <h1>Conexões</h1>
      {persons.length > 0 && (
          <>
            <ul className="list-group">
              {persons.map((person: {id: string}) => (
                <li key={person.id} className="list-group-item">{person.id}</li>
              ))}
            </ul>
          </>
        )
      }
    </div>
  )
}