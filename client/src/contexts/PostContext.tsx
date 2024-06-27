import { ReactNode, createContext, useReducer } from "react";
import { Post } from "../types/Post";
import { postReducer } from "../reducers/PostReducer";


type AddPostDataType = {title: string, body: string}
type PostContextType = {
  posts: Post[];
  addPost: (data: AddPostDataType) => void;
  likePost: (data: IdPostType) => void;
  removePost: (data: IdPostType) => void;
}
type IdPostType = {
  id: number
}

export const PostContext = createContext<PostContextType | null>(null);
export const  PostProvider = ({children}: {children: ReactNode}) => {

  // const [posts, setPosts] = useState<Post[]>([]);

  const [posts, dispatch] = useReducer(postReducer, []);

  function addPost({title, body}: AddPostDataType){
    // setPosts([...posts, {id: posts.length, title, body, likes: 0}])
    dispatch({
      type: 'add',
      payload: {
        body,
        title,
        likes: 0
      }
    })
  }

  function likePost({id}: IdPostType) {
    dispatch({
      type: 'like',
      payload: {
        id
      }
    })
  }

  function removePost({id}: IdPostType){
    dispatch({
      type: 'remove',
      payload: {
        id
      }
    })
    // setPosts(posts.filter(post => post.id !== id));
  }

  return (
    <PostContext.Provider value={{posts, addPost, likePost, removePost}} >
      {children}
    </PostContext.Provider>
  )
}