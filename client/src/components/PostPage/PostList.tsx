import { useContext } from "react"
import { PostContext } from "../../contexts/PostContext"


export default function PostList() {

  const postCtx = useContext(PostContext)

  const handleLikePost = (id: number) => {
    postCtx?.likePost({id});
  }
  const handleRemovePost = (id:number) => {
    postCtx?.removePost({id});
  }
  return (
    <>
      <h1>Lista de posts</h1>
      <div className="d-flex gap-5">
        {postCtx?.posts.map(post => (
          <div key={post.id} className="card">
            <div className="card-header">
              <h1>{post.title}</h1>
            </div>
            <div className="card-body">
              <p>{post.body}</p>
            </div>
            <div className="card-footer">
              <div>
              <p>{post.likes} curtida{post.likes > 1 ? "s" : ""}</p>
              </div>
              <div className="d-flex gap-5">
              <button onClick={() => handleLikePost(post.id)} className="btn btn-sm btn-info rounded">Curtir</button>
              <button onClick={() => handleRemovePost(post.id)} className="btn btn-sm btn-danger rounded">Excluir</button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}