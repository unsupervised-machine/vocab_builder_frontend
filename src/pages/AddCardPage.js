import React, { useState } from "react";

function AddCardPage() {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");

  const handleAddCard = () => {
    // Handle the logic to add the card (e.g., API call)
    console.log("New Card:", { word, definition });
    // Reset fields after adding
    setWord("");
    setDefinition("");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Add a New Flashcard</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Word"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          style={{ padding: "10px", width: "300px", marginBottom: "10px" }}
        />
        <br />
        <textarea
          placeholder="Definition"
          value={definition}
          onChange={(e) => setDefinition(e.target.value)}
          style={{ padding: "10px", width: "300px", height: "100px" }}
        />
      </div>
      <button onClick={handleAddCard} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Add Card
      </button>
    </div>
  );
}

export default AddCardPage;
