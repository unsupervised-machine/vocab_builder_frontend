import React, {useState, useEffect, useContext} from "react";
import {fetchWords, updateProgress, addWord} from "../services/api";
import {AuthContext} from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate



function AddCardPage() {
  const { userId } = useContext(AuthContext);
  const [words, setWords] = useState([]); // List of words fetched from the database
  const [searchQuery, setSearchQuery] = useState(""); // User input for filtering words
  const [selectedWord, setSelectedWord] = useState(null); // Selected word from dropdown
  const [newWord, setNewWord] = useState(""); // State for adding a new word
  const [newDefinition, setNewDefinition] = useState("");
  const [showForm, setShowForm] = useState(false); // Toggle form visibility
  const [error, setError] = useState(""); // For any error message

  const navigate = useNavigate(); // Initialize useNavigate


  // Fetch the list of words from the database on component mount
  // Fetch the list of words using the imported fetchWords function
  useEffect(() => {
    const getWords = async () => {
      try {
        const wordsData = await fetchWords();
        setWords(wordsData);
      } catch (err) {
        setError(err.message);
      }
    };

    getWords();
  }, []);

  // Handle the word search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // console.log("words", words)
  // Filter words based on the search query
  const filteredWords = words.filter((wordObj) =>
    wordObj.word.includes(searchQuery) // No `toLowerCase` applied here
  );

  // Handle selecting a word from the dropdown
  // Handle selecting a word from the dropdown
  const handleSelectWord = (wordObj) => {
    setSelectedWord(wordObj); // Save the full word object
    setSearchQuery(wordObj.word); // Auto-fill search query with selected word
  };


  // Handle submitting the new word form
  const handleSubmitNewWord = async (e) => {
    e.preventDefault();
    try {
      // setNewWord has already been set
      // make sure setNewDefinition has also been set
      console.log("new word", newWord)
      console.log("new def", newDefinition)
      const word_data =   {
          word: newWord,
          definition: newDefinition
      }

      const new_word_id = await addWord(word_data);

      const progress_data = {
        user_id: userId,
        word_id: new_word_id,
        status: "not started",
        review_count: 0,
        review_spacing: 7
      }

      await updateProgress(userId, new_word_id, progress_data)

      // after submission clean up
      setNewWord(""); // Reset new word input
      // setShowForm(false); // Close form
      setError(""); // Clear any error
      // Optionally, reload words
      // const response = await axios.get("/api/words");
      // setWords(response.data);
    } catch (err) {
      setError("Failed to add new word");
    }
  };
  // Handle submitting the selected word (add to user's progress table)
  const handleSubmitSelectedWord = async () => {
    if (!selectedWord) {
      setError("No word selected");
      return;
    }

    try {
      // Example: Add the selected word (using its id) to the user's progress
      // await axios.post("/api/progress", { wordId: selectedWord.id });
      const progress_data = {
        user_id: userId,
        word_id: selectedWord.id,
        status: "not started",
        review_count: 0,
        review_spacing: 7
      }

      console.log("userId", userId)
      console.log("selectedWord.id", selectedWord.id)
      console.log("progress_data", progress_data)

      await updateProgress(userId, selectedWord.id, progress_data)
      setError(""); // Clear any error
      alert(`Added "${selectedWord.word}" to your progress!`); // Placeholder alert
    } catch (err) {
      setError("Failed to add word to progress");
    }
  };

  return (
      <div style={{textAlign: "center", marginTop: "50px"}}>
          <h1>Add or Select Word</h1>
          <p>Current User ID: {userId}</p>

          {/* Go Home Button */}
          <button
              onClick={() => navigate("/")} // Navigate to home page
              style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  marginBottom: "20px",
              }}
          >
              Go Home
          </button>


          {/* Dropdown for selecting an existing word */}
          <div style={{marginBottom: "20px"}}>
              <input
                  type="text"
                  placeholder="Search for a word"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  style={{padding: "10px", width: "300px"}}
              />
              <ul style={{maxHeight: "200px", overflowY: "auto", padding: "0", marginTop: "10px"}}>
                  {filteredWords.map((wordObj, index) => (
                      <li
                          key={index}
                          onClick={() => handleSelectWord(wordObj)} // Assuming you want the 'word' property
                          style={{
                              cursor: "pointer",
                              padding: "8px",
                              backgroundColor: "#f0f0f0",
                              marginBottom: "5px",
                              borderRadius: "4px",
                          }}
                      >
                          {wordObj.word} {/* Render the 'word' property */}
                      </li>
                  ))}
              </ul>
          </div>

          {/* Display selected word */}
          {selectedWord && (
              <div style={{marginBottom: "20px"}}>
                  <h2>Selected Word: {selectedWord.word}</h2>
                  <p>ID: {selectedWord.id}</p>
              </div>
          )}

          {/* Submit button for selected word */}
          {selectedWord && (
              <div style={{marginTop: "20px"}}>
                  <button
                      onClick={handleSubmitSelectedWord}
                      style={{
                          padding: "10px 20px",
                          fontSize: "16px",
                          backgroundColor: "#4CAF50",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                      }}
                  >
                      Submit Selected Word
                  </button>
              </div>
          )}

          {/* Button to add a new word */}
          <button
              onClick={() => setShowForm(true)}
              style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  marginTop: "10px",
              }}
          >
              Add a New Word
          </button>

          {/* Form to add a new word */}
          {showForm && (
              <div style={{marginTop: "20px"}}>
                  <h3>Add New Word</h3>
                  <form onSubmit={handleSubmitNewWord}>
                      <input
                          type="text"
                          placeholder="Enter new word"
                          value={newWord}
                          onChange={(e) => setNewWord(e.target.value)}
                          style={{
                              padding: "10px",
                              width: "300px",
                              marginBottom: "10px",
                              fontSize: "16px",
                          }}
                      />
                      <input
                          type="text"
                          placeholder="Enter new definition"
                          value={newDefinition}
                          onChange={(e) => setNewDefinition(e.target.value)}
                          style={{
                              padding: "10px",
                              width: "300px",
                              marginBottom: "10px",
                              fontSize: "16px",
                          }}
                      />
                      <div>
                          <button type="submit" style={{padding: "10px 20px"}}>
                              Submit
                          </button>
                      </div>
                  </form>
              </div>
          )}


          {/* Error message */}
          {error && <p style={{color: "red"}}>{error}</p>}
      </div>
  );
}

export default AddCardPage;
