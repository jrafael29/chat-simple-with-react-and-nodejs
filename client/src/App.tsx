import "./App.css"

import HomePage from './pages/HomePage';
import { AppProvider } from './contexts/AppContext';
import PostPage from "./pages/PostPage";
import { PostProvider } from "./contexts/PostContext";

export default function App() {

  return (
    <div className='container'>
      {/* <AppProvider>
        <HomePage />
      </AppProvider> */}
      <PostProvider>
        <PostPage />
      </PostProvider>
    </div>
  );
}