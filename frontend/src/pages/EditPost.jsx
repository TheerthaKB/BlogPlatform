import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const { post_id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/posts/${post_id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setContent(data.content);
      })
      .catch(() => setMessage("Could not load post"));
  }, [post_id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    setMessage("Updating...");

    const response = await fetch(
      `http://127.0.0.1:8000/posts/${post_id}?title=${encodeURIComponent(
        title
      )}&content=${encodeURIComponent(content)}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      navigate(`/posts/${post_id}`);
    } else {
      setMessage(data.detail || "Could not update post");
    }
  };

  return (
    <main className="create-page">
      <div className="create-card">
        <h1>Edit Post</h1>

        <p className="create-subtitle">
          Update your blog post.
        </p>

        <form onSubmit={handleUpdate}>
          <label>Title</label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Content</label>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="12"
            required
          />

          <button className="publish-button" type="submit">
            Save Changes
          </button>
        </form>

        {message && <p className="create-message">{message}</p>}
      </div>
    </main>
  );
}

export default EditPost;