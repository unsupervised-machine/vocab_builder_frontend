//  REWRITE THESE FILES, MOST IS CURRENTLY AI GENERATED CODE.


import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000"; // Replace with your FastAPI server URL

export const fetchUser = async (email) => {
  const response = await axios.get(`${API_BASE_URL}/users/by-email/${email}`);
  return response.data;
}

export const fetchWords = async () => {
  const response = await axios.get(`${API_BASE_URL}/words/`);
  return response.data;
};

export const fetchProgress = async (userId, wordId) => {
  try {
    console.log("user id", userId)
    console.log("word id", wordId)
    const response = await axios.get(
        `${API_BASE_URL}/users/${userId}/user_word_progress/${wordId}`
    );
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the user progress:", error);
    throw error; // rethrow error to be handled in calling code
  }
};

export const updateProgress = async (userId, wordId, progressData) => {
  const response = await axios.post(
    `${API_BASE_URL}/users/${userId}/user_word_progress/${wordId}`,
     progressData
  );
  return response.data;
};
