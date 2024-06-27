import { useContext, useState } from "react"
import { PostContext } from "../../contexts/PostContext";



export default function PostForm(){

  const postCtx = useContext(PostContext);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleAddBtn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if(title && body){
      postCtx?.addPost({
        title,
        body
      });
  
      setTitle("")
      setBody("")
    }


  }

  return (
    <>
      <h1>Cadastre um novo post</h1>
      <form action="">
        <div className="mb-3">
          <label className="form-label" htmlFor="">Titulo</label>
          <input 
            className="form-control" 
            value={title}
            onChange={e => setTitle(e.target.value)}
            type="text" 
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="">Conteudo</label>
          <input 
            className="form-control" 
            value={body}
            onChange={e => setBody(e.target.value)}
            type="text" 
          />
        </div>
        <div className="mb-3">
          <button onClick={handleAddBtn} className="btn btn-success w-100">Salvar post</button>
        </div>
      </form>
    </>
  )
}