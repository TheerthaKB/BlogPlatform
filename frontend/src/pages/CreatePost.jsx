import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    setMessage("Publishing...");

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/posts/?title=${encodeURIComponent(
          title
        )}&content=${encodeURIComponent(content)}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        navigate("/");
      } else {
        setMessage(data.detail || "Could not create post");
      }
    } catch (error) {
      setMessage("Cannot connect to backend ❌");
    }
  };

  return (
    <main className="create-page">
      <div className="create-card">
        <h1>Create a New Post</h1>
        <p className="create-subtitle">
          Share your thoughts with the BlogSpace community.
        </p>

        <form onSubmit={handleCreate}>
          <label>Title</label>

          <input
            type="text"
            placeholder="Enter your post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Content</label>

          <textarea
            placeholder="Write your post here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="12"
            required
          />

          <button className="publish-button" type="submit">
            Publish Post
          </button>
        </form>

        {message && <p className="create-message">{message}</p>}
      </div>
    </main>
  );
}

export default CreatePost;