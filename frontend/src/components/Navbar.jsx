import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav>
      <h2>BlogSpace</h2>

      <div>
        <Link to="/">Home</Link>

        {token ? (
          <>
            <Link to="/my-posts">My Posts</Link>

            <Link to="/create">Create Post</Link>

            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>

            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;