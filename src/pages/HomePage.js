import React, {useContext} from "react";
import { Link } from "react-router-dom";
import {AuthContext} from "../contexts/AuthContext";


function HomePage() {
  const { userId } = useContext(AuthContext);

  return (
      <div style={{textAlign: "center", marginTop: "50px"}}>
        <h1 style={{marginBottom: "100px"}}>Welcome to the Vocabulary App</h1>
        {/* <p>Current User ID: {userId}</p> */}
        <p>Choose an action below:</p>
        <div style={{margin: "20px"}}>
          <Link to="/flashcards">
            <button style={{padding: "10px 20px", fontSize: "16px", marginRight: "10px", backgroundColor: "bisque"}}>
              Go to Flashcards
            </button>
          </Link>
          <Link to="/add-card">
            <button style={{padding: "10px 20px", fontSize: "16px", marginRight: "10px", backgroundColor: "bisque"}}>
              Add a Card
            </button>
          </Link>
          <Link to="/login">
            <button style={{padding: "10px 20px", fontSize: "16px", marginRight: "10px", backgroundColor: "bisque"}}>
              Login
            </button>
          </Link>
          <Link to="/register">
            <button style={{padding: "10px 20px", fontSize: "16px", backgroundColor: "bisque"}}>
              Register
            </button>
          </Link>
        </div>
      </div>
  );
}

export default HomePage;
