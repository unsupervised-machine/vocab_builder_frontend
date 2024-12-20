import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import {loginUser} from "../services/api";


function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUserId } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Replace with your API call to authenticate and get user data
      // const response = await axios.post("/api/login", { email, password });
      // const userData = response.data;
      const userData = await loginUser(email, password)

      if (userData && userData.id) {
        setUserId(userData.id); // Update userId in the context
        navigate("/"); // Redirect to the home page
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Login</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "10px", width: "300px", marginBottom: "10px" }}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "10px", width: "300px", marginBottom: "10px" }}
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleLogin} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Login
      </button>
    </div>
  );
}

export default LoginPage;
