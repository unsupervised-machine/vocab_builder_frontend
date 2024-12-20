import React, {useContext, useEffect, useState} from "react";
import Flashcard from "../components/Flashcard";
import {fetchProgress, fetchUserById, fetchUserByEmail, fetchWords, updateProgress, fetchUserWords} from "../services/api";
import {AuthContext} from "../contexts/AuthContext";

const FlashcardsPage = () => {
  const { userId } = useContext(AuthContext);
  const [words, setWords] = useState([]);
  // const testEmail = "taran3@gmail.com";
  const [currentUser, setCurrentUser] = useState(null); // State to hold current user data
  const [wordQueue, setWordQueue] = useState(null);
  const [userProgress, setUserProgress] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);


  // Fetch user data inside useEffect
  useEffect(() => {
    const getUserData = async () => {
      try {
        const user = await fetchUserById(userId);
        setCurrentUser(user); // Set the current user state
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };


    getUserData(); // Fetch user data when the component mounts
  }, []); // Empty dependency array to run this only once

  useEffect(() => {
  const fetchWordsAndQueue = async () => {
    // Fetch all words
    const allWords = await fetchWords();
    setWords(allWords);
    console.log("all words", allWords)

    // Fetch user's words to practice
    const usr_words = await fetchUserWords(userId);
    console.log("usr words", usr_words)

    // Filter out words with status 'waiting' or 'learned'
    const activeWords = usr_words.filter(
      (word) => word.status !== "waiting" && word.status !== "learned"
    );
    console.log("active words", activeWords)

    // Extract the IDs of the filtered words
    const wordIds = activeWords.map((word) => word.word_id);
    console.log("wordIds", wordIds)

    // Filter words that match the IDs in wordIds
    const queue = allWords.filter((word) => wordIds.includes(word.id));

    console.log("queue", queue)

    // Set the word queue
    setWordQueue(queue);
  };

  fetchWordsAndQueue();
}, [userId]); // Dependency array ensures this runs when userId changes


  // Function to advance to the next word
  const goToNextWord = () => {
    setCurrentIndex((prevIndex) =>
       prevIndex + 1
    );
  };



  const handleKnow = async (word) => {
  const result = true;
  // Handle "know" action
  await processUpdateProgress(currentUser, word, result)

  // After answer card go to next
  goToNextWord();
  };

  const handleDontKnow = async (word) => {
  const result = false;
  // Handle "don't know" action
  await processUpdateProgress(currentUser, word, result)

  // After answer card go to next
  goToNextWord();
  };


  const processUpdateProgress = async (user, word, result) => {
    try {


      const currentData = await fetchProgress(user.id, word.id)

      // Calculate new data ids based on existing data
      let newId = currentData.id;
      let newUserId = currentData.user_id;
      let newWordId = currentData.word_id;


      // Calculate the new review count
      const newReviewCount = currentData.review_count + 1;

      // Calculate new review spacing based on the result
      let newReviewSpacing = currentData.review_spacing;
      newReviewSpacing = result ? Math.round(newReviewSpacing * 1.5 + 1) : Math.round(newReviewSpacing * 0.5); // Adjust review_spacing based on result


      // Determine the new status based on the updated review_spacing
      let newStatus = "active"; // Default status
      if (newReviewSpacing > 30) {
        newStatus = "learned"; // If review_spacing > 30, set status to "learned"
      } else if (newReviewSpacing <= 30 && newReviewSpacing > 0) {
        newStatus = "waiting"; // If review_spacing is <= 30, set status to "waiting"
      }


      // Get the current date and time for review_last_date
      const reviewLastDate = new Date().toISOString();

      // Prepare the new progress data to be sent
      const newData = {
        id: newId,
        user_id: newUserId,
        word_id: newWordId,
        status: newStatus,
        review_count: newReviewCount,
        review_spacing: newReviewSpacing,
        review_last_date: reviewLastDate,
      };

      // Update the progress by calling the updateProgress function
      console.log("Old Progress Data:", currentData);
      console.log("New Progress Data:", newData);


      await updateProgress(user.id, word.id, newData);
      console.log("Progress updated successfully");
    } catch (error) {
      console.error("Error updating progress:", error);
    }

    };


  return (
      <div>
        <h1>Flashcards Page</h1>
        <p>Current User ID: {userId}</p>
        {wordQueue && wordQueue.length > 0 ? (
            <Flashcard
                word={wordQueue[currentIndex]}
                onKnow={handleKnow}
                onDontKnow={handleDontKnow}
            />
        ) : (
            <p>All words are marked as learned or waiting!</p>
        )}
      </div>
  );
};

export default FlashcardsPage;
