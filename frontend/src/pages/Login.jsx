import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("Logging in...");

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/auth/login?email=${encodeURIComponent(
          email
        )}&password=${encodeURIComponent(password)}`,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.access_token);
        navigate("/");
      } else {
        setMessage(data.detail || "Login failed");
      }
    } catch (error) {
      setMessage("Cannot connect to backend ❌");
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>Welcome Back</h1>
        <p className="auth-subtitle">Login to your BlogSpace account</p>

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="auth-button" type="submit">
            Login
          </button>
        </form>

        {message && <p className="auth-message">{message}</p>}

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register">Create one</Link>
        </p>
      </div>
    </main>
  );
}

export default Login;