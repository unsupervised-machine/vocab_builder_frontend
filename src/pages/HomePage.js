import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the Vocabulary App</h1>
      <p>Choose an action below:</p>
      <div style={{ margin: "20px" }}>
        <Link to="/flashcards">
          <button style={{ padding: "10px 20px", fontSize: "16px", marginRight: "10px" }}>
            Go to Flashcards
          </button>
        </Link>
        <Link to="/add-card">
          <button style={{ padding: "10px 20px", fontSize: "16px", marginRight: "10px" }}>
            Add a Card
          </button>
        </Link>
        <Link to="/login">
          <button style={{ padding: "10px 20px", fontSize: "16px" }}>
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
