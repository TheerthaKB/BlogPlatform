import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/posts/")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <main>
      <h1>Latest Posts</h1>

      {posts.length === 0 ? (
        <p>No posts yet.</p>
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

              <small>By {post.author}</small>

              <br />
              <br />

              <Link to={`/posts/${post._id}`}>
                Read more →
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default Home;