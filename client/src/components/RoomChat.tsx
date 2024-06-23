import { useEffect, useRef, useState } from "react"
import { socket } from "../socket"

type Message = {id: string, message: string, from: string}
type RoomChatProps = {
  room: string
  selfId: string,
}
export default function RoomChat({room, selfId}: RoomChatProps){

  const [messages, setMessages] = useState<Message[]>([])
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMessages([]);
  }, [room])

  useEffect(() => {
    socket.on("room-messages", (messages: Message[]) => {
      setMessages(messages);
    })
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
  }, [messages])


  // const selfId = "RYn3ZutYdvY8McEaAAAt"
  // const messages: Message[] = [
  //   {id: '1', message: "Olá tudo bem?", from: "L5PJ7kwEOvXYNlaYAAAv"},
  //   {id: '2', message: "To bem e você", from: "RYn3ZutYdvY8McEaAAAt"}
  // ]

  const messageFromMe = (message: Message) => {
    return (
      <div key={message.id} className="d-flex justify-content-end m-1">
        <div className="">
          <div className="bg-info rounded p-2">
            <p>{message.message}</p>
            <small>enviado por você</small>
          </div>
        </div>
      </div>
    )
  }

  const messageFromOther = (message: Message) => {
    return (
      <div key={message.id} className="d-flex justify-content-start m-1">
        <div className="bg-danger rounded p-2">
          <p>{message.message}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {
        room !== "" && (
          <div className="w-100">
            <div>
              <h3>Chat da sala {room}</h3>
            </div>
            <div style={{maxHeight: "250px", overflowY: "scroll"}} className="bg-dark text-white border p-5 d-flex flex-column">
            {messages.map(message => (
              <div key={message.id}>
                {
                  message.from === selfId && (messageFromMe(message))
                }
                {
                  message.from !== selfId && (messageFromOther(message))
                }
              </div>
            ))}
            {messages.length === 0 && <>
            <div className="d-flex justify-content-center">
              <small>Nenhuma mensagem...</small>
            </div>
            </>}
            <div ref={messagesEndRef} />    
            </div>
          </div>
        )
      }
      
    </>
  )
}