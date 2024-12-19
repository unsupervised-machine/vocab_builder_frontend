import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FlashcardsPage from "./pages/FlashcardsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FlashcardsPage userId={1} />} />
      </Routes>
    </Router>
  );
}

export default App;
