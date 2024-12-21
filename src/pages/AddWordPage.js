// //  this file should be replaced by addcardpage.js
//
// import React, { useState, useEffect } from "react";
// import {fetchWords} from "../services/api";
//
//
// function AddWordPage() {
//   const [words, setWords] = useState([]); // List of words fetched from the database
//   const [searchQuery, setSearchQuery] = useState(""); // User input for filtering words
//   const [selectedWord, setSelectedWord] = useState(null); // Selected word from dropdown
//   const [newWord, setNewWord] = useState(""); // State for adding a new word
//   const [showForm, setShowForm] = useState(false); // Toggle form visibility
//   const [error, setError] = useState(""); // For any error message
//
//   // Fetch the list of words from the database on component mount
//   useEffect(() => {
//     const fetchWords = async () => {
//       try {
//         const response = await axios.get("/api/words");
//         setWords(response.data);
//       } catch (err) {
//         setError("Failed to load words");
//       }
//     };
//     fetchWords();
//   }, []);
//
//   // Handle the word search input
//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };
//
//   // Filter words based on the search query
//   const filteredWords = words.filter((word) =>
//     word.toLowerCase().includes(searchQuery.toLowerCase())
//   );
//
//   // Handle selecting a word from the dropdown
//   const handleSelectWord = (word) => {
//     setSelectedWord(word);
//     setSearchQuery(word); // Auto-fill search query with selected word
//   };
//
//   // Handle submitting the new word form
//   const handleSubmitNewWord = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("/api/words", { word: newWord });
//       setNewWord(""); // Reset new word input
//       setShowForm(false); // Close form
//       setError(""); // Clear any error
//       // Optionally, reload words
//       const response = await axios.get("/api/words");
//       setWords(response.data);
//     } catch (err) {
//       setError("Failed to add new word");
//     }
//   };
//
//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h1>Add or Select Word</h1>
//
//       {/* Dropdown for selecting an existing word */}
//       <div style={{ marginBottom: "20px" }}>
//         <input
//           type="text"
//           placeholder="Search for a word"
//           value={searchQuery}
//           onChange={handleSearchChange}
//           style={{ padding: "10px", width: "300px" }}
//         />
//         <ul style={{ maxHeight: "200px", overflowY: "auto", padding: "0", marginTop: "10px" }}>
//           {filteredWords.map((word, index) => (
//             <li
//               key={index}
//               onClick={() => handleSelectWord(word)}
//               style={{
//                 cursor: "pointer",
//                 padding: "8px",
//                 backgroundColor: "#f0f0f0",
//                 marginBottom: "5px",
//                 borderRadius: "4px",
//               }}
//             >
//               {word}
//             </li>
//           ))}
//         </ul>
//       </div>
//
//       {/* Display selected word */}
//       {selectedWord && (
//         <div style={{ marginBottom: "20px" }}>
//           <h2>Selected Word: {selectedWord}</h2>
//         </div>
//       )}
//
//       {/* Button to add a new word */}
//       <button
//         onClick={() => setShowForm(true)}
//         style={{
//           padding: "10px 20px",
//           fontSize: "16px",
//           marginTop: "10px",
//         }}
//       >
//         Add a New Word
//       </button>
//
//       {/* Form to add a new word */}
//       {showForm && (
//         <div style={{ marginTop: "20px" }}>
//           <h3>Add New Word</h3>
//           <form onSubmit={handleSubmitNewWord}>
//             <input
//               type="text"
//               placeholder="Enter new word"
//               value={newWord}
//               onChange={(e) => setNewWord(e.target.value)}
//               style={{
//                 padding: "10px",
//                 width: "300px",
//                 marginBottom: "10px",
//                 fontSize: "16px",
//               }}
//             />
//             <div>
//               <button type="submit" style={{ padding: "10px 20px" }}>
//                 Submit
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//
//       {/* Error message */}
//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </div>
//   );
// }
//
// export default AddWordPage;
