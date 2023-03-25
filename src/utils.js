import axios from "axios";

const FLASK_BACKEND_URL = "http://localhost:5000/openai";

export const getResponse = async (messages) => {
  const response = await axios.post(FLASK_BACKEND_URL, {
    messages: messages,
  });

  console.log(response.data);

  return response.data["content"];
}

