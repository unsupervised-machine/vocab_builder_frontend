import React, { useEffect, useState } from "react";
import Flashcard from "../components/Flashcard";
import {fetchProgress, fetchUserById, fetchUserByEmail, fetchWords, updateProgress} from "../services/api";

const FlashcardsPage = ({ userId }) => {
  const [words, setWords] = useState([]);
  const testEmail = "taran3@gmail.com";
  const [currentUser, setCurrentUser] = useState(null); // State to hold current user data
  const [userProgress, setUserProgress] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch user data inside useEffect
  // useEffect(() => {
  //   const getUserData = async () => {
  //     try {
  //       const user = await fetchUserByEmail(testEmail);
  //       setCurrentUser(user); // Set the current user state
  //       console.log("current user", user);
  //     } catch (error) {
  //       console.error("Error fetching user:", error);
  //     }
  //   };

  // Fetch user data inside useEffect
  useEffect(() => {
    const getUserData = async () => {
      try {
        const user = await fetchUserById(userId);
        setCurrentUser(user); // Set the current user state
        console.log("current user", user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };


    getUserData(); // Fetch user data when the component mounts
  }, []); // Empty dependency array to run this only once

  useEffect(() => {
    const getWords = async () => {
      const words = await fetchWords();
      setWords(words);
    };

    // const getUserProgress = async () => {
    //   const progress = await fetchUserProgress(userId);
    //   setUserProgress(progress);
    // };

    getWords();
    // getUserProgress();
  }, [userId]);

  // Filter words
  const filteredWords = words.filter((word) => {
    // for now include all the words
    return true;
  });

  // Function to advance to the next word
  const goToNextWord = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < filteredWords.length - 1 ? prevIndex + 1 : prevIndex
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

      // Calculate the new status based on the existing data and result
      let newStatus = "active"; // Default status
      if (currentData.status === "active") {
        if (result === true) {
          // If result is true and review_spacing > 30, set to 'learned', otherwise 'waiting'
          newStatus = currentData.review_spacing > 30 ? "learned" : "waiting";
        }
      }


      // Calculate the new review count
      const newReviewCount = currentData.review_count + 1;

      // Calculate new review spacing based on the result
      let newReviewSpacing = currentData.review_spacing;
      newReviewSpacing = result ? Math.round(newReviewSpacing * 1.5) : Math.round(newReviewSpacing * 0.5); // Adjust review_spacing based on result


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
        {filteredWords.length > 0 ? (
            <Flashcard
                word={filteredWords[currentIndex]}
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
