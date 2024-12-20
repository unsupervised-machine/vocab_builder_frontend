import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FlashcardsPage from "./pages/FlashcardsPage";
import HomePage from "./pages/HomePage";
import AddCardPage from "./pages/AddCardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/flashcards" element={<FlashcardsPage />} />
            <Route path="/add-card" element={<AddCardPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/*<Route path="/add-word" element={<AddWordPage />} />*/}
          </Routes>
        </Router>
      </AuthProvider>
  );
}

export default App;
