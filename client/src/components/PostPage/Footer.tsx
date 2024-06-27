import { useContext } from "react"
import { PostContext } from "../../contexts/PostContext"


export default function Footer(){
  const postCtx = useContext(PostContext);
  return (
    <>
      <h3>{postCtx?.posts.length} posts cadastrados</h3>
    </>
  )
}