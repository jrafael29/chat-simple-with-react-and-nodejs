import { Post } from "../types/Post";


type AddAction = {
  type: "add",
  payload: {
    title: string,
    body: string
    likes: number
  }
}

type RemoveAction = {
  type: "remove",
  payload: {
    id: string | number
  }
}

type LikeAction = {
  type: "like",
  payload: {
    id: string | number
  }
}

type PostReducerActionType = AddAction | RemoveAction | LikeAction;

export const postReducer = (list: Post[], action: PostReducerActionType) => {
  switch(action.type){
    case "add":
      return [...list, {id: Math.floor(1000000 + Math.random() * 9000000), ...action.payload }]

    case "like":
      return list.map(post => {
        if(post.id === action.payload.id) {
          post.likes = post.likes + 1
        }
        return post
      })

    case "remove":
      return list.filter(post => post.id != action.payload.id)

    default:
      return list;

  }
}