import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function PostDetails() {
  const { post_id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const token = localStorage.getItem("token");

  const getCurrentUser = () => {
    if (!token) return null;

    try {
      return JSON.parse(atob(token.split(".")[1])).email;
    } catch {
      return null;
    }
  };

  const currentUser = getCurrentUser();

  const loadData = async () => {
    const postResponse = await fetch(
      `http://127.0.0.1:8000/posts/${post_id}`
    );

    const postData = await postResponse.json();
    setPost(postData);

    const commentResponse = await fetch(
      `http://127.0.0.1:8000/comments/${post_id}`
    );

    const commentData = await commentResponse.json();
    setComments(commentData);
  };

  useEffect(() => {
    loadData();
  }, [post_id]);

  const deletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    const response = await fetch(
      `http://127.0.0.1:8000/posts/${post_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      navigate("/");
    } else {
      alert("Could not delete post");
    }
  };

  const deleteComment = async (comment_id) => {
    if (!window.confirm("Delete this comment?")) {
      return;
    }

    const response = await fetch(
      `http://127.0.0.1:8000/comments/${comment_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      loadData();
    } else {
      alert("Could not delete comment");
    }
  };

  const addComment = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Please login to comment.");
      return;
    }

    const response = await fetch(
      `http://127.0.0.1:8000/comments/${post_id}?text=${encodeURIComponent(
        text
      )}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      setText("");
      loadData();
    } else {
      alert("Could not add comment");
    }
  };

  if (!post) {
    return (
      <main>
        <p>Loading...</p>
      </main>
    );
  }

  const isOwner = currentUser === post.author;

  return (
    <main className="details-page">
      <article className="post-details">
        <h1>{post.title}</h1>

        <div className="post-meta">
          By {post.author}
        </div>

        <div className="post-content">
          {post.content}
        </div>

        {isOwner && (
          <div className="post-actions">
            <Link to={`/posts/${post_id}/edit`}>
              <button>Edit</button>
            </Link>

            <button
              className="delete-button"
              onClick={deletePost}
            >
              Delete
            </button>
          </div>
        )}
      </article>

      <section className="comments-section">
        <h2>Comments</h2>

        {comments.length === 0 ? (
          <p className="no-comments">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => (
            <div className="comment-card" key={comment._id}>
              <p>{comment.text}</p>

              <small>By {comment.author}</small>

              {currentUser === comment.author && (
                <button
                  className="comment-delete"
                  onClick={() => deleteComment(comment._id)}
                >
                  Delete
                </button>
              )}
            </div>
          ))
        )}

        <div className="comment-form">
          <h3>Leave a comment</h3>

          <form onSubmit={addComment}>
            <input
              type="text"
              placeholder="Write your comment..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />

            <button type="submit">
              Comment
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default PostDetails;