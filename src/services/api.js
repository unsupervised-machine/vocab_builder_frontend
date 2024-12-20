//  REWRITE THESE FILES, MOST IS CURRENTLY AI GENERATED CODE.


import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000"; // Replace with your FastAPI server URL

export const fetchUserByEmail = async (email) => {
  const response = await axios.get(`${API_BASE_URL}/users/by-email/${email}`);
  return response.data;
}

export const fetchUserById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/users/by-id/${id}`);
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

export const loginUser = async (email, password) => {
  // Log the data being sent to the backend
  console.log("Sending data to backend:", { email, password });

  // for now just returns the id of the user
  const response = await axios.post(
      `${API_BASE_URL}/login/`,
      {
        email,
        password
      },
      // { headers: { "Content-Type": "application/json" } }

  );
  // console.log("response", {response})
  return response.data;
}
