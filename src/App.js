import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FlashcardsPage from "./pages/FlashcardsPage";
import HomePage from "./pages/HomePage";
import AddCardPage from "./pages/AddCardPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/flashcards" element={<FlashcardsPage userId={1} />} />
        <Route path="/add-card" element={<AddCardPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
