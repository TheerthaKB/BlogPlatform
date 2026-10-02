import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostDetails from "./pages/PostDetails";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import MyPosts from "./pages/MyPosts";
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts/:post_id" element={<PostDetails />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/posts/:post_id/edit" element={<EditPost />} />
        <Route path="/my-posts" element={<MyPosts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;