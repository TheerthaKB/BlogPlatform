import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://127.0.0.1:8000/posts/my-posts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <main>
      <h1>My Posts</h1>

      {posts.length === 0 ? (
        <p>You haven't created any posts yet.</p>
      ) : (
        <div className="posts-grid">
          {posts.map((post) => (
            <article className="post-card" key={post._id}>
              <h2>{post.title}</h2>

              <p>
                {post.content.length > 150
                  ? post.content.substring(0, 150) + "..."
                  : post.content}
              </p>

              <Link to={`/posts/${post._id}`}>
                Read post →
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default MyPosts;