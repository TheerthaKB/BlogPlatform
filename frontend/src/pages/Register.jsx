import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    setMessage("Creating account...");

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/auth/register?username=${encodeURIComponent(
          username
        )}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(
          password
        )}`,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (response.ok) {
        navigate("/login");
      } else {
        setMessage(data.detail || "Registration failed");
      }
    } catch (error) {
      setMessage("Cannot connect to backend ❌");
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>Create Account</h1>
        <p className="auth-subtitle">
          Join BlogSpace and start writing
        </p>

        <form onSubmit={handleRegister}>
          <label>Username</label>
          <input
            type="text"
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

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
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="auth-button" type="submit">
            Create Account
          </button>
        </form>

        {message && <p className="auth-message">{message}</p>}

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
}

export default Register;