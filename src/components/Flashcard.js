import React from "react";
import "./Flashcard.css"; // Add CSS styles

const Flashcard = ({ word, onKnow, onDontKnow }) => {
  if (!word) {
    return <p>No word available to display.</p>; // Fallback message when word is null
  }

  return (
    <div className="flashcard">
      <h2>{word.word}</h2>
      <p>{word.definition}</p>
      <div>
        <button onClick={() => onKnow(word)}>Know</button>
        <button onClick={() => onDontKnow(word)}>Don’t Know</button>
      </div>
    </div>
  );
};

export default Flashcard;
